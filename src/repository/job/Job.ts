import { Prisma, PrismaClient } from "@prisma/client";
import { IJob } from "../../constants/interfaces";
import { ExtendedError } from "../../public/models/ErrorClass";

class JobRepo {
  constructor(private prisma: PrismaClient) {}
  async getAll() {
    try {
      const jobs = await this.prisma.job.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          expiration_date: true,
          category: true,
          creator: true,
          location: true,
          schedule: true,
          tags: true,
        },
      });
      return jobs;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      throw new ExtendedError("could not create job");
    }
  }

  async createNewJob(job: IJob) {
    try {
      const createdJob = await this.prisma.job.create({
        data: {
          title: job.title,
          description: job.description,
          expiration_date: job.expiration_date,
          creator_id: job.creator_id,
          location_id: job.location_id,
          category_id: job.category_id,
          schedule_id: job.schedule_id,
        },
      });
      return createdJob;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      throw new ExtendedError("could not create job");
    }
  }

  async searchJobs(payload: Prisma.JobFindManyArgs) {
    try {
      const result = await this.prisma.job.findMany(payload);
      return result;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      throw new ExtendedError("server error", 500);
    }
  }
}

export const jobRepo = new JobRepo(
  new PrismaClient({ log: ["error", "warn"] })
);
