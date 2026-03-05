import { useState } from "react";
import INMTask from "./inm/INMTask";
import LearningTask from "./LearningTask";

type ExperimentConductorProps = {
  participantCode: string;
};

export default function ExperimentConductor({ participantCode }: ExperimentConductorProps) {
  const [experimentStep, setExperimentStep] = useState<"learning" | "inm" | "finished">("inm");

  const handleLearningFinished = () => {
    setExperimentStep("inm");
  };

  const handleINMFinished = () => {
    setExperimentStep("finished");
  };

  switch (experimentStep) {
    case "learning":
      return <LearningTask onFinish={handleLearningFinished} />;
    case "inm":
      return <INMTask onFinish={handleINMFinished} participantCode={participantCode} />;
    case "finished":
      return <div>finito pipo gg</div>;
    default:
      return <div>wa zbi cquoi ca</div>;
  }
}
