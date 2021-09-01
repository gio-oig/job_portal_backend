import { NextFunction, Request, Response, Router } from "express";
import { AuthResponse, Role, SeekerResponse } from "../constants/interfaces";
import { seekerValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { userService } from "../service/userService";
import { authorize } from "../_helpers/authorization";
import jobRouter from "./jobRoutes";
import companyRouter from "./companyRoutes";
import searchRouter from "./searchRoutes";
import locationRouter from "./locationRoutes";
import categoryRouter from "./categoryRoutes";

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

/**
 * @baseRoutes
 * @endpoint http://localhost:5000/api/
 * @prefix /api
 */
router.post(
  "/seeker",
  seekerValidation,
  authorize([Role.USER]),
  createSeekerProfile
);

router.use("/job", jobRouter);
router.use("/company", companyRouter);
router.use("/search", searchRouter);
router.use("/location", locationRouter);
router.use("/category", categoryRouter);

export default router;
