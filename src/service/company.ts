import { BaseResponse, Company } from "../constants/interfaces";
import { Company as CompanyInstance } from "../public/models/CompanyClass";
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
}

export const companyService = new CompanyService();
