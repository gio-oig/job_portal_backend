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
  const {
    title,
    description,
    expirationDate,
    locationId,
    categoryId,
    companyId,
  } = req.body;

  let response;
  try {
    response = await jobService.createjob({
      title,
      description,
      expirationDate,
      locationId,
      categoryId,
      companyId,
    });
  } catch (error) {
    return next(new ExtendedError(error.message));
  }
  return res.status(200).json(response);
};

router.post("/", authorize([Role.HR]), createJob);

export default router;
