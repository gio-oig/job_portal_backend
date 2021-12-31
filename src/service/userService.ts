import bcrypt from "bcryptjs";
import { ExtendedError } from "../public/models/ErrorClass";
import { User } from "../public/models/UserClass";
import { userRepo } from "../repository/user/User";
import { Role } from "../constants/interfaces";
import jwt from "jsonwebtoken";
import { UserAccount } from "@prisma/client";
import { sendEmail } from "../_helpers/sendEmail";
import { LoginResponse } from "./types";

class UserService {
  async signUp(email: string, password: string, role: Role) {
    const userInstance = new User(email, password, role);
    await userInstance.hashPassword();

    console.log("userInstance");
    console.log(userInstance);
    const user = await userRepo.createNewUser(userInstance);

    return user;
  }

  async logIn(email: string, password: string): Promise<LoginResponse> {
    const user = (await userRepo.findUserByEmail(email)) as UserAccount;

    if (!user) {
      throw new ExtendedError("User does not exists");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ExtendedError("Invalid password", 500, {
        password: "Invalid password",
      });
    }

    const TOKEN = jwt.sign(
      { sub: user.id, role: user.role },
      //@ts-ignore
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    return { user, token: TOKEN };
  }

  async resetPassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ) {
    const existingUser = await userRepo.findUserById(userId);
    if (!existingUser) {
      throw new ExtendedError("could not find user with this id");
    }

    const validPassword = await this.validatePassword(
      oldPassword,
      existingUser.password
    );
    if (!validPassword) {
      throw new ExtendedError("Invalid password", 500, {
        password: "Invalid password",
      });
    }

    const hashedPassword = await this.hashPassword(newPassword);

    await userRepo.resetPassword(userId, hashedPassword);

    return true;
  }

  async forgotPassword(email: string) {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      throw new ExtendedError("could not find user");
    }

    const TOKEN = jwt.sign(
      { sub: user.id },
      //@ts-ignore
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    sendEmail(
      user.email,
      "RESTE PASSWORD",
      `<a href='http://localhost:5000/auth/forgotPassword/${TOKEN}'></a>`
    );

    return true;
  }

  async forgotPasswordReset(token: string, newPassword: string) {
    let decodedToken;

    // @ts-ignore
    decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken) {
      throw new ExtendedError("token is not valid");
    }

    // @ts-ignore
    let userId = decodedToken.sub;

    const hashedPassword = await this.hashPassword(newPassword);

    // @ts-ignore
    await userRepo.resetPassword(+userId, hashedPassword);

    return true;
  }
  async validatePassword(oldPass: string, newPass: string): Promise<boolean> {
    const isValid = await bcrypt.compare(oldPass, newPass);
    return isValid;
  }

  async hashPassword(newPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    return hashedPassword;
  }

  async findUserById(userId: number): Promise<UserAccount> {
    let user = await userRepo.findUserById(userId);

    return user;
  }
}

export const userService = new UserService();
