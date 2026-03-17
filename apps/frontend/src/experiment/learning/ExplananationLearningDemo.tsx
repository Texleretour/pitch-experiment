import { useState } from "react";
import "./style_learning.css";

type ExplanationsLearningDemoProps = {
  onFinish: () => void;
};

function Explanations(currentPage: number) {
  switch (currentPage) {
    case 0:
      return (
        <>
          <h1>Learning task Demo</h1>
          <p>
            You are going to take place in the <strong>Learning Task</strong>! Before doing it, you
            will firstly do a <strong>demo</strong> of it to be sure the assignment is understood.
          </p>
        </>
      );
    case 1:
      return (
        <>
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
          <p>
            REF: the sound 'A' which will be your <strong>reference note</strong>.
          </p>
          <p>B: the sound 'B'</p>
          <p>C: the sound 'C'</p>
          <p>D: the sound 'D'</p>
          <p>E: the sound 'E'</p>
        </>
      );

    case 2:
      return (
        <>
          <h1>The Colors</h1>
          <p>
            -A <span style={{ color: "green" }}> green color </span> means{" "}
            <span style={{ color: "green" }}>GOOD ANSWER</span>. (Note: the REF is always displayed
            in green because it is always true){" "}
          </p>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_deactivated"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <h1>The Colors</h1>
          <p>
            -A <span style={{ color: "green" }}> green color </span> means{" "}
            <span style={{ color: "green" }}>GOOD ANSWER</span>. (Note: the REF is always displayed
            in green because it is always true){" "}
          </p>
          <p>
            -A <span style={{ color: "orange" }}> orange color </span> means{" "}
            <span style={{ color: "orange" }}>QUESTION</span>.
          </p>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_question"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <h1>The Colors</h1>
          <p>
            -A <span style={{ color: "green" }}> green color </span> means{" "}
            <span style={{ color: "green" }}>GOOD ANSWER</span>. (Note: the REF is always displayed
            in green because it is always true){" "}
          </p>
          <p>
            -A <span style={{ color: "orange" }}> orange color </span> means{" "}
            <span style={{ color: "orange" }}>QUESTION</span>.
          </p>
          <p>
            -A <span style={{ color: "red" }}> red color </span> means{" "}
            <span style={{ color: "red" }}>FALSE</span>.
          </p>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_activated"> C </div>
            <div className="piano_note note_false"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <h1>The Text</h1>
          <p>Every text (including the questions) will be displayed in the following rectangle.</p>
          <div id="piano_presentation_title_inline">Text container</div>
        </>
      );

    case 6:
      return (
        <>
          <h1>The Scale Presentation</h1>
          <p>When you are listening to the scale (to all the notes), the text will say it.</p>
          <div id="piano_presentation_title_inline">
            You are listening to the scale, starting by the reference and its 4 following notes.
          </div>
          <div id="piano_presentation_inline">
            <div className="piano_note note_activated"> REF </div>
            <div className="piano_note note_deactivated"> B </div>
            <div className="piano_note note_deactivated"> C </div>
            <div className="piano_note note_deactivated"> D </div>
            <div className="piano_note note_deactivated"> E </div>
          </div>
        </>
      );

    case 7:
      return (
        <>
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
        </>
      );

    case 8:
      return (
        <>
          <h1>Giving your answer</h1>
          <p>
            You can give your answer by using the <strong>keyboard</strong>. "S" and "L" can be
            used. To know what key correspond to what answer, look at the colormap at the bottom of
            the page.
          </p>
          <div id="false_answer_recall_left">S</div>
          <div id="true_answer_recall_right">L</div>
          <p>
            In this case, "S" stands for <strong>FALSE</strong> and "L" stands for{" "}
            <strong>TRUE</strong>.
          </p>
        </>
      );

    case 9:
      return (
        <>
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
        </>
      );

    case 10:
      return (
        <>
          <h1>The Interference</h1>
          <p>
            Sometimes, just after hearing the reference note, you will hear a distrubing sound. This
            is an <strong>interference</strong> sound.
          </p>
          <p>
            If you hear it, it is normal. The goal for you is to ignore it and act as if it was not
            there.
          </p>
        </>
      );

    case 11:
      return (
        <>
          <h1>Your turn!</h1>
          <p>The goal is to be accurate. You have 5sec to answer each question.</p>
          <p>If you have understood and you are ready, let's start!</p>
        </>
      );
  }
}

export default function ExplananationLearningDemo({ onFinish }: ExplanationsLearningDemoProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const NB_PAGES = 12;

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-1">
      <div id="header">Learning Task Demo</div>
      {Explanations(currentPage)}
      <div style={{ display: "flex", gap: "10px" }}>
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
