import { NextFunction, Request, Response } from "express";
import { LoginResponse } from "../service/types";
import { userService } from "../service/userService";

class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, password, role } = req.body;
    let user;

    try {
      user = await userService.signUp(email, password, role);
    } catch (error) {
      return next(error);
    }

    let response = { message: "user created succesfully", data: user };
    res.status(200).json(response);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    let user: LoginResponse;

    try {
      user = await userService.logIn(email, password);
    } catch (error) {
      return next(error);
    }

    let response = {
      message: "success",
      data: user,
    };
    return res.status(200).json(response);
  }

  // change password after login
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const userId = req.user?.sub;
    const { oldPassword, newPassword } = req.body;

    try {
      // @ts-ignore
      await userService.resetPassword(+userId, oldPassword, newPassword);
    } catch (error) {
      return next(error);
    }

    let response = {
      message: "password updated successfully",
    };
    return res.status(200).json(response);
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    // const userId = (req.user as { sub: number }).sub;
    const { email } = req.body;

    try {
      await userService.forgotPassword(email);
    } catch (error) {
      return next(error);
    }

    let response = {
      message: "email sent successfully, please check you email",
    };

    return res.status(200).json(response);
  }

  async forgotPasswordReset(req: Request, res: Response, next: NextFunction) {
    const TOKEN = req.params.token;
    const { newPassword } = req.body;

    try {
      await userService.forgotPasswordReset(TOKEN, newPassword);
    } catch (error) {
      return next(error);
    }
    let response = {
      message: "password updated successfully",
    };
    return res.status(200).json(response);
  }

  async isLoggedIn(req: Request, res: Response, next: NextFunction) {
    let user;
    try {
      //@ts-expect-error
      user = await userService.findUserById(req.user?.sub);
    } catch (error) {
      return next(error);
    }

    let response = {
      message: "success",
      user: user,
    };
    return res.status(200).json(response);
  }
}

export default new UserController();
