import { PrismaClient } from "@prisma/client";
import { ExtendedError } from "../../public/models/ErrorClass";

const prisma = new PrismaClient({ log: ["error"] });

class ScheduleRespo {
  async get() {
    try {
      const schedules = await prisma.jobSchedule.findMany();
      return schedules;
    } catch (error) {
      throw new ExtendedError("unable to fetch schedules");
    }
  }
}

export default new ScheduleRespo();
