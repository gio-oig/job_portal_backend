import jwt from "jsonwebtoken";
import { Router, NextFunction, Request, Response, response } from "express";
import { AuthResponse, Role } from "../../constants/interfaces";
import {
  logInValidation,
  registerValidation,
  resetPasswordValidation,
} from "../../middlewares/validation";
import { ExtendedError } from "../../public/models/ErrorClass";
import { userService } from "../../service/userService";
import { authorize } from "../../_helpers/authorization";

const router = Router();

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  let response: AuthResponse;
  try {
    response = await userService.signUp(email, password, role);
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  let response: AuthResponse;
  try {
    response = await userService.logIn(email, password);
  } catch (error) {
    return next(new ExtendedError(error.message, 500, error.data));
  }

  return res.status(200).json(response);
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
    return next(new ExtendedError(error.message, 500, error.data));
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
    return next(new ExtendedError(error.message, 500, error.data));
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
    return next(new ExtendedError(error.message, 500, error.data));
  }
  return res.status(200).json(response);
};

/**
 * @authRoutes
 * @prefix /auth
 */
router.post("/signup", registerValidation, signUp);
router.post("/login", logInValidation, logIn);
router.put(
  "/resetPassword",
  resetPasswordValidation,
  authorize([Role.ADMIN, Role.HR, Role.USER]),
  resetPassword
);

router.post("/forgotPassword", authorize(["ALL"]), forgotPassword);
router.post("/forgotPassword/:token", forgotPasswordReset);

export default router;
