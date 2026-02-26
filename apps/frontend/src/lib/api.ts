import type { ApiResponse, isCodeActivated } from "@pitch-experiment/types";

const BASE_API = "http://localhost:3000/api";

export async function getAccessCodeInfo(code: string): Promise<isCodeActivated> {
  const response = await fetch(`${BASE_API}/code/${code}`);
  const responseJson: ApiResponse<string> = await response.json();
  console.log(responseJson);

  if (!responseJson.success || !responseJson.data) {
    return { code: code, isActivated: false };
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch Access Code '${code}'.`);
  }

  return { code: code, isActivated: true };
}
