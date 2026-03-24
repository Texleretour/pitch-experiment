import AudioKeyboardResponsePlugin from "@jspsych/plugin-audio-keyboard-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import type { LearningTrialData } from "@pitch-experiment/types";
import { initJsPsych, type JsPsych } from "jspsych";
import { useCallback, useEffect, useRef, useState } from "react";
import Bucket from "../../lib/bucket";
import "./style_learning.css";
import Header from "../../components/ui/Header";
import ProgressBar from "../../components/ui/ProgressBar";

const AUDIO_FILES_PATH = "/audio/learning/";
const DEBUG = true;
type Timeline = Parameters<ReturnType<typeof initJsPsych>["run"]>[0];
const TARGETS = [1, 2, 3, 4]; // the targets are +1, +2, +3 , +4 from the reference
const REF_NOTES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // all the possible reference notes
const NB_BLOCK_PER_UNIT = 4; //it was 6
const NB_UNIT = 2;
const OCTAVES = [1, 2, 3];
const TIME_TO_ANSWER = 5000; // the time to answer when the target is presented
const INTERFERENCE_DURATION = 2000; // the time of the presentation of either the interference or the blank gap between ref and target

type JsPsychTrialData = {
  rt: number;
  response: string | null;
  correct: boolean;
  realDistance: number;
  targetDistanceProposition: number;
  interference: boolean;
  blockNumber: number;
  unitNumber: number;
};

type LearningTaskProps = {
  responseKeys: LearningResponseKeys;
  onFinish: (data: LearningTrialData[]) => void;
};

type LearningResponseKeys = {
  trueKey: string;
  falseKey: string;
};

// one learning bloc is the return of the function that creates a block/ It is a timeline and data
type LearningBlock = {
  timeline: Timeline;
  data: {
    learningData: LearningData;
  };
};

// the learning data contains the data of the block and the code of the participant
type LearningData = {
  data: {
    trialData: JsPsychTrialData[];
  };
};

/**
 * Constructs a block of the learning task.
 * Returns an experiment block composed of:
 * - Reference note (constant)
 * - Gap
 * - Target note
 * - Feedback
 * All of this 6 times
 * @param jsPsychInstance the instance of the jsPsych object
 * @returns
 */
