import { NextFunction, Request, Response, Router } from "express";
import { AuthResponse, Role, SeekerResponse } from "../constants/interfaces";
import { fileUpload } from "../middlewares/fileUpload";
import { seekerValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { userService } from "../service/userService";
import { authorize } from "../_helpers/authorization";
import { createJob } from "./jobRoutes";
import companyRouter from "./companyRoutes";

const router = Router();

const createSeekerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName } = req.body;
  let userId: number;

  if (req.user) {
    userId = (req.user as { sub: number }).sub;
  } else {
    return next(
      new ExtendedError(
        "could not create seeker profile, user id is not present"
      )
    );
  }
  let response: SeekerResponse;
  try {
    response = await userService.createSeekerProfile(
      userId,
      firstName,
      lastName
    );
  } catch (error) {
    return next(new ExtendedError(error.message));
  }

  res.status(200).json(response);
};

router.get(
  "/verify-token",
  authorize([Role.USER, Role.HR, Role.ADMIN]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.header);
    res.status(200).send("everything is ok");
  }
);

router.post("/job", authorize([Role.HR]), createJob);

router.post("/company/images", fileUpload.array("image"), (req, res, next) => {
  console.log(req.files);
  // return next(new Error("delete image on error"));
  // console.log(req.files);
  res.send("image saved");
});

router.post(
  "/seeker",
  seekerValidation,
  authorize([Role.USER]),
  createSeekerProfile
);
export default router;

router.use("/company", companyRouter);
