import jwt from "jsonwebtoken";
import { Router } from "express";
import { AuthResponse, Role } from "../../constants/interfaces";
import {
  logInValidation,
  registerValidation,
  resetPasswordValidation,
} from "../../middlewares/validation";
import userContoller from "../../controller/user.contoller";
import { authorize } from "../../_helpers/authorization";

const router = Router();

/**
 * @authRoutes
 * @prefix /auth
 */

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     description: register user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: USER, HR
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   exmple: logged in successfully
 *                 user:
 *                   type: object
 *                   description: user object with token

 */
router.post("/signup", registerValidation, userContoller.signUp);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post("/login", logInValidation, userContoller.login);
router.put(
  "/resetPassword",
  resetPasswordValidation,
  authorize([Role.ADMIN, Role.HR, Role.USER]),
  userContoller.resetPassword
);

router.post("/isLoggedIn", authorize(), userContoller.isLoggedIn);

router.post(
  "/forgotPassword",
  authorize(["ALL"]),
  userContoller.forgotPassword
);

/**
 * @swagger
 * /forgotPassword/{token}:
 *   post:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: reset password.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: token to auth user
 *         schema:
 *           type: string
 */

router.post("/forgotPassword/:token", userContoller.forgotPasswordReset);

export default router;
