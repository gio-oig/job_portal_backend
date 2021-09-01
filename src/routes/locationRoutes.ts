import { Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { BaseResponse } from "../constants/interfaces";
import {
  baseValidation,
  createLocationValidation,
} from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { locationRepo } from "../repository/location/location";
import { authorize } from "../_helpers/authorization";

const router = Router();

const getLocations = async (_: Request, res: Response, next: NextFunction) => {
  let response: BaseResponse;
  try {
    response = await locationRepo.getLocations();
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { city } = req.body;
  let response: BaseResponse;
  try {
    response = await locationRepo.createLocation(city);
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

/**
 * @openapi
 * /api/location:
 *   get:
 *     summary: Get Locations.
 *     description: get all categories
 */
router.get("/", getLocations);

/**
 * @openapi
 * /api/location:
 *   post:
 *     summary: Create Location.
 *     description: crete location.
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
  createLocationValidation,
  createLocation
);

export default router;
