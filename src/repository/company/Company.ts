import { PrismaClient } from "@prisma/client";
import { Company as CompanyInstance } from "../../public/models/CompanyClass";
import { ExtendedError } from "../../public/models/ErrorClass";

class CompanyRepo {
  constructor(private prisma: PrismaClient) {}

  async createCompany(company: CompanyInstance) {
    try {
      const createdCompany = await this.prisma.company.create({
        data: {
          company_name: company.company_name,
          company_description: company.company_description,
          user_account_id: company.user_account_id,
        },
      });

      return createdCompany;
    } catch (error) {
      throw new ExtendedError("could not create company");
    }
  }

  async saveImages(image: string, companyId: number) {
    console.log(image);
    try {
      const createdImage = await this.prisma.companyImage.create({
        data: {
          company_image: image,
          company_id: companyId,
        },
      });
    } catch (error) {
      throw new ExtendedError("could not create image");
    }
  }

  async getCompanyById(id: number) {
    try {
      const company = this.prisma.company.findUnique({
        where: { id: id },
      });
      return company;
    } catch (error) {
      throw new ExtendedError("unable to find company, please try again later");
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
    } catch (error) {}
  }
}

export const companyRepo = new CompanyRepo(
  new PrismaClient({ log: ["query", "info"] })
);
