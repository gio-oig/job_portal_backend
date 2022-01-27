import { Role } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import jobController from "../controller/job.controller";
import { authorize } from "../_helpers/authorization";

const router = Router();

/**
 * @endpoint http://localhost:5000/api/job
 */

router.get("/", jobController.getAll);
router.get("/search", jobController.searchJobs);

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
router.post("/", authorize([Role.HR]), jobController.create);

export default router;
