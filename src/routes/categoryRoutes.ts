import { Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { BaseResponse } from "../constants/interfaces";
import { createCategoryValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { categoryRepo } from "../repository/category/category";
import { authorize } from "../_helpers/authorization";

const router = Router();

async function getCategories(_: Request, res: Response, next: NextFunction) {
  let response: BaseResponse;
  try {
    response = await categoryRepo.getCategories();
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  const { categoryName } = req.body;
  let response: BaseResponse;
  try {
    response = await categoryRepo.createcategory(categoryName);
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
}

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get Categories.
 *     description: get all categories.
 */
router.get("/", getCategories);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create Category.
 *     description: crete category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 */
router.post(
  "/",
  authorize([Role.ADMIN]),
  createCategoryValidation,
  createCategory
);

export default router;
