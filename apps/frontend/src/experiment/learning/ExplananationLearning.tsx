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
          <h1>It's over!</h1>
          <p>
            The <strong>Learning Task Demo</strong> is over, we hope you understood the assignment!
          </p>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Learning Task</h1>
          <p>
            You are going to participate in the <strong>Learning Task</strong>! The task will be
            much the same as the <strong>Learning Task Demo</strong> that you just finished, give or
            take a few details. Let's explore them:
          </p>
        </div>
      );

    case 2:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Sounds</h1>
          <p>
            The main difference between the two tasks is the <strong>sounds</strong> you hear.
            Instead of hearing <strong style={{ fontSize: "1.3em" }}>letters</strong>, you will now
            hear <strong style={{ fontSize: "1.3em" }}>muscial notes</strong>. The scale will so be:
            <div id="piano_presentation_inline">
              <div className="piano_note note_deactivated"> REF </div>
              <div className="piano_note note_deactivated"> +1 </div>
              <div className="piano_note note_deactivated"> +2 </div>
              <div className="piano_note note_deactivated"> +3 </div>
              <div className="piano_note note_deactivated"> +4 </div>
            </div>
            <ul className="list-disc">
              <li>
                REF: the <strong>reference musical note</strong>.
              </li>
              <li>
                +1: the note distanced by <strong>1</strong> tone from the reference.
              </li>
              <li>
                +2: the note distanced by <strong>1</strong> tone from the "+1" note.
              </li>
              <li>
                +3: the note distanced by <strong>1</strong> tone from the "+2" note.
              </li>
              <li>
                +4: the note distanced by <strong>1</strong> tone from the "+3" note.
              </li>
            </ul>
          </p>
        </div>
      );

    case 3:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Procedure</h1>
          <ul>
            <li>
              The task is composed of <strong>64 questions</strong>. You will firstly answer to{" "}
              <strong>32 questions</strong>, then take a break, and come back to answer to the last
              32 questions. Each block of 32 questions is itself splitted into 4 sub-blocks of 8
              questions.
            </li>
          </ul>
        </div>
      );

    case 4:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Your turn!</h1>
          <ul>
            <li>If you have understood and are ready, let's start!</li>
            <li>
              Remember: the goal is to be as{" "}
              <strong style={{ color: "red", fontSize: "1.2em" }}>ACCURATE</strong> as possible.
              You'll be given 5 seconds to answer!
            </li>
          </ul>
        </div>
      );
  }
}

export default function ExplanationLearning({ onFinish }: ExplanationsLearningDemoProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const NB_PAGES = 5;

  return (
    <div className="flex flex-col items-center w-screen min-h-screen gap-1">
      <Header title="Learning Task" />
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
            Start the task!
          </button>
        )}
      </div>
    </div>
  );
}
