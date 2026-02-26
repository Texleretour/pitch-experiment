import type { Participant } from "@pitch-experiment/types";
import { participantQueries } from "../db/queries";

export function generateParticipantCode(
  firstname: string,
  lastname: string,
  birthDay: number,
  birthCity: string,
): string {
  /**
   * Returns a code to identify a participant
   * Format:
   * First letter of the first name
   * First letter of the last name
   * Last letter of the first name
   * Last letter of the last name
   * Birth day (1-31)
   * First letter of the city of birth
   * Last letter of the city of birth
   */

  let code = "";
  code += firstname[0];
  code += lastname[0];
  code += firstname[firstname.length - 1];
  code += lastname[lastname.length - 1];
  code += birthDay < 10 ? `0${birthDay}` : birthDay;
  code += birthCity[0];
  code += birthCity[birthCity.length - 1];

  return code.toLocaleLowerCase();
}

export function createParticipant(code: string): number {
  const newParticipant: Participant = {
    code: code,
  };

  const { changes } = participantQueries.save(newParticipant);

  return changes;
}

export function doesAccessCodeExist(code: string): boolean {
  const participant = participantQueries.findByCode(code);
  if (participant) {
    return !participant.completed;
  }
  return false;
}
