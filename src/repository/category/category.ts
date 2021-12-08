import { Category, PrismaClient } from "@prisma/client";
import { BaseResponse } from "../../constants/interfaces";
import { ExtendedError } from "../../public/models/ErrorClass";

console.log("create prisma instance in CategoryRepo folder");
const prisma = new PrismaClient({ log: ["error", "warn"] });

class CategoryRepo {
  /**
   * getCategories
   * @desc get all categories from db
   */
  public async getCategories(): Promise<BaseResponse> {
    let categories: Category[];
    try {
      categories = await prisma.category.findMany();
    } catch (error) {
      throw new ExtendedError("could not get categories");
    }
    return {
      message: "success",
      data: categories,
    };
  }
  /**
   * createcategory
   * @desc add new category
   */
  public async createcategory(name: string): Promise<BaseResponse> {
    try {
      await prisma.category.create({
        data: {
          name: name,
        },
      });
    } catch (error) {
      throw new ExtendedError("could not create category");
    }

    return { message: "category created successfully" };
  }

  public async updateCategory(id: number, name: string) {
    try {
      await prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
    } catch (error) {
      throw new ExtendedError("could not update category");
    }
  }

  public async deleteCategory(id: number) {
    try {
      await prisma.category.delete({ where: { id: id } });
    } catch (error) {
      throw new ExtendedError("could not delete category");
    }
  }
}

export const categoryRepo = new CategoryRepo();
