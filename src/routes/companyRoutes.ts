import { Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { companyValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { companyService } from "../service/company";
import { jobService } from "../service/jobService";
import { authorize } from "../_helpers/authorization";

const router = Router();
export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyName, companyDescription, userAccountId } = req.body;
  let response;
  try {
    response = await companyService.createCompany({
      company_name: companyName,
      company_description: companyDescription,
      user_account_id: userAccountId,
    });
  } catch (error) {
    return next(new ExtendedError(error.message));
  }
  return res.status(200).json(response);
};

router.post("/", companyValidation, authorize([Role.HR]), createCompany);

export default router;
