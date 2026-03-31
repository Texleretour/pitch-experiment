import { NODE_ENVS } from "@pitch-experiment/types";

export const CONFIG = {
  VITE_API_URL: import.meta.env.VITE_API_URL as string,
  NODE_ENV: import.meta.env.VITE_NODE_ENV as string,
};

export const DEBUG = CONFIG.NODE_ENV === NODE_ENVS.DEV;
