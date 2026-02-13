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
};
