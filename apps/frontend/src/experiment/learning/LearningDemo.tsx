import AudioKeyboardResponsePlugin from "@jspsych/plugin-audio-keyboard-response";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import { initJsPsych, type JsPsych } from "jspsych";
import { useCallback, useEffect, useRef, useState } from "react";
import Bucket from "../../lib/bucket";
import "./style_learning.css";
import { DEBUG } from "../../../config.json";
import Header from "../../components/ui/Header";
import ProgressBar from "../../components/ui/ProgressBar";

const AUDIO_FILES_PATH = "/audio/learning/demo/";
type Timeline = Parameters<ReturnType<typeof initJsPsych>["run"]>[0];
const TARGETS = [1, 2, 3, 4]; // the targets are +1, +2, +3 , +4 from the reference
const TIME_TO_ANSWER = 5000; // the time to answer when the target is presented
const INTERFERENCE_DURATION = 2000; // the time of the presentation of either the interference or the blank gap between ref and target
const NB_QUESTION = 4;
const TIME_FEEDBACK = 3000;

type JsPsychTrialData = {
  rt: number;
  response: string | null;
  correct: boolean;
  realDistance: number;
  targetDistanceProposition: number;
};

type LearningDemoProps = {
  onFinish: (learningReponseKeys: LearningResponseKeys) => void;
};

type LearningResponseKeys = {
  trueKey: string;
  falseKey: string;
};

// one learning bloc is the return of the function that creates a block/ It is a timeline and data
type LearningDemoBlock = {
  timeline: Timeline;
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
const createLearningDemo = (
  jsPsychInstance: JsPsych,
  trueKey: string,
  falseKey: string,
  setCompletionPercent: (value: number) => void,
): LearningDemoBlock => {
  // Initializing the block (firstly empty)
  const experimentBlock: Timeline = [];
  // Pick a reference from the bucket
  const urlReference = `${AUDIO_FILES_PATH}a.mp3`;

  // Defining the bucket of the +1, +2, +3 and +4 targets (2 times to make 8 questions)
  const targets = new Bucket(TARGETS.concat(TARGETS));

  // All the possible targets from the reference
  const urlTargets = [
    { stimulus: urlReference },
    { stimulus: `${AUDIO_FILES_PATH}b.mp3` },
    { stimulus: `${AUDIO_FILES_PATH}c.mp3` },
    { stimulus: `${AUDIO_FILES_PATH}d.mp3` },
    { stimulus: `${AUDIO_FILES_PATH}e.mp3` },
  ];

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
        html += `<div class="piano_note ${i === note_scale_presented ? "note_activated" : "note_deactivated"}"> ${i === 1 ? "REF" : `${String.fromCharCode(64 + i)}`} </div>`;
      }
      html += `</div>`;
      note_scale_presented++;
      return html;
    },
  };

  // Pushing the presentation of the scale before running the block
  experimentBlock.push(scalePresentationProcedure);

  for (let i = 0; i < NB_QUESTION; i++) {
    // Draw the target
    const currentTargetDistance = targets.draw();
    const urlCurrentTarget = `${AUDIO_FILES_PATH}${String.fromCharCode(97 + currentTargetDistance)}.mp3`;
    DEBUG && console.log(urlCurrentTarget);
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
          html += `<div class="piano_note ${i === 1 ? 'note_activated"> REF ' : `note_deactivated"> ${String.fromCharCode(64 + i)}`} </div>`;
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
          html += `<div class="piano_note ${i === 1 ? "note_activated" : "note_deactivated"}">${i === 1 ? "REF" : `${String.fromCharCode(64 + i)}`}</div>`;
        }
        html += `</div>`;
        return html;
      },
    };

    DEBUG && console.log("true key: ", trueKey);
    DEBUG && console.log("false key: ", falseKey);
    // Generate the bloc to present the target during maximum 5s
    const targetTest = {
      type: AudioKeyboardResponsePlugin,
      stimulus: urlCurrentTarget,
      choices: [falseKey, trueKey],
      stimulus_duration: 1000,
      trial_duration: TIME_TO_ANSWER,
      data: { isTargetTrial: true },
      prompt: () => {
        let html = `
      <div id="piano_presentation_title">
        ${
          isTrue
            ? `
        Is the note ${String.fromCharCode(65 + currentTargetDistance)}?`
            : `
        Is the note ${String.fromCharCode(65 + falseProposition)}?`
        }
        </div>
        <div id="piano_presentation">`;
        for (let i = 1; i <= TARGETS.length + 1; i++) {
          if (i === 1) {
            html += `<div class="piano_note note_activated"> REF </div>`;
          } else {
            if (isTrue) {
              html += `<div class="piano_note ${i - 1 === currentTargetDistance ? 'note_question">' : `note_deactivated">`}${String.fromCharCode(64 + i)} </div>`;
            } else {
              html += `<div class="piano_note ${i - 1 === falseProposition ? 'note_question">' : `note_deactivated">`}${String.fromCharCode(64 + i)} </div>`;
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
        data.realDistance = currentTargetDistance;
        data.targetDistanceProposition = isTrue ? currentTargetDistance : falseProposition;
        data.correct =
          (data.response === trueKey && data.targetDistanceProposition === data.realDistance) ||
          (data.response === falseKey && data.targetDistanceProposition !== data.realDistance);
        DEBUG && console.log(data);
        setCompletionPercent(((i + 1) * 100) / NB_QUESTION);
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
          <p>The answer: ${lastTrial.targetDistanceProposition === lastTrial.realDistance ? `<span style="color:green">Yes (${String.fromCharCode(65 + lastTrial.realDistance)})</span>` : `<span style="color:red">No (${String.fromCharCode(65 + lastTrial.realDistance)})</span>`}</p>
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
              html += `<div class="piano_note ${i - 1 === currentTargetDistance ? "note_activated" : "note_deactivated"}">${String.fromCharCode(64 + i)}</div>`;
            } else {
              html += `<div class="piano_note ${i - 1 === falseProposition ? "note_false" : i - 1 === currentTargetDistance ? "note_activated" : "note_deactivated"}">${String.fromCharCode(64 + i)}</div>`;
            }
          }
        }
        html += `</div>`;
        return html;
      },
      choices: "NO_KEYS",
      trial_duration: TIME_FEEDBACK,
    };
    // Defining the procedure composed of the presentation of the reference and the presentation of the target
    const test_procedure = {
      timeline: interference
        ? [referencePresentation, interferencePresentation, targetTest, feedback]
        : [referencePresentation, blankGap, targetTest, feedback],
    };
    // Pushing the procedure to the timeline
    experimentBlock.push(test_procedure);
  }

  return {
    timeline: experimentBlock,
  };
};

