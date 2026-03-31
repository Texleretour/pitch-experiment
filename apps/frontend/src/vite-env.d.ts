/// <reference types="vite/types/importMeta.d.ts" />
import type { NODE_ENVS } from "@pitch-experiment/types";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly NODE_ENV: NODE_ENVS;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
