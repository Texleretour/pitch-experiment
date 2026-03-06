import AudioKeyboardResponsePlugin from "@jspsych/plugin-audio-keyboard-response";
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

type trialData = {
  trial_number: number; // the rank of the trial [1,6]
  rt: number; // reaction time
  response: string | null; // the key pressed
  stimulus: string; // the file of the audio
  correct: boolean; // the correctness of the answer of the participant
  realDistance: number; // the real distance of the proposed note
  targetDistanceProposition: number; // the printed distance of the proposed note
};

type LearningTaskProps = {
  onFinish: () => void;
};

type LearningBlock = {
  timeline: Timeline;
  propositions: boolean[];
};

const createLearningBlock = (jsPsychInstance: JsPsych): LearningBlock => {
  /**
   * Returns an experiment block composed of:
   * - Reference note (constant)
   * - Gap
   * - Target note
   * - Feedback
   * All of this 6 times, with a single unique reference note
   */

  const experimentBlock: Timeline = [];

  // All the potential reference notes that can be picked for 1 block
  const referenceBucket = new Bucket([1]);

  // Pick a reference from the bucket
  const referenceNumber = referenceBucket.draw();
  DEBUG && console.log(referenceNumber);
  const urlReference = `${AUDIO_FILES_PATH}${referenceNumber}.wav`;

  // Defining the bucet of the +1, +2 and +3 targets
  const targets = new Bucket([1, 2, 3, 1, 2, 3]);
  const targetsLength = targets.length;

  // Initializing the list of the correct propositions
  const propositions: boolean[] = [];

  // Scale presentation
  // All the possible targets
  const urlTargets = [
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber}.wav` },
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber + 1 * 6}.wav` },
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber + 2 * 6}.wav` },
    { stimulus: `${AUDIO_FILES_PATH}${referenceNumber + 3 * 6}.wav` },
  ];

  const scalePresentation = {
    type: AudioKeyboardResponsePlugin,
    stimulus: jsPsychInstance.timelineVariable("stimulus"),
    choices: "NO_KEYS",
    trial_duration: 1000,
    post_trial_gap: 200,
    prompt: `
      <p>
        <strong>
        You are listening to the scale, starting by the reference and its 3 following notes.
        <strong>
      <p>
      `,
  };

  //  Defining the procedure of the presentation of the scale
  const scalePresentationProcedure = {
    timeline: [scalePresentation],
    timeline_variables: urlTargets,
  };

  // Pushing the presentation of the scale before runiing the block
  experimentBlock.push(scalePresentationProcedure);
  for (let i = 0; i < targetsLength; i++) {
    // draw the target
    const currentTargetDistance = targets.draw();
    const urlCurrentTarget = `${AUDIO_FILES_PATH}${referenceNumber + currentTargetDistance * 6}.wav`;
    // define if the target is true or false
    const targetProposition = Math.random() < 0.5;
    // generate the bloc to present the reference during 5s
    const referencePresentation = {
      type: AudioKeyboardResponsePlugin,
      stimulus: urlReference,
      choices: "NO_KEYS",
      trial_duration: 1000,
      post_trial_gap: 2000,
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
    };
    // generate the bloc to present the target during maximum 5s
    const targetTest = {
      type: AudioKeyboardResponsePlugin,
      stimulus: urlCurrentTarget,
      choices: ["s", "l"],
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
        Is the note TO DEFINE from the reference ?
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
        The good answer: ${lastTrial.targetDistanceProposition === lastTrial.realDistance ? `: Yes (+${lastTrial.realDistance})` : `: No (+${lastTrial.realDistance})`}
        </strong >
      </p >
  `;
      },
      choices: "NO_KEYS",
      trial_duration: 5000,
    };
    // Defining the procedure composed of the presentation of the reference and the presentation of the target
    const test_procedure = {
      timeline: [referencePresentation, targetTest],
    };
    // adding the proposition of the target to the list of all the targets of the block
    propositions.push(targetProposition);
    // pushing the procedure to the timeline
    experimentBlock.push(test_procedure);
  }

  return {
    timeline: experimentBlock,
    propositions: propositions,
  };
};

export default function LearningTask({ onFinish }: LearningTaskProps) {
  // Initializing the jsPsych object

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
    });

    const block = createLearningBlock(jsPsychRef.current);

    jsPsychRef.current.run(block.timeline);
  }, []);

  return (
    <div ref={containerRef}>
      <button type="button" onClick={() => onFinish()}>
        Learning task blabla
      </button>
    </div>
  );
}
