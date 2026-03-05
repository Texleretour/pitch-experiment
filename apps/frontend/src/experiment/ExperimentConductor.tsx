import { initJsPsych } from "jspsych";
import { useRef, useState } from "react";
import INMTask from "./INMTask";
import LearningTask from "./LearningTask";

export default function ExperimentConductor() {
  const [experimentStep, setExperimentStep] = useState<"learning" | "inm" | "finished">("learning");

  const handleLearningFinished = () => {
    setExperimentStep("inm");
  };

  const handleINMFinished = () => {
    setExperimentStep("finished");
  };

  const jsPsychRef = useRef(
    initJsPsych({
      show_progess_bar: true,
    }),
  );

  switch (experimentStep) {
    case "learning":
      return (
        <LearningTask jsPsychInstance={jsPsychRef.current} onFinish={handleLearningFinished} />
      );
    case "inm":
      return <INMTask onFinish={handleINMFinished} />;
    case "finished":
      return <div>finito pipo gg</div>;
    default:
      return <div>wa zbi cquoi ca</div>;
  }
}
