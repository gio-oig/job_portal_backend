import { NextFunction, Request, Response, Router } from "express";
import { ExtendedError } from "../public/models/ErrorClass";
import { companyService } from "../service/company";
import { Prisma, PrismaClient } from "@prisma/client";
import { JobSearchQuery } from "../constants/interfaces";
import { jobService } from "../service/jobService";

const prisma = new PrismaClient({ log: ["query"] });

const router = Router();

const searchJobs = async (
  req: Request<any, any, any, JobSearchQuery>,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  let response;
  try {
    response = await jobService.searchJobs(query);
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

/**
 * @endpoint http://localhost:5000/api/search
 * @prefix /api/search
 */

router.post("/job", searchJobs);

export default router;
