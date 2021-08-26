import bcrypt from "bcryptjs";
import { ExtendedError } from "../public/models/ErrorClass";
import { User } from "../public/models/UserClass";
import { userRepo } from "../repository/user/User";
import {
  AuthResponse,
  BaseResponse,
  Role,
  SeekerResponse,
} from "../constants/interfaces";
import jwt from "jsonwebtoken";
import { UserAccount, SeekerProfile as SeekerType } from "@prisma/client";
import { SeekerProfile } from "../public/models/SeekerClass";

class UserService {
  async createSeekerProfile(
    userId: number,
    firstName: string,
    lastName: string
  ): Promise<SeekerResponse> {
    let createdSeekerProfile: SeekerType;
    const seekerInstance = new SeekerProfile(userId, firstName, lastName);
    createdSeekerProfile = await userRepo.createSeekerProfile(seekerInstance);

    return {
      message: "seeker profile created successfully",
      data: createdSeekerProfile,
    };
  }

  async signUp(
    email: string,
    password: string,
    role: Role
  ): Promise<AuthResponse> {
    const userInstance = new User(email, password, role);
    await userInstance.hashPassword();

    console.log("userInstance");
    console.log(userInstance);
    const resp = await userRepo.createNewUser(userInstance);

    return { message: "user created succesfully", data: resp };
  }

  async logIn(email: string, password: string): Promise<AuthResponse> {
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

    return {
      message: "success",
      data: user,
      token: TOKEN,
    };
  }

  async resetPassword(
    userId: number,
    oldPassword: string,
    newPassword: string
  ): Promise<BaseResponse> {
    const existingUser = await userRepo.findUserById(userId);
    if (!existingUser) {
      throw new ExtendedError("could not find user with this id");
    }

    const validPassword = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!validPassword) {
      throw new ExtendedError("Invalid password", 500, {
        password: "Invalid password",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userRepo.resetPassword(userId, hashedPassword);

    return {
      message: "password updated successfully",
    };
  }
}

export const userService = new UserService();