const createLearningBlock = (
  jsPsychInstance: JsPsych,
  referenceBucket: Bucket<number>,
  blockNumber: number,
  unitNumber: number,
  octaveNumber: number,
  trueKey: string,
  falseKey: string,
  setCompletionPercent: (value: number) => void,
): LearningBlock => {
  // Initializing the block (firstly empty)
  const experimentBlock: Timeline = [];
  // Pick a reference from the bucket
  const referenceNumber = referenceBucket.draw();
  const urlReference = `${AUDIO_FILES_PATH}${octaveNumber}_${referenceNumber}.wav`;

  // Defining the bucket of the +1, +2, +3 and +4 targets (2 times to make 8 questions)
  const targets = new Bucket(TARGETS.concat(TARGETS));
  const targetsLength = targets.length;

  // Initializing the data object with firstly empty data list for the trials (because no trials yet have been done)
  const learningData: LearningData = {
    data: {
      trialData: [],
    },
  };

  // All the possible targets from the reference
  const urlTargets = [];
  for (let stim = 0; stim <= TARGETS.length; stim++) {
    urlTargets.push({
      stimulus: `${AUDIO_FILES_PATH}${octaveNumber}_${referenceNumber + stim * 2}.wav`,
    });
  }

  // Defining the block of the presentation of the scale (a sclae is the reference note and the hree following notes)
  const scalePresentation = {
    type: AudioKeyboardResponsePlugin,
    stimulus: jsPsychInstance.timelineVariable("stimulus"),
    choices: "NO_KEYS",
    trial_duration: 1000,
  };

  let note_scale_presented = 1;

  // Defining the procedure of the presentation of the scale
  const scalePresentationProcedure = {
    timeline: [scalePresentation],
    timeline_variables: urlTargets,
    prompt: () => {
      let html = `
      <div id="piano_presentation_title">
      You are listening to the scale, starting by the reference and its ${TARGETS.length} following notes.
      </div>
      <div id="piano_presentation">`;
      for (let i = 1; i <= TARGETS.length + 1; i++) {
        html += `<div class="piano_note ${i === note_scale_presented ? "note_activated" : "note_deactivated"}"> ${i === 1 ? "REF" : `+${i - 1}`} </div>`;
      }
      html += `</div>`;
      note_scale_presented++;
      return html;
    },
  };

  // Pushing the presentation of the scale before running the block
  experimentBlock.push(scalePresentationProcedure);

  for (let i = 0; i < targetsLength; i++) {
    // Draw the target
    const currentTargetDistance = targets.draw();
    const urlCurrentTarget = `${AUDIO_FILES_PATH}${octaveNumber}_${referenceNumber + currentTargetDistance * 2}.wav`;
    // Define if the target is true or false
    const isTrue = Math.random() < 0.5;
    // Initializing the falseProposition for each false question
    let falseProposition = 0;
    if (!isTrue) {
      // Creating the bucket of false possibilites (every target except the real target)
      const index = TARGETS.indexOf(currentTargetDistance);
      // Removing the real target from the targets (to have only the false possibilities)
      TARGETS.splice(index, 1);
      const falsePossibilities = new Bucket(TARGETS);
      // Draw new target for the false proposition
      falseProposition = falsePossibilities.draw();
      // Re-adding the false proposition in the target list
      TARGETS.push(currentTargetDistance);
    }
    const interference = Math.random() < 0.5;
    // Generate the bloc to present the reference
    const referencePresentation = {
      type: AudioKeyboardResponsePlugin,
      stimulus: urlReference,
      choices: "NO_KEYS",
      trial_duration: 1000,
      prompt: () => {
        let html = `
        <div id="piano_presentation_title">
        You are listening the reference note!
        </div>
        <div id="piano_presentation">`;
        for (let i = 1; i <= TARGETS.length + 1; i++) {
          html += `<div class="piano_note ${i === 1 ? 'note_activated"> REF ' : `note_deactivated"> +${i - 1}`} </div>`;
        }
        html += `</div>`;
        return html;
      },
      on_start: (trial: { stimulus: string }) => {
        const { stimulus } = trial;
        DEBUG && console.log("Reference presentation started ", stimulus);
      },
      on_finish: () => {
        !interference && DEBUG && console.log("No interference");
      },
    };

    // Generate the block of the interference
    const interferencePresentation = {
      type: AudioKeyboardResponsePlugin,
      stimulus: `${AUDIO_FILES_PATH}baseline.wav`,
      choices: "NO_KEYS",
      trial_duration: INTERFERENCE_DURATION,
      prompt: () => {
        let html = `<div id="piano_presentation_title">
      This is an interference sound!
      </div> 
      <div id="piano_presentation">`;
        for (let i = 1; i <= TARGETS.length + 1; i++) {
          html += `<div class="piano_note interference"> </div>`;
        }
        html += `</div>`;
        return html;
      },
    };

    //Generate the block of blank interference
    const blankGap = {
      type: HtmlKeyboardResponsePlugin,
      stimulus: "",
      choices: "NO_KEYS",
      trial_duration: INTERFERENCE_DURATION,
      prompt: () => {
        let html = `
        <div id="piano_presentation_title">
        You are listening the reference note!
        </div> 
        <div id="piano_presentation">`;
        for (let i = 1; i <= TARGETS.length + 1; i++) {
          html += `<div class="piano_note ${i === 1 ? "note_activated" : "note_deactivated"}">${i === 1 ? "REF" : `+${i - 1}`}</div>`;
        }
        html += `</div>`;
        return html;
      },
    };
    // Generate the bloc to present the target during maximum 5s
    const targetTest = {
      type: AudioKeyboardResponsePlugin,
      stimulus: urlCurrentTarget,
      choices: [falseKey, trueKey],
      stimulus_duration: 1000,
      trial_duration: TIME_TO_ANSWER,
      data: { isTargetTrial: true, blockNumber },
      prompt: () => {
        let html = `
      <div id="piano_presentation_title">
        ${
          isTrue
            ? `
        Is the note +${currentTargetDistance} tone${currentTargetDistance === 1 ? "" : "s"} from the reference?`
            : `
        Is the note +${falseProposition} tone${falseProposition === 1 ? "" : "s"} from the reference?`
        }
        </div> 
        <div id="piano_presentation">`;
        for (let i = 1; i <= TARGETS.length + 1; i++) {
          if (i === 1) {
            html += `<div class="piano_note note_activated"> REF </div>`;
          } else {
            if (isTrue) {
              html += `<div class="piano_note ${i - 1 === currentTargetDistance ? 'note_question">' : `note_deactivated">`}+${i - 1} </div>`;
            } else {
              html += `<div class="piano_note ${i - 1 === falseProposition ? 'note_question">' : `note_deactivated">`}+${i - 1} </div>`;
            }
          }
        }
        html += `</div>`;
        return html;
      },
      on_start: (trial: { stimulus: string }) => {
        const { stimulus } = trial;
        DEBUG && console.log("Test started ", stimulus);
      },
      on_finish: (data: JsPsychTrialData) => {
        DEBUG && console.log("resp: ", data.response);
        DEBUG && console.log("true k", trueKey);
        DEBUG && console.log("false k", falseKey);
        data.realDistance = currentTargetDistance;
        data.targetDistanceProposition = isTrue ? currentTargetDistance : falseProposition;
        data.correct =
          (data.response === trueKey && data.targetDistanceProposition === data.realDistance) ||
          (data.response === falseKey && data.targetDistanceProposition !== data.realDistance);
        data.interference = interference;
        data.blockNumber = blockNumber;
        data.unitNumber = unitNumber;
        DEBUG && console.log(data);
        setCompletionPercent(
          ((i +
            1 +
            targetsLength * (blockNumber - 1) +
            targetsLength * NB_BLOCK_PER_UNIT * (unitNumber - 1)) *
            100) /
            (NB_BLOCK_PER_UNIT * NB_UNIT * targetsLength),
        );
      },
    };
    // Defining the block for the feedback
    const feedback = {
      type: HtmlKeyboardResponsePlugin,
      stimulus: "",
      prompt: () => {
        const lastTrial = jsPsychInstance.data.get().last(1).values()[0];
        const participantAnswer =
          lastTrial.response === null
            ? "Did Not Answer"
            : lastTrial.response === trueKey
              ? "Yes"
              : "No";
        const feedback = `<p>
          ${
            participantAnswer === "Did Not Answer"
              ? `<p><span class="feedback" id="feedback_false">You did not answer.</span></p>
              <p>You had ${TIME_TO_ANSWER / 1000} sec to answer.</p>`
              : `${lastTrial.correct ? `<p><span class="feedback" id="feedback_true">CORRECT</span></p>` : `<p><span class="feedback" id="feedback_false">INCORRECT</span></p>`}
              <p>Your answer: ${participantAnswer === "Yes" ? `<span style="color:green">Yes</span>` : `<span style="color:red">No</span>`}</p>`
          }
          <p>The answer: ${lastTrial.targetDistanceProposition === lastTrial.realDistance ? `<span style="color:green">Yes (+${lastTrial.realDistance})</span>` : `<span style="color:red">No (+${lastTrial.realDistance})</span>`}</p>
        </p >`;
        let html = `
    <div id="piano_presentation_title">
      ${feedback}
      </div> 
      <div id="piano_presentation">`;

        for (let i = 1; i <= TARGETS.length + 1; i++) {
          if (i === 1) {
            html += `<div class="piano_note note_activated">REF</div>`;
          } else {
            if (isTrue) {
              html += `<div class="piano_note ${i - 1 === currentTargetDistance ? "note_activated" : "note_deactivated"}">+${i - 1}</div>`;
            } else {
              html += `<div class="piano_note ${i - 1 === falseProposition ? "note_false" : i - 1 === currentTargetDistance ? "note_activated" : "note_deactivated"}">+${i - 1}</div>`;
            }
          }
        }
        html += `</div>`;
        return html;
      },
      choices: "NO_KEYS",
      trial_duration: 5000,
    };
    // Defining the procedure composed of the presentation of the reference and the presentation of the target
    const test_procedure = {
      timeline: interference
        ? [referencePresentation, interferencePresentation, targetTest, feedback]
        : [referencePresentation, blankGap, targetTest, feedback],
    };
    // Adding the trial to the list of all the data
    learningData.data.trialData.push(jsPsychInstance.data.get().last(1).values()[0]);
    // Pushing the procedure to the timeline
    experimentBlock.push(test_procedure);
  }

  return {
    timeline: experimentBlock,
    data: {
      learningData,
    },
  };
};

