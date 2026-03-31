import { NODE_ENVS } from "@pitch-experiment/types";

export const CONFIG = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  NODE_ENV: import.meta.env.NODE_ENV as NODE_ENVS,
};

export const DEBUG = CONFIG.NODE_ENV === NODE_ENVS.DEV;
