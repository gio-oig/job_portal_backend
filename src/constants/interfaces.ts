export interface ValidationError {
  [item: string]: string;
}

export interface AuthResponse {
  message: string;
  data?: object;
  token?: string;
}

export interface SeekerResponse {
  message: string;
  data: object;
}

export interface FormatedInputError {
  [name: string]: string;
}

export enum Role {
  USER = "USER",
  HR = "HR",
  ADMIN = "ADMIN",
}
