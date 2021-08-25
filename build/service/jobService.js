"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const JobClass_1 = require("../public/models/JobClass");
const Job_1 = require("../repository/job/Job");
class JobService {
    async createjob({ title, description, expirationDate, companyId, locationId, categoryId, }) {
        const jobInstance = new JobClass_1.Job(title, description, expirationDate, companyId, locationId, categoryId);
        const responce = await Job_1.jobRepo.createNewJob(jobInstance);
        return {
            message: "job created successfully",
            data: responce,
        };
    }
}
exports.jobService = new JobService();
