import type { Participant } from "@pitch-experiment/types";
import { participantQueries } from "../db/queries";

export function getUserById(id: number): Participant | null {
  const participantRow = participantQueries.findById(id);

  if (!participantRow) {
    return null;
  }

  return {
    id: participantRow.id,
    age: participantRow.age,
    createdAt: new Date(participantRow.created_at),
  };
}
