import { SeekerProfile as SeekerType } from "@prisma/client";
import { SeekerProfile } from "../public/models/SeekerClass";
import { userRepo } from "../repository/user/User";

class SeekerProfileServise {
  async createSeekerProfile(
    userId: number,
    firstName: string,
    lastName: string
  ): Promise<SeekerType> {
    let createdSeekerProfile: SeekerType;
    const seekerInstance = new SeekerProfile(userId, firstName, lastName);
    createdSeekerProfile = await userRepo.createSeekerProfile(seekerInstance);

    return createdSeekerProfile;
  }
}

export default new SeekerProfileServise();
