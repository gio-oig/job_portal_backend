import { JobLocation, PrismaClient } from "@prisma/client";
import { BaseResponse } from "../../constants/interfaces";
import { ExtendedError } from "../../public/models/ErrorClass";

console.log("create prisma instance in locationRepo folder");
const prisma = new PrismaClient({ log: ["info", "error", "query", "warn"] });

class LocationRepo {
  /**
   * getLocations
   * @desc get all location from db
   */
  public async getLocations(): Promise<BaseResponse> {
    let locations: JobLocation[];
    try {
      locations = await prisma.jobLocation.findMany();
    } catch (error) {
      throw new ExtendedError("could not get locations");
    }
    return {
      message: "success",
      data: locations,
    };
  }
  /**
   * createLocation
   * @desc add new location
   */
  public async createLocation(location: string): Promise<BaseResponse> {
    try {
      await prisma.jobLocation.create({
        data: {
          city: location,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new ExtendedError("could not create location");
    }

    return { message: "location created successfully" };
  }
}

export const locationRepo = new LocationRepo();
