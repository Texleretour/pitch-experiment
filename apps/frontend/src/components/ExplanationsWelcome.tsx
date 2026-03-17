import "../experiment/learning/style_learning.css";

type ExplanationsWelcomeProps = {
  onExperimentStart: () => void;
};

export default function ExplanationsWelcome({ onExperimentStart }: ExplanationsWelcomeProps) {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-1">
      <div id="header">WELCOME</div>
      <h1>Explanations</h1>
      <p>
        You are going to take place in the experiment. As explained in the form you signed before
        entering here, the experiment is divided into 2 main tasks: the{" "}
        <strong>learning task</strong> and the <strong>INM task</strong>.
      </p>
      <p>
        Here are general explanations on how will they work. Don't worry,{" "}
        <strong>more precise explanations will be provided afterwards</strong>.
      </p>
      <h1>The Learning Task</h1>
      <p>
        In this task, the goal for you is to learn some relations between sounds. To do so, you
        will:{" "}
      </p>
      <p>
        1-Hear a scale of notes composed by "<strong>a reference</strong>" and four "
        <strong>following notes</strong>".
      </p>
      <p>
        2-After the presentation of these 5 notes, 2 notes among the scale will be played again (the
        "<strong>reference note</strong>" and one of the "<strong>following notes</strong>" which
        will be your "<strong>target note</strong>").
      </p>
      <p>
        3-A question will be asked about the distance between those notes.{" "}
        <strong>Two following notes are distanced by 1 tone.</strong>
      </p>
      <p>
        The goal for you is to answer if the proposed distance between the "
        <strong>reference note</strong>" and the "<strong>target note</strong>" is correct by using
        the keyboard.
      </p>
      <p>This will be asked 64 times.</p>
      <h1>The INM Task</h1>
      <p>
        In this task, the goal for you is to recreate sounds using construction keys. To do so, you
        will:{" "}
      </p>
      <p>
        1-Hear a "<strong>reference note</strong>" to recreate.
      </p>
      <p>
        2-Be given a "<strong>working note</strong>".
      </p>
      <p>
        3-Use upwards or backwards arrows to modify the pitch of your "<strong>working note</strong>
        " in order to recreate the "<strong>reference note</strong>".
      </p>
      <p>4-Once you think you're having a perfect match, confirm your answer.</p>
      <p>This will be asked 64 times.</p>
      <button type="button" onClick={() => onExperimentStart()}>
        Go to the next one.
      </button>
    </div>
  );
}
