import { Company, prisma, PrismaClient } from "@prisma/client";
import { CompanyFollowable, CopyWithPartial } from "../../constants/interfaces";
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
          avatar: company.avatar,
          avatar_id: company.avatar_id,
        },
      });

      return createdCompany;
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      throw new ExtendedError(
        "could not get companies, please try again later"
      );
    }
  }

  async followCompany({ companyId, seekerId }: CompanyFollowable) {
    try {
      await this.prisma.companyFollower.create({
        data: {
          company_id: +companyId,
          seeker_id: +seekerId,
        },
      });
    } catch (error) {
      throw new ExtendedError("unable to follow, please try again later");
    }
  }

  async deleteOne(id: number) {
    try {
      await this.prisma.company.delete({ where: { id } });
    } catch (error) {
      throw new ExtendedError(
        "could not delete company, please try again later"
      );
    }
  }
}

export const companyRepo = new CompanyRepo(
  new PrismaClient({ log: ["error", "warn"] })
);
