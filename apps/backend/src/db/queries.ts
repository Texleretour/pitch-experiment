import type { Participant } from "@pitch-experiment/types";
import database from ".";

interface ParticipantRow {
  code: string;
  created_at: string;
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
