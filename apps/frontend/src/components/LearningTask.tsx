import AudioKeyboardResponsePlugin from "@jspsych/plugin-audio-keyboard-response";
import ExperimentWrapper from "../experiment/ExperimentWrapper";

export default function LearningTask() {
  const timeline = [
    {
      type: AudioKeyboardResponsePlugin,
      stimulus: "<p>Test learning stimulus</p>",
    },
  ];

  return (
    <>
      <h1>Learning task</h1>
      <p>dsofhusdfsdpf</p>
      <ExperimentWrapper timeline={timeline} />
    </>
  );
}
