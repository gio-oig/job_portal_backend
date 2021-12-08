import jwt from "jsonwebtoken";
import { Router, NextFunction, Request, Response, response } from "express";
import { AuthResponse, Role } from "../../constants/interfaces";
import {
  logInValidation,
  registerValidation,
  resetPasswordValidation,
} from "../../middlewares/validation";
import { userService } from "../../service/userService";
import { authorize } from "../../_helpers/authorization";

const router = Router();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  let response;

  try {
    response = await userService.signUp(email, password, role);
  } catch (error) {
    return next(error);
  }

  res.status(200).json(response);
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let response;

  try {
    response = await userService.logIn(email, password);
  } catch (error) {
    return next(error);
  }

  return res.status(200).json(response);
};

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  let response;
  try {
    //@ts-expect-error
    response = await userService.findUserById(req.user?.sub);
  } catch (error) {
    return next(error);
  }
  return res.status(200).json({ message: "success", user: response.data });
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as { sub: number }).sub;
  const { oldPassword, newPassword } = req.body;

  let response;
  try {
    response = await userService.resetPassword(
      userId,
      oldPassword,
      newPassword
    );
  } catch (error) {
    return next(error);
  }

  return res.status(200).json(response);
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as { sub: number }).sub;
  let response;

  try {
    response = await userService.forgotPassword(userId);
  } catch (error) {
    return next(error);
  }

  return res.status(200).json(response);
};

const forgotPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const TOKEN = req.params.token;
  const { newPassword } = req.body;

  let response;
  try {
    response = await userService.forgotPasswordReset(TOKEN, newPassword);
  } catch (error) {
    return next(error);
  }
  return res.status(200).json(response);
};

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
router.post("/signup", registerValidation, signUp);

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
router.post("/login", logInValidation, logIn);
router.put(
  "/resetPassword",
  resetPasswordValidation,
  authorize([Role.ADMIN, Role.HR, Role.USER]),
  resetPassword
);

router.post("/isLoggedIn", authorize(), isLoggedIn);

router.post("/forgotPassword", authorize(["ALL"]), forgotPassword);

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

router.post("/forgotPassword/:token", forgotPasswordReset);

export default router;
