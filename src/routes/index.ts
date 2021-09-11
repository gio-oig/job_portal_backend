import { Router } from "express";
import jobRouter from "./jobRoutes";
import companyRouter from "./companyRoutes";
import searchRouter from "./searchRoutes";
import locationRouter from "./locationRoutes";
import categoryRouter from "./categoryRoutes";
import seekerRouter from "./seekerRoutes";

const router = Router();

/**
 * @baseRoutes
 * @endpoint http://localhost:5000/api/
 * @prefix /api
 */

router.use("/search", searchRouter);
router.use("/job", jobRouter);
router.use("/company", companyRouter);
router.use("/seeker", seekerRouter);
router.use("/location", locationRouter);
router.use("/category", categoryRouter);

export default router;

// router.get(
//   "/verify-token",
//   authorize([Role.USER, Role.HR, Role.ADMIN]),
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.header);
//     res.status(200).send("everything is ok");
//   }
// );
