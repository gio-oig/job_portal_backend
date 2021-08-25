"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interfaces_1 = require("../constants/interfaces");
const validation_1 = require("../middlewares/validation");
const ErrorClass_1 = require("../public/models/ErrorClass");
const userService_1 = require("../service/userService");
const authorization_1 = require("../_helpers/authorization");
const jobRoutes_1 = __importDefault(require("./jobRoutes"));
const companyRoutes_1 = __importDefault(require("./companyRoutes"));
const router = express_1.Router();
const createSeekerProfile = async (req, res, next) => {
    const { firstName, lastName } = req.body;
    let userId;
    if (req.user) {
        userId = req.user.sub;
    }
    else {
        return next(new ErrorClass_1.ExtendedError("could not create seeker profile, user id is not present"));
    }
    let response;
    try {
        response = await userService_1.userService.createSeekerProfile(userId, firstName, lastName);
    }
    catch (error) {
        return next(new ErrorClass_1.ExtendedError(error.message));
    }
    res.status(200).json(response);
};
router.get("/verify-token", authorization_1.authorize([interfaces_1.Role.USER, interfaces_1.Role.HR, interfaces_1.Role.ADMIN]), (req, res, next) => {
    console.log(req.header);
    res.status(200).send("everything is ok");
});
router.post("/seeker", validation_1.seekerValidation, authorization_1.authorize([interfaces_1.Role.USER]), createSeekerProfile);
router.use("/job", jobRoutes_1.default);
router.use("/company", companyRoutes_1.default);
exports.default = router;
