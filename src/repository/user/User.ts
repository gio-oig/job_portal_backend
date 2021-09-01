import { PrismaClient } from "@prisma/client";
import { ExtendedError } from "../../public/models/ErrorClass";
import { SeekerProfile } from "../../public/models/SeekerClass";

import { User } from "../../public/models/UserClass";

class UserRepo {
  constructor(private prisma: PrismaClient) {}

  public async createNewUser(userObj: User) {
    try {
      const existingUser = await this.prisma.userAccount.findUnique({
        where: { email: userObj.email },
      });

      // console.log("checkIfUserExists");

      if (existingUser) {
        throw new ExtendedError("User Already exists");
      }

      console.log(userObj);
      const createdUser = await this.prisma.userAccount.create({
        data: userObj.getProperties(),
      });
      // throw new Error("debugging");
      return createdUser;
    } catch (error) {
      throw new ExtendedError(error.message);
    }
  }

  public async findUserByEmail(email: string) {
    const existingUser = await this.prisma.userAccount.findUnique({
      where: { email: email },
    });

    return existingUser;
  }

  public async findUserById(userId: number) {
    const existingUser = await this.prisma.userAccount.findUnique({
      where: { id: userId },
    });

    return existingUser;
  }

  public async resetPassword(userId: number, updatedPassword: string) {
    try {
      await this.prisma.userAccount.update({
        where: {
          id: userId,
        },
        data: {
          password: updatedPassword,
        },
      });
    } catch (error) {
      throw new ExtendedError("could not update password");
    }
  }

  public async createSeekerProfile(seeker: SeekerProfile) {
    // console.log(seeker);
    try {
      const seekerProfile = await this.prisma.seekerProfile.create({
        data: {
          first_name: seeker.firstName,
          last_name: seeker.lastName,
          user_account_id: seeker.userId,
        },
      });

      return seekerProfile;
    } catch (error) {
      console.log(error.message);
      throw new ExtendedError(
        "Unable to create seeker profile, please try again later."
      );
    }
  }
}

export const userRepo = new UserRepo(
  new PrismaClient({ log: ["query", "info", "warn", "error"] })
);
