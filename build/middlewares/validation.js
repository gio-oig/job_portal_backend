"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyValidation = exports.seekerValidation = exports.logInValidation = exports.registerValidation = void 0;
const ErrorClass_1 = require("../public/models/ErrorClass");
const inputValidations_1 = require("../validations/inputValidations");
const formatError_1 = require("../_helpers/formatError");
const registerValidation = (req, _, next) => {
    const { error } = inputValidations_1.registerInputValidation(req.body);
    let formatedErrorObj = {};
    if (error) {
        formatedErrorObj = formatError_1.formatError(error);
        next(new ErrorClass_1.ExtendedError("Invalid properties", 500, formatedErrorObj));
    }
    next();
};
exports.registerValidation = registerValidation;
const logInValidation = (req, _, next) => {
    const { error } = inputValidations_1.logInInputValidation(req.body);
    let formatedErrorObj = {};
    if (error) {
        formatedErrorObj = formatError_1.formatError(error);
        next(new ErrorClass_1.ExtendedError("Invalid properties", 500, formatedErrorObj));
    }
    next();
};
exports.logInValidation = logInValidation;
const seekerValidation = (req, _, next) => {
    const { error } = inputValidations_1.seekerDataValidation(req.body);
    let formatedErrorObj = {};
    if (error) {
        formatedErrorObj = formatError_1.formatError(error);
        next(new ErrorClass_1.ExtendedError("Invalid properties", 500, formatedErrorObj));
    }
    next();
};
exports.seekerValidation = seekerValidation;
const companyValidation = (req, _, next) => {
    const { error } = inputValidations_1.companyDataValidation(req.body);
    let formatedErrorObj = {};
    if (error) {
        formatedErrorObj = formatError_1.formatError(error);
        next(new ErrorClass_1.ExtendedError("Invalid properties", 500, formatedErrorObj));
    }
    next();
};
exports.companyValidation = companyValidation;
