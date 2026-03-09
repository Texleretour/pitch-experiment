import type { INMTrialData, Participant } from "@pitch-experiment/types";
import database from ".";

interface ParticipantRow {
  code: string;
  created_at: string;
  task_completed: number;
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
};
