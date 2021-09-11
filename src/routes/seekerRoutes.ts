import { NextFunction, Request, Response, Router } from "express";
import { AuthResponse, Role, SeekerResponse } from "../constants/interfaces";
import { seekerValidation } from "../middlewares/validation";
import { ExtendedError } from "../public/models/ErrorClass";
import { userService } from "../service/userService";
import { authorize } from "../_helpers/authorization";

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

/**
 * @baseRoutes
 * @endpoint http://localhost:5000/api/
 * @prefix /api
 */
router.post("/", seekerValidation, authorize([Role.USER]), createSeekerProfile);

export default router;