export default function LearningDemo({ onFinish }: LearningDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const jsPsychRef = useRef<JsPsych | null>(null);
  const hasRun = useRef(false);
  const [completionPercent, setCompletionPercent] = useState(0);

  const trueKey = useRef(Math.random() > 0.5 ? "l" : "s");
  const falseKey = useRef(trueKey.current === "l" ? "s" : "l");

  const handleFinish = useCallback(() => {
    if (!jsPsychRef.current) return;

    jsPsychRef.current.abortExperiment();

    onFinish({ trueKey: trueKey.current, falseKey: falseKey.current });
  }, [onFinish]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (!containerRef.current) return;

    jsPsychRef.current = initJsPsych({
      display_element: containerRef.current,
      on_finish: handleFinish,
    });

    const timeline = createLearningDemo(
      jsPsychRef.current,
      trueKey.current,
      falseKey.current,
      setCompletionPercent,
    );
    jsPsychRef.current.run(timeline.timeline);
  }, [handleFinish]);

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Header title="LEARNING TASK DEMO" />
      <main className="h-fit w-screen flex justify-center items-center py-50">
        <div ref={containerRef}></div>
      </main>
      {falseKey.current === "s" && (
        <>
          <div id="false_answer_recall_left">{falseKey.current.toUpperCase()} for FALSE</div>
          <div id="true_answer_recall_right">{trueKey.current.toUpperCase()} for TRUE</div>
        </>
      )}
      {falseKey.current === "l" && (
        <>
          <div id="false_answer_recall_right">{falseKey.current.toUpperCase()} for FALSE</div>
          <div id="true_answer_recall_left">{trueKey.current.toUpperCase()} for TRUE</div>
        </>
      )}
      {DEBUG && (
        <button type="button" className="absolute bottom-0 left-0" onClick={handleFinish}>
          finish
        </button>
      )}
      <ProgressBar progressionPercent={completionPercent} className="absolute bottom-4" />
    </div>
  );
}
