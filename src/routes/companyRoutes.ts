import { PrismaClient, Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { BaseResponse } from "../constants/interfaces";
import upload from "../middlewares/fileUpload";
import { companyValidation } from "../middlewares/validation";
import { companyService } from "../service/company";
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
    return next(error);
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
    return next(error);
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
    return next(error);
  }

  res.status(200).json(response);
};

const followCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyId, seekerId } = req.body;
  let response: BaseResponse;
  try {
    response = await companyService.followCompany({ companyId, seekerId });
  } catch (error) {
    return next(error);
  }
  res.status(200).json(response);
};

/**
 * @endpoint http://localhost:5000/api/company
 */

router.get("/", getCompanies);

router.get("/follow", followCompany);
/**
 * @openapi
 * /api/company:
 *   post:
 *     description: create company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               companyDescription:
 *                 type: string
 *               userAccountId:
 *                 type: number
 */
router.post("/", companyValidation, authorize([Role.HR]), createCompany);

/**
 * @openapi
 * /api/company:
 *   post:
 *     summary: save images for company
 *     description: save images for company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 */
router.post(
  "/images",
  // authorize([Role.HR]),
  upload.array("image"),
  saveCompanyImages
);

export default router;
