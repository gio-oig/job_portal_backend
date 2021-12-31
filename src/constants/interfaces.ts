import { Job } from "@prisma/client";

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
  avatar: Buffer | undefined;
}

export type MulterFiles =
  | Express.Multer.File[]
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | undefined;

export interface JobSearchQuery {
  title: string;
  categoryId?: number;
  locationId?: number;
  limit?: number;
  offset?: number;
}

export interface CompanyFollowable {
  companyId: number;
  seekerId: number;
}

export type UploadResponse = {
  imagePath: string;
  imageId: string;
};

export type CopyWithPartial<T, K extends keyof T> = Omit<T, K> & Partial<T>;

type A = {
  id: string;
  path: string;
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface IJob extends Omit<Job, "id" | "created_at"> {}
