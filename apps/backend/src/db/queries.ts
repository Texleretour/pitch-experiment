import type { Participant } from "@pitch-experiment/types";
import database from ".";

interface ParticipantRow {
  id: number;
  age: number;
  created_at: string;
}

export const participantQueries = {
  findById: (id: number): ParticipantRow | undefined => {
    return database.prepare("SELECT * FROM PARTICIPANTS WHERE id = ?;").get(id) as
      | ParticipantRow
      | undefined;
  },

  save: (participant: Participant) => {
    return database.prepare("INSERT INTO participants (code) VALUES(@code);").run(participant);
  },
};
