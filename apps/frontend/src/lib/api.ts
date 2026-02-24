import type { ApiResponse, Participant } from "@pitch-experiment/types";

const BASE_API = "http://localhost:3000/api";

export async function getParticipantById(id: number): Promise<Participant> {
  const response = await fetch(BASE_API + "/participant/" + id);

  const responseJson: ApiResponse<Participant> = await response.json();

  console.log(responseJson);

  if (!responseJson.success || !responseJson.data) {
    throw new Error(responseJson.error);
  }

  if (!response.ok) {
    throw new Error("Failed to fetch Participant");
  }

  return responseJson.data;
}
