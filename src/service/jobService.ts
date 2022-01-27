import { Job as PrismaJob, Prisma } from "@prisma/client";
import { BaseResponse, IJob, JobSearchQuery } from "../constants/interfaces";
import { jobRepo } from "../repository/job/Job";

class JobService {
  async getAll() {
    const jobs = await jobRepo.getAll();
    return jobs;
  }

  async createjob(obj: IJob) {
    const job = await jobRepo.createNewJob(obj);

    return job;
  }

  async searchJobs(query: JobSearchQuery) {
    const payload: Prisma.JobFindManyArgs = {
      where: {
        title: { contains: query.title || "", mode: "insensitive" },
      },
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
      orderBy: { created_at: "desc" },
    };
    if (query.categoryId) {
      payload.where!.category_id = query.categoryId;
    }
    if (query.locationId) {
      payload.where!.location_id = query.locationId;
    }
    if (query.scheduleId) {
      payload.where!.schedule_id = { in: query.scheduleId };
    }
    if (query.limit) {
      payload.take = query.limit;
    }
    if (query.offset) {
      payload.skip = query.offset;
    }

    const result = await jobRepo.searchJobs(payload);

    return result;
  }
}

export const jobService = new JobService();
