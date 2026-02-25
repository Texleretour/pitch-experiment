import type { Access_token } from "@pitch-experiment/types";

const BASE_API = "http://localhost:3000/api";

export async function getAccessCodeInfo(code: string): Promise<Access_token> {
  const response = await fetch(`${BASE_API}/code/${code}`); //lint preference
  const responseJson: Access_token = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch Access Code '${code}'.`); //lint preference
  }

  return responseJson;
}
