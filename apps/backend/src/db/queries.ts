import type { INMTrialData, Participant } from "@pitch-experiment/types";
import database from "./index.js";

interface ParticipantRow {
  code: string;
  created_at: string;
  task_completed: number;
}

interface LearningTrialDataRow {
  trialNumber: number;
  blockNumber: number;
  unitNumber: number;
  responseTime: number;
  isAnswerCorrect: number;
  isPropositionCorrect: number;
  interference: number;
  referenceToTargetRealDistance: number;
}

export const participantQueries = {
  save: (participant: Participant) => {
    return database.prepare("INSERT INTO participants (code) VALUES(@code);").run(participant);
  },

  findByCode: (code: string): ParticipantRow | undefined => {
    return database.prepare("SELECT * FROM participants WHERE code = ?;").get(code) as
      | ParticipantRow
      | undefined;
  },

  desactivateCode: (code: string) => {
    return database.prepare("UPDATE participants SET task_completed = 1 WHERE code = ?;").run(code);
  },
};

export const trialQueries = {
  saveINMTrials: (participantCode: string, trialsData: INMTrialData[]) => {
    const insertTrial = database.prepare(
      "INSERT INTO inm_task_trials (participant_code, trial_number, reference_to_answer_distance_cents) VALUES(?, @trialNumber, @distanceToTarget);",
    );

    const insertManyTrials = database.transaction((trials: INMTrialData[]) => {
      for (const trial of trials) {
        insertTrial.run(participantCode, trial);
      }
    });

    insertManyTrials(trialsData);
  },

  saveLearningTrials: (participantCode: string, trialsData: LearningTrialDataRow[]) => {
    const insertTrial = database.prepare(
      "INSERT INTO learning_task_trials (participant_code, trial_number, block_id, unit_id, interference, reference_to_target_real_distance_cents, is_proposition_correct, is_participant_correct, response_time_ms) VALUES(?, @trialNumber, @blockNumber, @unitNumber, @interference, @referenceToTargetRealDistance, @isPropositionCorrect, @isAnswerCorrect, @responseTime);",
    );

    const insertManyTrials = database.transaction((trials: LearningTrialDataRow[]) => {
      for (const trial of trials) {
        insertTrial.run(participantCode, trial);
      }
    });

    insertManyTrials(trialsData);
  },
  getAllTrials: () => {
    const participants = database.prepare("SELECT * FROM participants").all();
    const learningData = database.prepare("SELECT * FROM learning_task_trials").all();
    const INMData = database.prepare("SELECT * FROM inm_task_trials").all();

    return { participants, learningData, INMData };
  },
  getTrialStats: () => {
    const participantCount = database
      .prepare("SELECT COUNT(*) as count FROM participants")
      .get() as { count: number };
    const learningTrialsCount = database
      .prepare("SELECT COUNT(*) as count FROM learning_task_trials")
      .get() as { count: number };
    const INMTrialsCount = database
      .prepare("SELECT COUNT(*) as count FROM inm_task_trials")
      .get() as { count: number };

    return { participantCount, learningTrialsCount, INMTrialsCount };
  },
};
