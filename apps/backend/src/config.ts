import type { NODE_ENVS } from "@pitch-experiment/types";
import * as dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  FRONTEND_URL: process.env.CORS_ORIGIN as string,
  ADMIN_TOKEN: process.env.ADMIN_TOKEN as string,
  PORT: (process.env.PORT as string) || "3000",
  NODE_ENV: process.env.NODE_ENV as NODE_ENVS,
  DATA_DIR: process.env.DATA_DIR,
};
