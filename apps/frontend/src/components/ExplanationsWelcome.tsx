type ExplanationsWelcomeProps = {
  onExperimentStart: () => void;
};

export default function ExplanationsWelcome({ onExperimentStart }: ExplanationsWelcomeProps) {
  return (
    <div>
      <h1>Explanations</h1>
      <p>Ouiiii, bienvenuuuuuue, c'est comme caaaaa</p>
      <button type="button" onClick={() => onExperimentStart()}>
        Start the experiment
      </button>
    </div>
  );
}
