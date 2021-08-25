"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyService = void 0;
const CompanyClass_1 = require("../public/models/CompanyClass");
const ErrorClass_1 = require("../public/models/ErrorClass");
const Company_1 = require("../repository/company/Company");
class CompanyService {
    async createCompany({ company_name, company_description, user_account_id, }) {
        const companyInstance = new CompanyClass_1.Company(company_name, company_description, user_account_id);
        const response = await Company_1.companyRepo.createCompany(companyInstance);
        return { message: "company created successfully", data: response };
    }
    async saveImages(multerFiles, companyId, userId) {
        // check if company belongs to user
        const company = await Company_1.companyRepo.getCompanyById(companyId);
        if (!company) {
            throw new ErrorClass_1.ExtendedError("could not find company with this id");
        }
        else if (company.user_account_id !== userId) {
            throw new ErrorClass_1.ExtendedError("company does not belongs to this user");
        }
        // get image names from multer object and store them in db
        if (multerFiles) {
            const fileKeys = Object.keys(multerFiles);
            for (const key of fileKeys) {
                //@ts-ignore
                await Company_1.companyRepo.saveImages(multerFiles[key].filename, 2);
            }
        }
        else {
            throw new ErrorClass_1.ExtendedError("could not find images");
        }
        return { message: "images saved successfully" };
    }
    async getCompanies() {
        const response = await Company_1.companyRepo.getCompanies();
    }
}
exports.companyService = new CompanyService();
