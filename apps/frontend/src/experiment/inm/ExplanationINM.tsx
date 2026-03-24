import { useState } from "react";
import chevron from "../../assets/chevron-right-svgrepo-com.svg";
import doubleChevron from "../../assets/chevrons-right-svgrepo-com.svg";
import Header from "../../components/ui/Header";

type ExplanationsINMProps = {
  onFinish: () => void;
};

function Explanations(currentPage: number) {
  switch (currentPage) {
    case 0:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>It's over!</h1>
          <p>
            The <strong>Learning Task </strong> is over! But don't go now, we still need you!
          </p>
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The INM Task</h1>
          <p>
            You are going to participate in the <strong>INM Task</strong>! In this task, you will
            hear sounds and try to recreate them.
          </p>
        </div>
      );

    case 2:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Buttons</h1>
          To recreate the sound you hear, you will have access to the following tools:
          <div className="w-fit flex flex-col gap-4">
            <p className="text-center text-2xl">Current frequency: {"XXX"} Hz</p>
            <div className="flex justify-center gap-4">
              <button type="button">
                <img
                  src={doubleChevron}
                  alt="-66"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 66 cents"
                />
              </button>
              <button type="button">
                <img
                  src={chevron}
                  alt="-33"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 33 cents"
                />
              </button>
              <button type="button">Play current pitch</button>
              <button type="button">
                <img
                  src={chevron}
                  alt="+33"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 33 cents"
                />
              </button>
              <button type="button">
                <img
                  src={doubleChevron}
                  alt="+66"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 66 cents"
                />
              </button>
            </div>
            <button type="button">Confirm</button>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Arrow Buttons</h1>
          <ul className="list-disc">
            <li>
              The simple arrow buttons (in <span className="text-green-700 font-bold">GREEN</span>)
              are used to decrease/increase the frequency of your working note by 33 cents (
              <span className="font-bold">1 unit</span>)
            </li>
          </ul>
          <div className="w-fit flex flex-col gap-4">
            <p className="text-center text-2xl">Current frequency: {"XXX"} Hz</p>
            <div className="flex justify-center gap-4">
              <button type="button">
                <img
                  src={doubleChevron}
                  alt="-66"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 66 cents"
                />
              </button>
              <button type="button" style={{ backgroundColor: "green" }}>
                <img
                  src={chevron}
                  alt="-33"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 33 cents"
                />
              </button>
              <button type="button">Play current pitch</button>
              <button type="button" style={{ backgroundColor: "green" }}>
                <img
                  src={chevron}
                  alt="+33"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 33 cents"
                />
              </button>
              <button type="button">
                <img
                  src={doubleChevron}
                  alt="+66"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 66 cents"
                />
              </button>
            </div>
            <button type="button">Confirm</button>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Arrow Buttons</h1>
          <ul className="list-disc">
            <li>
              The simple arrow buttons (in <span className="text-green-700 font-bold">GREEN</span>)
              are used to decrease/increase the frequency of your working note by 33 cents (
              <span className="font-bold">1 unit</span>)
            </li>
            <li>
              The double arrow buttons (in <span className="text-blue-400 font-bold">BLUE</span>)
              are used to decrease/increase the frequency of your working note by 66 cents (
              <span className="font-bold">2 units</span>)
            </li>
          </ul>
          <div className="w-fit flex flex-col gap-4">
            <p className="text-center text-2xl">Current frequency: {"XXX"} Hz</p>
            <div className="flex justify-center gap-4">
              <button type="button" style={{ backgroundColor: "lightblue" }}>
                <img
                  src={doubleChevron}
                  alt="-66"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 66 cents"
                />
              </button>
              <button type="button" style={{ backgroundColor: "green" }}>
                <img
                  src={chevron}
                  alt="-33"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 33 cents"
                />
              </button>
              <button type="button">Play current pitch</button>
              <button type="button" style={{ backgroundColor: "green" }}>
                <img
                  src={chevron}
                  alt="+33"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 33 cents"
                />
              </button>
              <button type="button" style={{ backgroundColor: "lightblue" }}>
                <img
                  src={doubleChevron}
                  alt="+66"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 66 cents"
                />
              </button>
            </div>
            <button type="button">Confirm</button>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Play Button</h1>
          <ul className="list-disc">
            <li>
              The <span className="text-pink-300 font-bold">PINK</span> button is used to play your
              working note.
            </li>
          </ul>
          <div className="w-fit flex flex-col gap-4">
            <p className="text-center text-2xl">Current frequency: {"XXX"} Hz</p>
            <div className="flex justify-center gap-4">
              <button type="button">
                <img
                  src={doubleChevron}
                  alt="-66"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 66 cents"
                />
              </button>
              <button type="button">
                <img
                  src={chevron}
                  alt="-33"
                  className="rotate-90 w-10"
                  title="Lower the pitch by 33 cents"
                />
              </button>
              <button type="button" style={{ backgroundColor: "pink" }}>
                Play current pitch
              </button>
              <button type="button">
                <img
                  src={chevron}
                  alt="+33"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 33 cents"
                />
              </button>
              <button type="button">
                <img
                  src={doubleChevron}
                  alt="+66"
                  className="-rotate-90 w-10"
                  title="Increase the pitch by 66 cents"
                />
              </button>
            </div>
            <button type="button">Confirm</button>
          </div>
        </div>
      );

    case 6:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>The Sounds</h1>
          In this task, you will be presented to 2 different types of sounds:
          <ul className="list-disc">
            <li>
              <span className="font-bold">The Target Note:</span> this sound will be{" "}
              <span className="font-bold">automatically played</span> at the beginning of each
              trial. It is the sound you will try to <span className="font-bold">recreate</span>{" "}
              thanks to the buttons.
            </li>
            <li>
              <span className="font-bold">The Working Note:</span> this sound is the sound you will
              be working on. It is <span className="font-bold">not played</span>, unless you
              explicitly click on the button to play it, or you modify it thanks to the arrow
              buttons.
            </li>
          </ul>
        </div>
      );

    case 7:
      return (
        <div className="flex flex-col gap-2 items-center w-full">
          <h1>Your turn!</h1>
          <ul>
            <li>If you have understood and are ready, let's start!</li>
            <li>
              Remember: the goal is to be as{" "}
              <strong style={{ color: "red", fontSize: "1.2em" }}>ACCURATE</strong> as possible.
              You'll be given 10 seconds to answer!
            </li>
          </ul>
        </div>
      );
  }
}

export default function ExplanationINM({ onFinish }: ExplanationsINMProps) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const NB_PAGES = 8;

  return (
    <div className="flex flex-col items-center w-screen min-h-screen gap-1">
      <Header title="INM Task" />
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
