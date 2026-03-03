import AudioKeyboardResponsePlugin from "@jspsych/plugin-audio-keyboard-response";
import ExperimentWrapper from "./ExperimentWrapper";

type INMTaskProps = {
  onFinish: (task: "learning" | "inm") => void;
};

export default function INMTask({ onFinish }: INMTaskProps) {
  const timeline = [
    {
      type: AudioKeyboardResponsePlugin,
      stimulus: "<p>Test inm stimulus</p>",
    },
  ];

  return (
    <>
      <h1>INM task</h1>
      <ExperimentWrapper timeline={timeline} onFinish={onFinish} task="inm" />
    </>
  );
}
