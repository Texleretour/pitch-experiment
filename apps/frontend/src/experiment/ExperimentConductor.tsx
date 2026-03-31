import {
  type INMTrialData,
  type LearningTrialData,
  type TaskData,
  TaskTypes,
} from "@pitch-experiment/types";
import { useRef, useState } from "react";
import { DEBUG } from "../config.js";
import { postTaskData } from "../lib/api";
import FinishPage from "./FinishPage";
import ExplanationINM from "./inm/ExplanationINM";
import INMTask from "./inm/INMTask";
import ExplanationLearning from "./learning/ExplananationLearning";
import ExplanationLearningDemo from "./learning/ExplananationLearningDemo";
import LearningDemo from "./learning/LearningDemo";
import LearningTask from "./learning/LearningTask";

type ExperimentConductorProps = {
  participantCode: string;
};

type LearningResponseKeys = {
  trueKey: string;
  falseKey: string;
};

export default function ExperimentConductor({ participantCode }: ExperimentConductorProps) {
  const [experimentStep, setExperimentStep] = useState<
    | "learningExplanationsBeforeDemo"
    | "learningDemo"
    | "learningExplanations"
    | "learning"
    | "inmExplanation"
    | "inm"
    | "finished"
  >("learning");

  const learningResponseKeys = useRef<LearningResponseKeys>({
    trueKey: "l", // default value
    falseKey: "s", // default value
  });

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

  const handleLearningDemoFinished = async (learningRespKeysDefined: LearningResponseKeys) => {
    DEBUG && console.log("[Conductor] Learning Demo finished");
    learningResponseKeys.current = learningRespKeysDefined;
    DEBUG &&
      console.log(
        "Learning response keys definied: true=",
        learningResponseKeys.current.trueKey,
        " false=",
        learningResponseKeys.current.falseKey,
      );

    setExperimentStep("learningExplanations");
  };

  const handleExplanationsFinished = async () => {
    switch (experimentStep) {
      case "learningExplanationsBeforeDemo":
        DEBUG && console.log("[Conductor] Explanations on Learning Demo finished");
        setExperimentStep("learningDemo");
        break;

      case "learningExplanations":
        DEBUG && console.log("[Conductor] Explanations on Learning finished");
        setExperimentStep("learning");
        break;

      case "inmExplanation":
        DEBUG && console.log("[Conductor] Explanations on INM finished");
        setExperimentStep("inm");
        break;
    }
  };

  const handleLearningFinished = async (data: LearningTrialData[]) => {
    const taskData: TaskData = {
      participantCode: participantCode,
      taskType: TaskTypes.Learning,
      data: data,
    };

    DEBUG && console.log("[Conductor] Learning data:", taskData);

    await postTaskData(taskData);

    setExperimentStep("inmExplanation");
  };

  switch (experimentStep) {
    case "learningExplanationsBeforeDemo":
      return <ExplanationLearningDemo onFinish={handleExplanationsFinished} />;
    case "learningDemo":
      return <LearningDemo onFinish={handleLearningDemoFinished} />;
    case "learningExplanations":
      return <ExplanationLearning onFinish={handleExplanationsFinished} />;
    case "learning":
      return (
        <LearningTask
          responseKeys={learningResponseKeys.current}
          onFinish={handleLearningFinished}
        />
      );
    case "inmExplanation":
      return <ExplanationINM onFinish={handleExplanationsFinished} />;
    case "inm":
      return <INMTask onFinish={handleINMFinished} />;
    case "finished":
      return <FinishPage />;
    default:
      return <div>wa zbi cquoi ca</div>;
  }
}
