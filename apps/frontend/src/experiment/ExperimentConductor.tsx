import { useState } from "react";
import INMTask from "./INMTask";
import LearningTask from "./LearningTask";

export default function ExperimentConductor() {
  const [experimentStep, setExperimentStep] = useState<"learning" | "inm" | "finished">("learning");

  const handleStepFinished = (task: "learning" | "inm") => {
    if (task === "learning") {
      setExperimentStep("inm");
    } else if (task === "inm") {
      setExperimentStep("finished");
    }
  };

  switch (experimentStep) {
    case "learning":
      return <LearningTask onFinish={handleStepFinished} />;
    case "inm":
      return <INMTask onFinish={handleStepFinished} />;
    case "finished":
      return <div>finito pipo gg</div>;
    default:
      return <div>wa zbi cquoi ca</div>;
  }
}
