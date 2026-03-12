import type { INMTrialData } from "@pitch-experiment/types";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DEBUG } from "../../../config.json";
import chevron from "../../assets/chevron-right-svgrepo-com.svg";
import doubleChevron from "../../assets/chevrons-right-svgrepo-com.svg";
import ProgressBar from "../../components/ui/ProgressBar";
import TaskHeader from "../../components/ui/TaskHeader";
import Bucket from "../../lib/bucket";

function useEffectEvent<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: TArgs) => {
    return ref.current(...args);
  }, []);
}

type INMTaskProps = {
  onFinish: (data: INMTrialData[]) => void;
};

// From the definition of the INM task from Van Hedger et al. 2015
const POTENTIAL_TARGET_FREQS = [698.46, 783.99, 830.61, 880];
const POTENTIAL_STARTING_FREQS = [587.33, 622.25, 659.26, 698.46, 932.33, 987.77, 1046.5, 1108.73];

const INTER_TRIAL_GAP_MS = 2000;
const TRIAL_TIMEOUT = DEBUG ? 2500 : 10000;

const calculateError = (freq1: number, freq2: number): number => {
  return Math.round(36 * Math.log2(freq1 / freq2));
};

// Source - https://stackoverflow.com/a/47480429
// Posted by Etienne Martin, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-06, License - CC BY-SA 4.0
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const generateINMUnit = (targetFreqs: number[], startingFreqs: number[]) => {
  const uniqueCombinations = new Set<{ targetFreq: number; startingFreq: number }>();
  for (const targetFreq of targetFreqs) {
    for (const startingFreq of startingFreqs) {
      uniqueCombinations.add({
        targetFreq: targetFreq,
        startingFreq: startingFreq,
      });
    }
  }

  return new Bucket(Array.from(uniqueCombinations));
};

export default function INMTask({ onFinish }: INMTaskProps) {
  const [targetFreq, setTargetFreq] = useState(0);
  const [currentFreq, setCurrentFreq] = useState(0);
  const [trialNumber, setTrialNumber] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);

  const INMTrialsDataRef = useRef<INMTrialData[]>([]);

  const currentUnit = useRef(1);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const trialMaterialRef = useRef(
    generateINMUnit(POTENTIAL_TARGET_FREQS, POTENTIAL_STARTING_FREQS),
  );

  const trialTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initAudioContext = useCallback((): void => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();

      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 1;
    }
  }, []);

  const playTone = useCallback(
    (frequency: number, durationSeconds: number = 1): void => {
      initAudioContext();

      if (!audioContextRef.current || !gainNodeRef.current) {
        throw new Error("There was an error initializing the tone player");
      }

      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }

      const oscillator = audioContextRef.current.createOscillator();
      oscillator.frequency.value = frequency;
      oscillator.connect(gainNodeRef.current);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + durationSeconds);

      oscillatorRef.current = oscillator;
    },
    [initAudioContext],
  );

  const adjustCurrentFreq = (steps: number): void => {
    setCurrentFreq(currentFreq * 2 ** (steps / 36));

    playTone(currentFreq);
  };

  const handleConfirm = async () => {
    if (trialTimeoutRef.current !== null) {
      clearTimeout(trialTimeoutRef.current);
      trialTimeoutRef.current = null;
    }

    setCompletionPercent(Math.round((100 * (trialNumber + 1)) / 64));

    const distanceToTarget = calculateError(currentFreq, targetFreq);
    INMTrialsDataRef.current.push({
      trialNumber: trialNumber,
      distanceToTarget: distanceToTarget,
    });
    DEBUG &&
      console.log(
        `[INM] Trial ${trialNumber} | Target freq: ${targetFreq}, current freq: ${currentFreq} -> Distance: ${distanceToTarget}`,
      );

    if (trialMaterialRef.current.length === 0) {
      // Bucket is empty, the unit is completed
      if (currentUnit.current === 2) {
        // If we already did 2 units -> finish the task
        handleFinish();
        return;
      }

      // Else, start unit 2
      DEBUG && console.log("[INM] Starting new unit");
      currentUnit.current = 2;
      // Regenerate the trial material bucket
      trialMaterialRef.current = generateINMUnit(POTENTIAL_TARGET_FREQS, POTENTIAL_STARTING_FREQS);
    }

    // Inter-trial gap
    DEBUG && console.log(`Waiting ${INTER_TRIAL_GAP_MS / 1000} seconds.`);
    setIsPaused(true);
    await delay(INTER_TRIAL_GAP_MS);
    setIsPaused(false);

    setTrialNumber((prev) => prev + 1);
  };

  const handleConfirmEvent = useEffectEvent(handleConfirm);

  // When the task is completed: pass the data back to the Conductor
  const handleFinish = () => {
    DEBUG && console.log("[INM] INM Data:", INMTrialsDataRef.current);
    onFinish(INMTrialsDataRef.current);
  };

  // Auto play the target every time it's updated
  useEffect(() => {
    playTone(targetFreq);
  }, [targetFreq, playTone]);

  // On new trial: pick a new reference and target
  useEffect(() => {
    const newCombination = trialMaterialRef.current.draw();

    setCurrentFreq(newCombination.startingFreq);
    setTargetFreq(newCombination.targetFreq);

    DEBUG &&
      console.log(
        `[INM] Starting new trial: (${trialNumber}), current freq: ${newCombination.startingFreq}, target freq: ${newCombination.targetFreq}, bucket length: ${trialMaterialRef.current.length} | (trialNumber update)`,
      );

    const timeoutId = setTimeout(() => {
      DEBUG && console.log(`[INM] Trial ${trialNumber} timed out`);
      handleConfirmEvent();
    }, TRIAL_TIMEOUT);

    trialTimeoutRef.current = timeoutId;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [trialNumber, handleConfirmEvent]);

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <TaskHeader title="INM TASK" />

      <div className="w-fit flex flex-col gap-4 mt-20">
        {isPaused ? (
          <p className="text-2xl">Pausing for {INTER_TRIAL_GAP_MS / 1000} seconds.</p>
        ) : (
          <>
            <p className="text-center text-2xl">Current frequency: {currentFreq.toFixed(0)} Hz</p>
            <div className="flex justify-center gap-4">
              <button type="button" onClick={() => adjustCurrentFreq(-2)}>
                <img
                  src={doubleChevron}
                  alt="-66"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 66 cents"
                />
              </button>
              <button type="button" onClick={() => adjustCurrentFreq(-1)}>
                <img
                  src={chevron}
                  alt="-33"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 33 cents"
                />
              </button>
              {/* <img src={audioSvg} alt="audio icon" className="h-12"/> */}
              <button type="button" onClick={() => playTone(currentFreq)}>
                Play current pitch
              </button>
              <button type="button" onClick={() => adjustCurrentFreq(1)}>
                <img
                  src={chevron}
                  alt="+33"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 33 cents"
                />
              </button>
              <button type="button" onClick={() => adjustCurrentFreq(2)}>
                <img
                  src={doubleChevron}
                  alt="+66"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 66 cents"
                />
              </button>
            </div>
            <button type="button" onClick={handleConfirm}>
              Confirm
            </button>
          </>
        )}
      </div>
      <ProgressBar progressionPercent={completionPercent} className="absolute bottom-4" />
      {DEBUG && (
        <button type="button" className="absolute bottom-0 left-0" onClick={handleFinish}>
          finish
        </button>
      )}
    </div>
  );
}
