import { PrismaClient, Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { BaseResponse } from "../constants/interfaces";
import companyController from "../controller/company.controller";
import upload, { multerMemoryUpload } from "../middlewares/fileUpload";
import { companyValidation } from "../middlewares/validation";
import { companyService } from "../service/company";
import { authorize } from "../_helpers/authorization";

const router = Router();

/**
 * @endpoint http://localhost:5000/api/company
 */

router.get("/", companyController.getAll);

router.get("/follow", companyController.follow);
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
router.post(
  "/",
  multerMemoryUpload.single("avatar"),
  companyValidation,
  authorize([Role.HR]),
  // multerMemoryUpload.array("avatar", 1),
  companyController.create
);

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
  companyController.saveCompanyImages
);

router.delete("/:id", authorize(Role.HR), companyController.deleteOne);

export default router;
