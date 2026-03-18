import { useState } from "react";
import "./style_learning.css";

type ExplanationsLearningDemoProps = {
  onFinish: () => void;
};

function Explanations(currentPage: number) {
  switch (currentPage) {
    case 0:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Learning task Demo</h1>
          <p>
            You are going to participate in the <strong>Learning Task</strong>! Before doing it, you
            will firstly do a <strong>demo</strong> of it to be sure the assignment is understood.
          </p>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Scale</h1>
          <p>In the demo, every note will be replaced by a letter (A, B, C, D, E)</p>
          <p>
            Here is the <strong>scale:</strong>
          </p>
          <div id="piano_presentation_inline">
            <div className="piano_note note_deactivated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_deactivated"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
          <ul className="list-disc">
            <li>
              REF: the sound 'A' which will be your <strong>reference note</strong>.
            </li>
            <li>B: the sound 'B'</li>
            <li>C: the sound 'C'</li>
            <li>D: the sound 'D'</li>
            <li>E: the sound 'E'</li>
          </ul>
        </div>
      );

    case 2:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Colors</h1>
          <ul className="list-disc">
            <li>
              A <span style={{ color: "green" }}> green color </span> means{" "}
              <span style={{ color: "green" }}>GOOD ANSWER</span>. (Note: the REF is always
              displayed in green because it is always true){" "}
            </li>
          </ul>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_deactivated"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Colors</h1>
          <ul className="list-disc">
            <li>
              A <span style={{ color: "green" }}> green color </span> means{" "}
              <span style={{ color: "green" }}>GOOD ANSWER</span>. (Note: the REF is always
              displayed in green because it is always true){" "}
            </li>
            <li>
              A <span style={{ color: "orange" }}> orange color </span> means{" "}
              <span style={{ color: "orange" }}>QUESTION</span>.
            </li>
          </ul>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_question"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Colors</h1>
          <ul className="list-disc">
            <li>
              A <span style={{ color: "green" }}> green color </span> means{" "}
              <span style={{ color: "green" }}>GOOD ANSWER</span>. (Note: the REF is always
              displayed in green because it is always true){" "}
            </li>
            <li>
              A <span style={{ color: "orange" }}> orange color </span> means{" "}
              <span style={{ color: "orange" }}>QUESTION</span>.
            </li>
            <li>
              A <span style={{ color: "red" }}> red color </span> means{" "}
              <span style={{ color: "red" }}>FALSE</span>.
            </li>
          </ul>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_activated"> C </div>
            <div className="piano_note note_false"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Question Presentattion</h1>
          <p>When a question is asked, the question will appear.</p>
          <div id="piano_presentation_title_inline">Is the note a D?</div>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_question"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Giving your answer</h1>
          <p>
            You can give your answer by using the <strong>keyboard</strong>. "S" and "L" can be
            used. To know what key correspond to what answer, look at the colormap at the bottom of
            the page.
          </p>
          <div id="false_answer_recall_left">S for FALSE</div>
          <div id="true_answer_recall_right">L for TRUE</div>
          <p>
            In this case, "S" stands for <strong>FALSE</strong> and "L" stands for{" "}
            <strong>TRUE</strong>.
          </p>
        </div>
      );

    case 7:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Feedback</h1>
          <p>After giving your answer, a feedback will appear.</p>
          <div id="piano_presentation_title_inline">
            <p>
              Your answer is:{" "}
              <span className="feedback" id="feedback_true">
                CORRECT
              </span>
            </p>
            <p>Your answer: FALSE</p>
            <p>The answer: No (C)</p>
          </div>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_activated"> C </div>
            <div className="piano_note note_false"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </div>
      );

    case 8:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Interference</h1>
          <p>
            Sometimes, just after hearing the reference note, you will hear a disturbing sound. This
            is an <strong>interference</strong> sound.
          </p>
          <p>
            If you hear it, it is normal. The goal for you is to ignore it and act as if it was not
            there.
          </p>
        </div>
      );

    case 9:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Your turn!</h1>
          <p>The goal is to be accurate. You have 5sec to answer each question.</p>
          <p>If you have understood and you are ready, let's start!</p>
        </div>
      );
  }
}

export default function ExplanationLearningDemo({ onFinish }: ExplanationsLearningDemoProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const NB_PAGES = 10;

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-1">
      <div id="header">Learning Task Demo</div>
      <div className="min-h-100 h-fit w-1/2 flex flex-col justify-center items-center">
        {Explanations(currentPage)}
      </div>
      <div className="flex gap-10">
        {currentPage > 0 && (
          <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous Explanations
          </button>
        )}
        {currentPage < NB_PAGES - 1 && (
          <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
            Next Explanations
          </button>
        )}
      </div>
      {currentPage === NB_PAGES - 1 && (
        <button type="button" onClick={() => onFinish()}>
          Start the demo!
        </button>
      )}
    </div>
  );
}
