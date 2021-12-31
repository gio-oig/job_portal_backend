import { NextFunction, Request, Response } from "express";
import ScheduleRespo from "../repository/schedule/schedule";

class ScheduleController {
  async get(req: Request, res: Response, next: NextFunction) {
    const schedules = await ScheduleRespo.get();

    const response = { message: "success", schedules: schedules };
    return res.json(response);
  }
}

export default new ScheduleController();
