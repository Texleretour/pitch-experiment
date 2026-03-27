import Header from "./ui/Header";

type ExplanationsWelcomeProps = {
  onExperimentStart: () => void;
};

export default function ExplanationsWelcome({ onExperimentStart }: ExplanationsWelcomeProps) {
  return (
    <div className="flex flex-col items-center w-full gap-1">
      <Header title="WELCOME" />
      <main className="flex flex-col items-center gap-4 py-10">
        <h1>Explanations</h1>
        <div className="w-2/3">
          <p>
            You are going to take place in the experiment. As explained in the form you signed
            before entering here, the experiment is divided into 2 main tasks: the{" "}
            <strong>learning task</strong> and the <strong>INM task</strong>.
          </p>
          <p>
            Here are general explanations on how they will work. Don't worry,{" "}
            <strong>more precise explanations will be provided afterwards</strong>.
          </p>
        </div>
        <h1>The Learning Task</h1>
        <div className="w-2/3">
          <p>
            In this task, the goal for you is to learn to recognize the distance between musical
            notes. To do so, you will:{" "}
          </p>
          <ol>
            <li>
              Hear a scale of notes composed of "<strong>a reference</strong>" and four "
              <strong>following notes</strong>".
            </li>
            <li>
              After the presentation of these 5 notes, 2 notes among the scale will be played again
              (the "<strong>reference note</strong>" and one of the "
              <strong>following notes</strong>" which will be your "<strong>target note</strong>").
            </li>
            <li>
              A question will be asked about the distance between those notes.{" "}
              <strong>Two following notes are distanced by 1 tone.</strong>
            </li>
          </ol>
          <p>
            The goal for you is to answer if the proposed distance between the "
            <strong>reference note</strong>" and the "<strong>target note</strong>" is correct by
            using the keyboard.
          </p>
          <p>This will be asked 64 times.</p>
        </div>
        <h1>The INM Task</h1>
        <div className="w-2/3">
          <p>
            In this task, the goal for you is to recreate sounds using construction keys. To do so,
            you will:{" "}
          </p>
          <ol>
            <li>
              Hear a "<strong>reference note</strong>" to recreate.
            </li>
            <li>
              Be given a "<strong>working note</strong>".
            </li>
            <li>
              Use upwards or downwards arrows to modify the pitch of your "
              <strong>working note</strong>" in order to recreate the "
              <strong>reference note</strong>
              ".
            </li>
            <li>Once you think you're having a perfect match, confirm your answer.</li>
          </ol>
          <p>This will be asked 64 times.</p>
        </div>
        <h1>Some recommandations</h1>
        <div className="w-2/3">
          <p>
            During this task, you will hear different sounds. That is why an audio device such as{" "}
            <strong>earphones or headphones</strong> is recommended.
          </p>
          <p>
            To answer the questions, you will need a functional keyboard. You device needs to be a
            tablet or <strong>bigger</strong> (computers, laptops...).
          </p>
          <p>
            The task will also take about half an hour. Please ensure that you are in a{" "}
            <strong>quiet room</strong>, free from disturbances, for the entire duration of the
            experiment.
          </p>
        </div>
      </main>
      <button type="button" onClick={() => onExperimentStart()}>
        Go to the next one.
      </button>
    </div>
  );
}
