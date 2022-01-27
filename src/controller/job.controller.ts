import { NextFunction, Request, Response } from "express";
import { JobSearchQuery, JobSearchQueryStr } from "../constants/interfaces";
import { ExtendedError } from "../public/models/ErrorClass";
import { jobService } from "../service/jobService";
import queryHelper from "../_helpers/queryHelper";

class JobController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    let jobs;

    try {
      jobs = await jobService.getAll();
    } catch (error) {}

    let response = {
      message: "success",
      jobs: jobs,
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

  async searchJobs(
    req: Request<any, any, any, JobSearchQueryStr>,
    res: Response,
    next: NextFunction
  ) {
    const query = queryHelper.transform<JobSearchQueryStr, JobSearchQuery>(
      req.query,
      {
        title: "string",
        categoryId: "number",
        locationId: "number",
        scheduleId: "array",
        limit: "number",
        offset: "number",
      }
    );

    let jobs;
    try {
      jobs = await jobService.searchJobs(query);
    } catch (error) {
      if (error instanceof ExtendedError)
        return next(new ExtendedError(error.message));
    }

    let response = {
      message: "success",
      jobs: jobs,
    };
    res.status(200).json(response);
  }
}

export default new JobController();
