"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRepo = void 0;
const client_1 = require("@prisma/client");
const ErrorClass_1 = require("../../public/models/ErrorClass");
class CompanyRepo {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCompany(company) {
        try {
            const createdCompany = await this.prisma.company.create({
                data: {
                    company_name: company.company_name,
                    company_description: company.company_description,
                    user_account_id: company.user_account_id,
                },
            });
            return createdCompany;
        }
        catch (error) {
            throw new ErrorClass_1.ExtendedError("could not create company");
        }
    }
    async saveImages(image, companyId) {
        console.log(image);
        try {
            const createdImage = await this.prisma.companyImage.create({
                data: {
                    company_image: image,
                    company_id: companyId,
                },
            });
        }
        catch (error) {
            throw new ErrorClass_1.ExtendedError("could not create image");
        }
    }
    async getCompanyById(id) {
        try {
            const company = this.prisma.company.findUnique({
                where: { id: id },
            });
            return company;
        }
        catch (error) {
            throw new ErrorClass_1.ExtendedError("unable to find company, please try again later");
        }
    }
    async getCompanies() {
        try {
            const companies = await this.prisma.company.findMany({
                include: {
                    CompanyImage: true,
                },
            });
            return companies;
        }
        catch (error) { }
    }
}
exports.companyRepo = new CompanyRepo(new client_1.PrismaClient({ log: ["query", "info"] }));
