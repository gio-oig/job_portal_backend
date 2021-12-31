import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../public/models/ErrorClass";
import { jobService } from "../service/jobService";

class JobController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    let jobs;

    try {
      jobs = await jobService.getAll();
    } catch (error) {}

    let response = {
      message: "success",
      data: jobs,
    };
    return res.status(200).json(response);
  }
  async create(req: Request, res: Response, next: NextFunction) {
    const {
      title,
      description,
      expirationDate: expiration_date,
      locationId: location_id,
      categoryId: category_id,
      companyId: creator_id,
      scheduleId: schedule_id,
    } = req.body;

    let job;

    try {
      job = await jobService.createjob({
        title,
        description,
        expiration_date,
        location_id,
        category_id,
        creator_id,
        schedule_id,
      });
    } catch (error) {
      if (error instanceof ExtendedError)
        return next(new ExtendedError(error.message));
    }

    let response = {
      message: "job created successfully",
      data: job,
    };
    return res.status(200).json(response);
  }
}

export default new JobController();
