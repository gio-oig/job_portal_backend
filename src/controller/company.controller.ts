import { NextFunction, Request, Response } from "express";
import { companyService } from "../service/company";

class CompanyController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { companyName, companyDescription, userAccountId, avatar } = req.body;

    let company;
    try {
      company = await companyService.createCompany({
        company_name: companyName,
        company_description: companyDescription,
        user_account_id: +userAccountId,
        avatar: req.file?.buffer,
      });
    } catch (error) {
      return next(error);
    }

    let response = { message: "company created successfully", data: company };
    return res.status(200).json(response);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    let companies;
    try {
      companies = await companyService.getCompanies();
    } catch (error) {
      return next(error);
    }

    let response = { message: "success", companies: companies };
    res.status(200).json(response);
  }

  async follow(req: Request, res: Response, next: NextFunction) {
    const { companyId, seekerId } = req.body;
    try {
      await companyService.followCompany({ companyId, seekerId });
    } catch (error) {
      return next(error);
    }

    let response = { message: "success" };
    res.status(200).json(response);
  }

  async saveCompanyImages(req: Request, res: Response, next: NextFunction) {
    const { companyId, userId } = req.body;
    let response;
    try {
      response = await companyService.saveImages(
        req.files,
        +companyId,
        +userId
      );
    } catch (error) {
      return next(error);
    }

    res.status(200).json(response);
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await companyService.deleteOne(+id);
    } catch (error) {
      return next(error);
    }

    let response = { message: "company deleted successfully" };
    res.status(200).json(response);
  }
}

export default new CompanyController();
