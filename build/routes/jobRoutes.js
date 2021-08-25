"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const ErrorClass_1 = require("../public/models/ErrorClass");
const jobService_1 = require("../service/jobService");
const authorization_1 = require("../_helpers/authorization");
const router = express_1.Router();
const createJob = async (req, res, next) => {
    const { title, description, expirationDate, locationId, categoryId, companyId, } = req.body;
    let response;
    try {
        response = await jobService_1.jobService.createjob({
            title,
            description,
            expirationDate,
            locationId,
            categoryId,
            companyId,
        });
    }
    catch (error) {
        return next(new ErrorClass_1.ExtendedError(error.message));
    }
    return res.status(200).json(response);
};
exports.createJob = createJob;
router.post("/", authorization_1.authorize([client_1.Role.HR]), exports.createJob);
exports.default = router;
