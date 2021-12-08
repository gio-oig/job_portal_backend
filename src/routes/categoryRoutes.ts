import { Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { BaseResponse } from "../constants/interfaces";
import { createCategoryValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { categoryRepo } from "../repository/category/category";
import { authorize } from "../_helpers/authorization";

const router = Router();

async function getCategories(_: Request, res: Response, next: NextFunction) {
  let response;
  try {
    response = await categoryRepo.getCategories();
  } catch (error) {
    if (error instanceof ExtendedError)
      return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  let response;
  try {
    response = await categoryRepo.createcategory(name);
  } catch (error) {
    if (error instanceof ExtendedError)
      return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
}

async function updateCategory(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await categoryRepo.updateCategory(+id, name);
  } catch (error) {
    return next(error);
  }
  return res.json({ message: "success" });
}

async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    await categoryRepo.deleteCategory(+id);
  } catch (error) {
    return next(error);
  }

  return res.json({ message: "success" });
}

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get Categories.
 *     description: get all categories.
 */
router.get("/", getCategories);

router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

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
  // authorize([Role.ADMIN]),
  // createCategoryValidation,
  createCategory
);

export default router;
