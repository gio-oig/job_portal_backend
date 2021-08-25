"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepo = void 0;
const client_1 = require("@prisma/client");
const ErrorClass_1 = require("../../public/models/ErrorClass");
class JobRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewJob(job) {
        try {
            const createdJob = await this.prisma.job.create({
                data: {
                    title: job.title,
                    description: job.description,
                    expiration_date: job.expiration_date,
                    creator_id: job.creator_id,
                    location_id: job.location_id,
                    category_id: job.category_id,
                },
            });
            return createdJob;
        }
        catch (error) {
            console.log(error.message);
            throw new ErrorClass_1.ExtendedError("could not create job");
        }
    }
}
exports.jobRepo = new JobRepo(new client_1.PrismaClient({ log: ["query", "info"] }));
