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
