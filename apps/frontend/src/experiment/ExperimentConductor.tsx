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
import ExplanationLearningDemo from "./learning/ExplananationLearningDemo";
import LearningDemo from "./learning/LearningDemo";
import LearningTask from "./learning/LearningTask";

type ExperimentConductorProps = {
  participantCode: string;
};

export default function ExperimentConductor({ participantCode }: ExperimentConductorProps) {
  const [experimentStep, setExperimentStep] = useState<
    "learningExplanationsBeforeDemo" | "learningDemo" | "learning" | "inm" | "finished"
  >("learningExplanationsBeforeDemo");

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

  const handleExplanationLearningDemoFinished = async () => {
    DEBUG && console.log("[Conductor] Explanations on Learning Demo finished");

    setExperimentStep("learningDemo");
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
    case "learningExplanationsBeforeDemo":
      return <ExplanationLearningDemo onFinish={handleExplanationLearningDemoFinished} />;
    case "learningDemo":
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
