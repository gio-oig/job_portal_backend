"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const fileUpload_1 = require("../middlewares/fileUpload");
const validation_1 = require("../middlewares/validation");
const ErrorClass_1 = require("../public/models/ErrorClass");
const company_1 = require("../service/company");
const authorization_1 = require("../_helpers/authorization");
const router = express_1.Router();
const createCompany = async (req, res, next) => {
    const { companyName, companyDescription, userAccountId } = req.body;
    let response;
    try {
        response = await company_1.companyService.createCompany({
            company_name: companyName,
            company_description: companyDescription,
            user_account_id: userAccountId,
        });
    }
    catch (error) {
        return next(new ErrorClass_1.ExtendedError(error.message));
    }
    return res.status(200).json(response);
};
const saveCompanyImages = async (req, res, next) => {
    const { companyId, userId } = req.body;
    let response;
    try {
        response = await company_1.companyService.saveImages(req.files, +companyId, +userId);
    }
    catch (error) {
        return next(new ErrorClass_1.ExtendedError(error.message));
    }
    res.status(200).json(response);
};
router.post("/images", authorization_1.authorize([client_1.Role.HR]), fileUpload_1.fileUpload.array("image"), saveCompanyImages);
router.post("/", validation_1.companyValidation, authorization_1.authorize([client_1.Role.HR]), createCompany);
exports.default = router;
