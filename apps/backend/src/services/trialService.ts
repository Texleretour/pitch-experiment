import type { INMTrialData } from "@pitch-experiment/types";
import { trialQueries } from "../db/queries";

export const processINMData = (participantCode: string, trials: INMTrialData[]) => {
  trialQueries.saveINMTrials(participantCode, trials);
};
