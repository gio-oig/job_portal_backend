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
    if (error instanceof ExtendedError)
      return next(new ExtendedError(error.message));
  }
  return res.status(200).json(response);
};

/**
 * @endpoint http://localhost:5000/api/job
 */

/**
 * @openapi
 * /api/job:
 *   post:
 *     description: create job
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *               locationId:
 *                 type: number
 *               categoryId:
 *                 type: number
 *               companyId:
 *                 type: number
 */
router.post("/", authorize([Role.HR]), createJob);

export default router;
