export interface Participant {
  id: number;
  age: number;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}
