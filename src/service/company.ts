import {
  BaseResponse,
  Company,
  CompanyFollowable,
  MulterFiles,
  UploadResponse,
} from "../constants/interfaces";
import { Company as CompanyInstance } from "../public/models/CompanyClass";
import { ExtendedError } from "../public/models/ErrorClass";
import { companyRepo } from "../repository/company/Company";
import { imageUpload } from "./imageUpload";

class CompanyService {
  async createCompany({
    company_name,
    company_description,
    user_account_id,
    avatar,
  }: Company): Promise<BaseResponse> {
    let uploadedImage: UploadResponse | undefined;

    if (avatar) {
      uploadedImage = await imageUpload.uploadStream(avatar, "avatar");
    }

    const companyInstance = new CompanyInstance(
      company_name,
      company_description,
      user_account_id,
      uploadedImage ? uploadedImage.imagePath : "",
      uploadedImage ? uploadedImage.imageId : ""
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
        await companyRepo.saveImages(multerFiles[key].filename, companyId);
      }
    } else {
      throw new ExtendedError("could not find images");
    }

    return { message: "images saved successfully" };
  }

  async getCompanies() {
    let response = await companyRepo.getCompanies();

    return { message: "success", companies: response };
  }

  async followCompany(params: CompanyFollowable): Promise<BaseResponse> {
    await companyRepo.followCompany(params);
    return { message: "success" };
  }
}

export const companyService = new CompanyService();
