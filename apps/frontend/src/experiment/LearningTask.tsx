import AudioKeyboardResponsePlugin from "@jspsych/plugin-audio-keyboard-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import { initJsPsych, type JsPsych } from "jspsych";
import { useEffect, useRef } from "react";
import Bucket from "../lib/bucket";

const AUDIO_FILES_PATH = "/public/audio/learning/INM_";
const DEBUG = true;
type Timeline = Parameters<ReturnType<typeof initJsPsych>["run"]>[0];
const TARGETS = [1, 2, 3]; // the targets are +1, +2, +3 from the reference
const NOTES = [1]; // all the possible reference notes
const TRUE_KEY = "l"; // the key of the keyboard to say yes
const FALSE_KEY = "s"; // the key of the keyboard to say no
const TIME_TO_ANSWER = 5000; // the time to answer when the target is presented
const INTERFERENCE_DURATION = 2000; // the time of the presentation of either the interference or the blank gap between ref and target

type trialData = {
  trial_number: number; // the rank of the trial [1,6]
  rt: number; // reaction time
  response: string | null; // the key pressed
  stimulus: string; // the file of the audio
  correct: boolean; // the correctness of the answer of the participant
  realDistance: number; // the real distance of the proposed note
  targetDistanceProposition: number; // the printed distance of the proposed note
  interference: boolean; // the group attribution about the interference
};

