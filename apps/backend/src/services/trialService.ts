import type { INMTrialData, LearningTrialData } from "@pitch-experiment/types";
import { trialQueries } from "../db/queries.js";

export const processINMData = (participantCode: string, trials: INMTrialData[]) => {
  trialQueries.saveINMTrials(participantCode, trials);
};

export const processLearningData = (participantCode: string, trials: LearningTrialData[]) => {
  const newTrials = trials.map((trial) => {
    return {
      trialNumber: trial.trialNumber,
      blockNumber: trial.blockNumber,
      unitNumber: trial.unitNumber,
      responseTime: trial.responseTime,
      isAnswerCorrect: trial.isAnswerCorrect ? 1 : 0,
      isPropositionCorrect: trial.isPropositionCorrect ? 1 : 0,
      interference: trial.interference ? 1 : 0,
      referenceToTargetRealDistance: trial.referenceToTargetRealDistance,
    };
  });
  trialQueries.saveLearningTrials(participantCode, newTrials);
};
