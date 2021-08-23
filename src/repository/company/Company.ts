import { PrismaClient } from "@prisma/client";
import { Company } from "../../public/models/CompanyClass";
import { ExtendedError } from "../../public/models/ErrorClass";

class CompanyRepo {
  constructor(private prisma: PrismaClient) {}

  async createCompany(company: Company) {
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
      return new ExtendedError("could not create company");
    }
  }
}

export const companyRepo = new CompanyRepo(new PrismaClient());