const createLearningOctave = (
  unitNumber: number,
  octaveNumber: number,
  jsPsychInstance: JsPsych,
  trueKey: string,
  falseKey: string,
  setCompletionPercent: (value: number) => void,
) => {
  const octaveTimeline: Timeline = [];
  // All the potential reference notes that can be picked for 1 block
  const referenceBucket = new Bucket(REF_NOTES);

  const inter_block_transition = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: `New block of ${TARGETS.length * 2} questions!`,
    choices: "NO_KEYS",
    trial_duration: 3000,
  };

  // Creating a learning block for each block
  for (let blockNumber = 1; blockNumber <= NB_BLOCK_PER_UNIT; blockNumber++) {
    const block = createLearningBlock(
      jsPsychInstance,
      referenceBucket,
      blockNumber,
      unitNumber,
      octaveNumber,
      trueKey,
      falseKey,
      setCompletionPercent,
    );
    block.timeline.forEach((timelineElement: Timeline) => {
      octaveTimeline.push([timelineElement]);
    });
    if (blockNumber < NB_BLOCK_PER_UNIT) {
      (octaveTimeline as Array<unknown>).push(inter_block_transition);
    }
  }
  return octaveTimeline;
};

const createLearningTask = (
  jsPsychInstance: JsPsych,
  trueKey: string,
  falseKey: string,
  setCompletionPercent: (value: number) => void,
) => {
  const taskTimeline: Array<unknown> = [];

  const inter_unit_transition = {
    type: HtmlKeyboardResponsePlugin,
    stimulus: () =>
      `PAUSE! Take a 2-3min break and come back after. (click on the space bar wwhen you are ready)!`,
    choices: " ",
  };

  const octaveBucket = new Bucket(OCTAVES);

  for (let unitNumber = 1; unitNumber <= NB_UNIT; unitNumber++) {
    const octaveNumber = octaveBucket.draw();
    const octave = createLearningOctave(
      unitNumber,
      octaveNumber,
      jsPsychInstance,
      trueKey,
      falseKey,
      setCompletionPercent,
    );
    taskTimeline.push({ timeline: octave });
    if (unitNumber < NB_UNIT) {
      taskTimeline.push(inter_unit_transition);
    }
  }

  return taskTimeline as Timeline;
};

