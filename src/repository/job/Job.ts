import { Prisma, PrismaClient } from "@prisma/client";
import { ExtendedError } from "../../public/models/ErrorClass";
import { Job } from "../../public/models/JobClass";
import { SeekerProfile } from "../../public/models/SeekerClass";

class JobRepo {
  constructor(private prisma: PrismaClient) {}

  public async createNewJob(job: Job) {
    try {
      const createdJob = await this.prisma.job.create({
        data: {
          title: job.title,
          description: job.description,
          expiration_date: job.expiration_date,
          creator_id: job.creator_id,
          location_id: job.location_id,
          category_id: job.category_id,
        },
      });
      return createdJob;
    } catch (error) {
      console.log(error.message);
      throw new ExtendedError("could not create job");
    }
  }

  public async searchJobs(payload: Prisma.JobFindManyArgs) {
    try {
      const result = await this.prisma.job.findMany(payload);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new ExtendedError("server error", 500);
    }
  }
}

export const jobRepo = new JobRepo(
  new PrismaClient({ log: ["query", "info", "warn", "error"] })
);
