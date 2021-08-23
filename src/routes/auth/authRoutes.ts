import { Router, NextFunction, Request, Response } from "express";
import { AuthResponse } from "../../constants/interfaces";
import {
  logInValidation,
  registerValidation,
} from "../../middlewares/validation";
import { ExtendedError } from "../../public/models/ErrorClass";
import { userService } from "../../service/userService";

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

router.post("/signup", registerValidation, signUp);
router.post("/login", logInValidation, logIn);

export default router;