type LearningTaskProps = {
  onFinish: () => void;
  participantCode: string;
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
  participantCode: string;
  data: {
    trialData: trialData[];
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
 * @param code the participant code
 * @returns
 */
const createLearningBlock = (jsPsychInstance: JsPsych, code: string): LearningBlock => {
  // Initializing the block (firstly empty)
  const experimentBlock: Timeline = [];

  // All the potential reference notes that can be picked for 1 block
  const referenceBucket = new Bucket(NOTES);

  // Pick a reference from the bucket
  const referenceNumber = referenceBucket.draw();
  const urlReference = `${AUDIO_FILES_PATH}${referenceNumber}.wav`;

  // Defining the bucket of the +1, +2 and +3 targets (2 times to make 6 questions)
  const targets = new Bucket(TARGETS.concat(TARGETS));
  const targetsLength = targets.length;

  // Initializing the data object with firstly empty data list for the trials (because no trials yet have been done)
  const learningData: LearningData = {
    participantCode: code,
    data: {
      trialData: [],
    },
  };

  // All the possible targets from the reference
  const urlTargets = [
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber}.wav` },
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber + 1 * 6}.wav` },
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber + 2 * 6}.wav` },
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber + 3 * 6}.wav` },
  ];

  // Defining the block of the presentation of the scale (a sclae is the reference note and the hree following notes)
  const scalePresentation = {
    type: AudioKeyboardResponsePlugin,
    stimulus: jsPsychInstance.timelineVariable("stimulus"),
    choices: "NO_KEYS",
    trial_duration: 1000,
    post_trial_gap: 200,
  };

  // Defining the procedure of the presentation of the scale
  const scalePresentationProcedure = {
    timeline: [scalePresentation],
    timeline_variables: urlTargets,
    prompt: `
      <p>
        <strong>
        You are listening to the scale, starting by the reference and its 3 following notes.
        <strong>
      <p>
      `,
  };

  // Pushing the presentation of the scale before running the block
  experimentBlock.push(scalePresentationProcedure);

  for (let i = 0; i < targetsLength; i++) {
    // Draw the target
    const currentTargetDistance = targets.draw();
    const urlCurrentTarget = `${AUDIO_FILES_PATH}${referenceNumber + currentTargetDistance * 6}.wav`;
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
      post_trial_gap: interference ? 0 : INTERFERENCE_DURATION, // if interference then no gap because we move on the interference
      prompt: `
      <p>
        <strong>
        You are listening to the reference.
        <strong>
      <p>
      `,
      on_start: (trial: { stimulus: string }) => {
        const { stimulus } = trial;
        DEBUG && console.log("Reference presentation started ", stimulus);
      },
      on_finish: () => {
        !interference && DEBUG && console.log("No interference");
      },
    };

    // Generate the bloc of the interference
    const interferencePresentation = {
      type: AudioKeyboardResponsePlugin,
      stimulus: `${AUDIO_FILES_PATH}baseline.wav`,
      choices: "NO_KEYS",
      trial_duration: INTERFERENCE_DURATION,
      prompt: `
      <p>
        <strong>
        INTERFERENCE SOUND.
        <strong>
      <p>
      `,
      on_start: () => {
        DEBUG && console.log("Interference playing");
      },
    };
    // Generate the bloc to present the target during maximum 5s
    const targetTest = {
      type: AudioKeyboardResponsePlugin,
      stimulus: urlCurrentTarget,
      choices: [FALSE_KEY, TRUE_KEY],
      stimulus_duration: 1000,
      trial_duration: TIME_TO_ANSWER,
      prompt: isTrue
        ? `
      <p>
        <strong>
        Is the note +${currentTargetDistance} from the reference ?
        <strong>
      <p>
      `
        : `
      <p>
        <strong>
        Is the note +${falseProposition} from the reference ?
        <strong>
      <p>
      `,
      on_start: (trial: { stimulus: string }) => {
        const { stimulus } = trial;
        DEBUG && console.log("Test started ", stimulus);
      },
      on_finish: (data: trialData) => {
        data.realDistance = currentTargetDistance;
        data.targetDistanceProposition = isTrue ? currentTargetDistance : falseProposition;
        data.correct =
          (data.response === TRUE_KEY && data.targetDistanceProposition === data.realDistance) ||
          (data.response === FALSE_KEY && data.targetDistanceProposition !== data.realDistance);
        data.interference = interference;
        DEBUG && console.log(data);
      },
    };
    // Defining the block for the feedback
    const feedback = {
      type: HtmlKeyboardResponsePlugin,
      stimulus: () => {
        const lastTrial = jsPsychInstance.data.get().last(1).values()[0];
        const participantAnswer =
          lastTrial.response === null
            ? "Did Not Answered"
            : lastTrial.response === TRUE_KEY
              ? "Yes"
              : "No";
        return `
      <p>
        <strong>
        ${
          participantAnswer === "Did Not Answered"
            ? `You did not answered. <br>
            You had ${TIME_TO_ANSWER / 1000} sec to answer. <br>`
            : `${lastTrial.correct ? `CORRECT <br>` : `INCORRECT <br>`}
            Your answer: ${participantAnswer}<br>`
        }
        The good answer: ${lastTrial.targetDistanceProposition === lastTrial.realDistance ? `Yes (+${lastTrial.realDistance})` : `No (+${lastTrial.realDistance})`}
        </strong >
      </p >
  `;
      },
      choices: "NO_KEYS",
      trial_duration: 5000,
    };
    // Defining the procedure composed of the presentation of the reference and the presentation of the target
    const test_procedure = {
      timeline: interference
        ? [referencePresentation, interferencePresentation, targetTest, feedback]
        : [referencePresentation, targetTest, feedback],
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

export default function LearningTask({ onFinish, participantCode }: LearningTaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const jsPsychRef = useRef<JsPsych | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (!containerRef.current) return;

    jsPsychRef.current = initJsPsych({
      display_element: containerRef.current,
      show_progress_bar: true,
      on_finish: onFinish,
    });

    const block = createLearningBlock(jsPsychRef.current, participantCode);

    jsPsychRef.current.run(block.timeline);
  }, [participantCode, onFinish]);

  return (
    <div>
      {/* <div id="scale-instruction">
      <p>
        <strong>
          You are listening to the scale, starting by the reference and its 3 following notes.
        </strong>
      </p>
    </div> */}

      <div ref={containerRef}></div>
    </div>
  );
}
