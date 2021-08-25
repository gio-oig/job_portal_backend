export interface ValidationError {
  [item: string]: string;
}

export interface BaseResponse {
  message: string;
  data?: object;
}

export interface AuthResponse extends BaseResponse {
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

export interface Company {
  company_name: string;
  company_description: string;
  user_account_id: number;
}

export type MulterFiles =
  | Express.Multer.File[]
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | undefined;
