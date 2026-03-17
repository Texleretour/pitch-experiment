import {
  type INMTrialData,
  type LearningTrialData,
  type TaskData,
  TaskTypes,
} from "@pitch-experiment/types";
import { useState } from "react";
import { DEBUG } from "../../config.json";
import { postTaskData } from "../lib/api";
import INMTask from "./inm/INMTask";
import LearningDemo from "./learning/LearningDemo";
import LearningTask from "./learning/LearningTask";

type ExperimentConductorProps = {
  participantCode: string;
};

export default function ExperimentConductor({ participantCode }: ExperimentConductorProps) {
  const [experimentStep, setExperimentStep] = useState<
    "learning_demo" | "learning" | "inm" | "finished"
  >("learning_demo");

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

  const handleLearningDemoFinished = async () => {
    DEBUG && console.log("[Conductor] Learning Demo finished");

    setExperimentStep("learning");
  };

  const handleLearningFinished = async (data: LearningTrialData[]) => {
    const taskData: TaskData = {
      participantCode: participantCode,
      taskType: TaskTypes.Learning,
      data: data,
    };
    DEBUG && console.log("[Conductor] Learning data:", taskData);

    await postTaskData(taskData);

    setExperimentStep("inm");
  };

  switch (experimentStep) {
    case "learning_demo":
      return <LearningDemo onFinish={handleLearningDemoFinished} />;
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
