import { Request, Router } from "express";
import jobRouter from "./jobRoutes";
import companyRouter from "./companyRoutes";
import searchRouter from "./searchRoutes";
import locationRouter from "./locationRoutes";
import categoryRouter from "./categoryRoutes";
import seekerRouter from "./seekerRoutes";
import scheduleRouter from "./schedule.route";
import queryHelper from "../_helpers/queryHelper";

const router = Router();

/**
 * @baseRoutes
 * @endpoint http://localhost:5000/api/
 * @prefix /api
 */

// type IQuery = {
//     someValue1:
// }

router.use(
  "/test",
  (req: Request<any, any, any, { someValue: string }>, res) => {
    queryHelper.parsAsArray(req.query.someValue);
    console.log("req.params");
    console.log(req.query);
    return res.json({ body: req.body, query: req.query });
  }
);

// router.use("/search", searchRouter);
router.use("/job", jobRouter);
router.use("/company", companyRouter);
router.use("/seeker", seekerRouter);
router.use("/location", locationRouter);
router.use("/category", categoryRouter);
router.use("/schedule", scheduleRouter);

export default router;

// router.get(
//   "/verify-token",
//   authorize([Role.USER, Role.HR, Role.ADMIN]),
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.header);
//     res.status(200).send("everything is ok");
//   }
// );
