"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("../../middlewares/validation");
const ErrorClass_1 = require("../../public/models/ErrorClass");
const userService_1 = require("../../service/userService");
const router = express_1.Router();
const signUp = async (req, res, next) => {
    const { email, password, role } = req.body;
    let response;
    try {
        response = await userService_1.userService.signUp(email, password, role);
    }
    catch (error) {
        return next(new ErrorClass_1.ExtendedError(error.message));
    }
    res.status(200).json(response);
};
const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    let response;
    try {
        response = await userService_1.userService.logIn(email, password);
    }
    catch (error) {
        return next(new ErrorClass_1.ExtendedError(error.message, 500, error.data));
    }
    return res.status(200).json(response);
};
router.post("/signup", validation_1.registerValidation, signUp);
router.post("/login", validation_1.logInValidation, logIn);
exports.default = router;
