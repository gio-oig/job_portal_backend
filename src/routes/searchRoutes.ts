import { NextFunction, Request, Response, Router } from "express";
import { ExtendedError } from "../public/models/ErrorClass";
import { companyService } from "../service/company";
import { JobSearchQuery, JobSearchQueryStr } from "../constants/interfaces";
import { jobService } from "../service/jobService";
import queryHelper from "../_helpers/queryHelper";

const router = Router();

const searchJobs = async (
  req: Request<any, any, any, JobSearchQueryStr>,
  res: Response,
  next: NextFunction
) => {
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
  // const query = queryHelper.transform2(req.query, {
  //   arrays: ["scheduleId"],
  //   numbers: ["categoryId", "locationId", "limit", "offset"],
  // });

  // const query: unknown = queryString.parse(req.query, { arrayFormat: "comma" });

  let response;
  try {
    response = await jobService.searchJobs(query);
  } catch (error) {
    if (error instanceof ExtendedError)
      return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

/**
 * @endpoint http://localhost:5000/api/search
 * @prefix /api/search
 */

router.get("/job", searchJobs);

export default router;
