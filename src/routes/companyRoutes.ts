import { Role } from "@prisma/client";
import { NextFunction, Request, response, Response, Router } from "express";
import { fileUpload } from "../middlewares/fileUpload";
import { companyValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { companyService } from "../service/company";
import { jobService } from "../service/jobService";
import { authorize } from "../_helpers/authorization";

const router = Router();
const createCompany = async (
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

const saveCompanyImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyId, userId } = req.body;
  let response;
  try {
    response = await companyService.saveImages(req.files, +companyId, +userId);
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

const getCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response;
  try {
    response = await companyService.getCompanies();
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

/**
 * @endpoint http://localhost:5000/api/company
 */

router.get("/", getCompanies);

router.post("/", companyValidation, authorize([Role.HR]), createCompany);
/**
 * @description save company images
 */

router.post(
  "/images",
  authorize([Role.HR]),
  fileUpload.array("image"),
  saveCompanyImages
);

export default router;