export default function LearningTask({ responseKeys, onFinish }: LearningTaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const jsPsychRef = useRef<JsPsych | null>(null);
  const hasRun = useRef(false);
  const [completionPercent, setCompletionPercent] = useState(0);

  const trueKey: string = responseKeys.trueKey;
  const falseKey: string = responseKeys.falseKey;

  const handleFinish = useCallback(() => {
    if (!jsPsychRef.current) return;

    const allTrials = jsPsychRef.current.data
      .get()
      .filter({ isTargetTrial: true })
      .values() as JsPsychTrialData[];

    jsPsychRef.current.abortExperiment();

    const learningData: LearningTrialData[] = allTrials.map((trial, index) => ({
      trialNumber: index + 1,
      blockNumber: trial.blockNumber,
      unitNumber: trial.unitNumber,
      responseTime: trial.rt,
      isAnswerCorrect: trial.correct,
      isPropositionCorrect: trial.targetDistanceProposition === trial.realDistance,
      interference: trial.interference,
      referenceToTargetRealDistance: trial.realDistance,
    }));

    DEBUG && console.log(learningData);
    onFinish(learningData);
  }, [onFinish]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (!containerRef.current) return;

    jsPsychRef.current = initJsPsych({
      display_element: containerRef.current,
      on_finish: handleFinish,
    });

    const timeline = createLearningTask(
      jsPsychRef.current,
      trueKey,
      falseKey,
      setCompletionPercent,
    );
    jsPsychRef.current.run(timeline);
  }, [handleFinish, falseKey, trueKey]);

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Header title="LEARNING TASK" />
      <main className="h-fit w-screen flex justify-center items-center py-50">
        <div ref={containerRef}></div>
      </main>
      {falseKey === "s" && (
        <>
          <div id="false_answer_recall_left">{falseKey.toUpperCase()} for FALSE</div>
          <div id="true_answer_recall_right">{trueKey.toUpperCase()} for TRUE</div>
        </>
      )}
      {falseKey === "l" && (
        <>
          <div id="false_answer_recall_right">{falseKey.toUpperCase()} for FALSE</div>
          <div id="true_answer_recall_left">{trueKey.toUpperCase()} for TRUE</div>
        </>
      )}
      {DEBUG && (
        <button type="button" className="absolute top-0 left-0" onClick={handleFinish}>
          finish
        </button>
      )}
      <ProgressBar
        progressionPercent={Math.round(completionPercent)}
        className="absolute bottom-4"
      />
    </div>
  );
}
