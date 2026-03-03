import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import ExperimentWrapper from "./ExperimentWrapper";

type LearningTaskProps = {
  onFinish: () => void;
};

export default function LearningTask({ onFinish }: LearningTaskProps) {
  const timeline = [
    {
      type: HtmlKeyboardResponsePlugin,
      stimulus: "<p>Test learning stimulus</p>",
    },
  ];

  return (
    <>
      <h1>Learning task</h1>
      <ExperimentWrapper timeline={timeline} onFinish={onFinish} />
    </>
  );
}
