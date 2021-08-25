"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyDataValidation = exports.createJobDataValidation = exports.seekerDataValidation = exports.logInInputValidation = exports.registerInputValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const interfaces_1 = require("../constants/interfaces");
const registerInputValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(3).required(),
        role: joi_1.default.string().valid(interfaces_1.Role.USER, interfaces_1.Role.ADMIN, interfaces_1.Role.HR).required(),
    }).options({ abortEarly: false });
    return schema.validate(data);
};
exports.registerInputValidation = registerInputValidation;
const logInInputValidation = (data) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(3).required(),
    }).options({ abortEarly: false });
    return schema.validate(data);
};
exports.logInInputValidation = logInInputValidation;
const seekerDataValidation = (data) => {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).required(),
        lastName: joi_1.default.string().min(3).required(),
    }).options({ abortEarly: false });
    return schema.validate(data);
};
exports.seekerDataValidation = seekerDataValidation;
const createJobDataValidation = (data) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(3).required(),
        description: joi_1.default.string().min(3).required(),
        expirationDate: joi_1.default.date().required(),
        companyId: joi_1.default.number().required(),
        locationId: joi_1.default.number().required(),
        categoryId: joi_1.default.number().required(),
    }).options({ abortEarly: false });
    return schema.validate(data);
};
exports.createJobDataValidation = createJobDataValidation;
const companyDataValidation = (data) => {
    const schema = joi_1.default.object({
        companyName: joi_1.default.string().min(1).required(),
        companyDescription: joi_1.default.string().min(3).required(),
        userAccountId: joi_1.default.number().required(),
    }).options({ abortEarly: false });
    return schema.validate(data);
};
exports.companyDataValidation = companyDataValidation;
