import { useState } from "react";
import "./style_learning.css";
import Header from "../../components/ui/Header";

type ExplanationsLearningDemoProps = {
  onFinish: () => void;
};

function Explanations(currentPage: number) {
  switch (currentPage) {
    case 0:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Demo</h1>
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
          <p>
            In the demo, every musical note will be replaced by a letter (A, B, C, D, E). Here is
            the <strong>scale:</strong>
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
              displayed in green because it is always true)
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
              displayed in green because it is always true)
            </li>
            <li>
              An <span style={{ color: "orange" }}> orange color </span> means
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
              displayed in green because it is always true)
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
          <h1>The Question</h1>
          <p>When a question is asked, it will appear as follows:</p>
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
          <ul>
            <li>
              You can give your answer by using the <strong>keyboard</strong>. "S" and "L" can be
              used. To know what key corresponds to what answer, look at the colormap at the bottom
              of the page.
            </li>
            <li>
              In this case, "S" stands for <strong>FALSE</strong> and "L" stands for{" "}
              <strong>TRUE</strong>.
            </li>
          </ul>
          <div id="false_answer_recall_left">S for FALSE</div>
          <div id="true_answer_recall_right">L for TRUE</div>
        </div>
      );

    case 7:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Feedback</h1>
          <p>After giving your answer, a feedback will appear as follows:</p>
          <div id="piano_presentation_title_inline">
            <p>
              <span className="feedback" id="feedback_true">
                CORRECT
              </span>
            </p>
            <p>
              Your answer: <span style={{ color: "red" }}>No</span>
            </p>
            <p>
              The answer: <span style={{ color: "red" }}>No (C)</span>
            </p>
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
          <ul>
            <li>
              Sometimes, just after hearing the reference note, you will hear a disturbing sound.
              This is an <strong>interference</strong> sound.
            </li>
            <li>
              If you hear it, it is normal. The goal for you is to ignore it and act as if it was
              not there.
            </li>
          </ul>
        </div>
      );

    case 9:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Your turn!</h1>
          <ul>
            <li>
              The goal is to be <strong>accurate</strong>. You have 5sec to answer each question.
            </li>
            <li>
              In the demo, you will be asked <strong>4</strong> questions.
            </li>
            <li>If you have understood and you are ready, let's start!</li>
          </ul>
        </div>
      );
  }
}

export default function ExplanationLearningDemo({ onFinish }: ExplanationsLearningDemoProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const NB_PAGES = 10;

  return (
    <div className="flex flex-col items-center w-screen min-h-screen gap-1">
      <Header title="Learning Task Demo" />
      <main className="flex flex-col items-center gap-4 w-full py-10">
        <div className="min-h-100 w-1/2 flex flex-col justify-center items-center">
          {Explanations(currentPage)}
        </div>
      </main>
      <div className="flex gap-5">
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
        {currentPage === NB_PAGES - 1 && (
          <button type="button" onClick={() => onFinish()}>
            Start the demo!
          </button>
        )}
      </div>
    </div>
  );
}
