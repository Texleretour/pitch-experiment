import type { ApiResponse, isCodeActivated, TaskData } from "@pitch-experiment/types";

const BASE_API = "http://localhost:3000/api";

export const getCodeInfo = async (code: string): Promise<isCodeActivated> => {
  const response = await fetch(`${BASE_API}/code/${code}`);
  const responseJson: ApiResponse<string> = await response.json();

  if (!responseJson.success || !responseJson.data) {
    return { code: code, isActivated: false };
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch Code '${code}'.`);
  }

  return { code: code, isActivated: true };
};

export const postTaskData = async (taskData: TaskData) => {
  const response = await fetch(`${BASE_API}/participant/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error(`There was an error sending the taskData: ${response.statusText}`);
  }

  return await response.json();
};
