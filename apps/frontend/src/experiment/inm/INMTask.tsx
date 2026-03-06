import { useCallback, useEffect, useRef, useState } from "react";

type INMTaskProps = {
  onFinish: () => void;
  participantCode: string;
};

type INMData = {
  participantCode: string;
  data: {
    distancesToTargets: number[];
  };
};

const DEBUG = true;

// From the definition of the INM task from Van Hedger et al. 2015
// const POTENTIAL_TARGET_FREQS = [698.46, 783.99, 830.61, 880];
// const POTENTIAL_STARTING_FREQS = [587.33, 622.25, 659.26, 698.46, 932.33, 987.77, 1046.5, 1108.73];

const calculateError = (freq1: number, freq2: number): number => {
  return 36 * Math.log2(freq1 / freq2);
};

export default function INMTask({ onFinish, participantCode }: INMTaskProps) {
  const [targetFreq] = useState(783.99);
  const [currentFreq, setCurrentFreq] = useState(932.33);

  const INMDataRef = useRef<INMData>({
    participantCode: participantCode,
    data: { distancesToTargets: [] },
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

  const handleConfirm = () => {
    const distanceToTarget = calculateError(currentFreq, targetFreq);
    INMDataRef.current.data.distancesToTargets.push(distanceToTarget);

    DEBUG &&
      console.log(
        `[INM] Target freq: ${targetFreq}, current freq: ${currentFreq} | Distance: ${distanceToTarget}`,
      );
  };

  const handleFinish = () => {
    onFinish();
  };

  useEffect(() => {
    playTone(targetFreq);
  }, [targetFreq, playTone]);

  return (
    <div className="flex flex-col items-center w-screen h-screen mt-20">
      <h1>INM task</h1>

      <div className="w-1/4 flex flex-col gap-4 mt-20">
        <p className="text-center">Current frequency: {currentFreq.toFixed(0)} Hz</p>
        <div className="flex justify-evenly">
          <button type="button" onClick={() => adjustCurrentFreq(-2)}>
            -66
          </button>
          <button type="button" onClick={() => adjustCurrentFreq(-1)}>
            -33
          </button>
          {/* <img src={audioSvg} alt="audio icon" className="h-12"/> */}
          <button type="button" onClick={() => playTone(currentFreq)}>
            Play current
          </button>
          <button type="button" onClick={() => adjustCurrentFreq(1)}>
            +33
          </button>
          <button type="button" onClick={() => adjustCurrentFreq(2)}>
            +66
          </button>
        </div>
        <button type="button" onClick={() => handleConfirm()}>
          Confirm
        </button>
      </div>
      <button type="button" onClick={handleFinish}>
        finish
      </button>
    </div>
  );
}
