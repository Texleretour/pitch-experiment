import { type INMTrialData, type TaskData, TaskTypes } from "@pitch-experiment/types";
import { useState } from "react";
import { DEBUG } from "../../config.json";
import { postTaskData } from "../lib/api";
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

  const handleINMFinished = async (data: INMTrialData[]) => {
    const taskData: TaskData = {
      participantCode: participantCode,
      taskType: TaskTypes.INM,
      data: data,
    };
    DEBUG && console.log("[Conductor] INM data:", taskData);

    await postTaskData(taskData);

    setExperimentStep("finished");
  };

  switch (experimentStep) {
    case "learning":
      return <LearningTask onFinish={handleLearningFinished} />;
    case "inm":
      return <INMTask onFinish={handleINMFinished} />;
    case "finished":
      return <div>finito pipo gg</div>;
    default:
      return <div>wa zbi cquoi ca</div>;
  }
}
