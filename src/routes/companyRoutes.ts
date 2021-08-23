import { Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { ExtendedError } from "../public/models/ErrorClass";
import { jobService } from "../service/jobService";
import { authorize } from "../_helpers/authorization";

const router = Router();

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response;
  try {
  } catch (error) {
    return next(new ExtendedError(error.message));
  }
  return res.status(200).json(response);
};

export default router;
