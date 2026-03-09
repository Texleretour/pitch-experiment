export interface Participant {
  code: string;
  createdAt?: Date;
  taskCompleted?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface isCodeActivated {
  code: string;
  isActivated: boolean;
}

export interface INMTrialData {
  trialNumber: number;
  distanceToTarget: number;
}

export interface LearningTrialData {
  // just an example
  isPropositionCorrect: boolean;
}

interface TaskDataBase {
  participantCode: string;
}

interface INMTaskDataVariant {
  taskType: "inm";
  data: INMTrialData[];
}

interface LearningTaskDataVariant {
  taskType: "learning";
  data: LearningTrialData[];
}

export type TaskData = TaskDataBase & (INMTaskDataVariant | LearningTaskDataVariant);

export enum TaskTypes {
  INM = "inm",
  Learning = "learning",
}
