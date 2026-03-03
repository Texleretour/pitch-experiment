import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import ExperimentWrapper from "./ExperimentWrapper";

type INMTaskProps = {
  onFinish: () => void;
};

export default function INMTask({ onFinish }: INMTaskProps) {
  const timeline = [
    {
      type: HtmlKeyboardResponsePlugin,
      stimulus: "<p>Test inm stimulus</p>",
    },
  ];

  return (
    <>
      <h1>INM task</h1>
      <ExperimentWrapper timeline={timeline} onFinish={onFinish} />
    </>
  );
}
