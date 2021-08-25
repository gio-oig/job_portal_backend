import { BaseResponse, Company, MulterFiles } from "../constants/interfaces";
import { Company as CompanyInstance } from "../public/models/CompanyClass";
import { ExtendedError } from "../public/models/ErrorClass";
import { companyRepo } from "../repository/company/Company";

class CompanyService {
  async createCompany({
    company_name,
    company_description,
    user_account_id,
  }: Company): Promise<BaseResponse> {
    const companyInstance = new CompanyInstance(
      company_name,
      company_description,
      user_account_id
    );
    const response = await companyRepo.createCompany(companyInstance);

    return { message: "company created successfully", data: response };
  }

  async saveImages(
    multerFiles: MulterFiles,
    companyId: number,
    userId: number
  ): Promise<BaseResponse> {
    // check if company belongs to user
    const company = await companyRepo.getCompanyById(companyId);

    if (!company) {
      throw new ExtendedError("could not find company with this id");
    } else if (company.user_account_id !== userId) {
      throw new ExtendedError("company does not belongs to this user");
    }

    // get image names from multer object and store them in db
    if (multerFiles) {
      const fileKeys = Object.keys(multerFiles);
      for (const key of fileKeys) {
        //@ts-ignore
        await companyRepo.saveImages(multerFiles[key].filename, 2);
      }
    } else {
      throw new ExtendedError("could not find images");
    }

    return { message: "images saved successfully" };
  }
}

export const companyService = new CompanyService();
