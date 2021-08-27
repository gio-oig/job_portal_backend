import { Job as PrismaJob, Prisma } from "@prisma/client";
import { JobSearchQuery } from "../constants/interfaces";
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

  async searchJobs(query: JobSearchQuery) {
    const payload: Prisma.JobFindManyArgs = {
      where: {
        title: { contains: query.title || "", mode: "insensitive" },
      },
      include: {
        location: true,
        category: true,
      },
    };
    if (query.categoryId) {
      payload.where!.category_id = +query.categoryId;
    }
    if (query.locationId) {
      payload.where!.location_id = +query.locationId;
    }

    const result = await jobRepo.searchJobs(payload);

    return {
      message: "success",
      jobs: result,
    };
  }
}

export const jobService = new JobService();
