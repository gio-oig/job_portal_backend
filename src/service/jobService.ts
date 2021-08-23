import { Job as PrismaJob } from "@prisma/client";
import { Job as JobInstance } from "../public/models/JobClass";
import { jobRepo } from "../repository/job/Job";

interface Job {
  title: string;
  description: string;
  expirationDate: string;
  companyId: number;
  locationId: number;
  categoryId: number;
}

class JobService {
  async createjob({
    title,
    description,
    expirationDate,
    companyId,
    locationId,
    categoryId,
  }: Job): Promise<{ message: string; data: PrismaJob }> {
    const jobInstance = new JobInstance(
      title,
      description,
      expirationDate,
      companyId,
      locationId,
      categoryId
    );
    const responce = await jobRepo.createNewJob(jobInstance);

    return {
      message: "job created successfully",
      data: responce,
    };
  }
}

export const jobService = new JobService();
