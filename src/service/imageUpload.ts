import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { UploadResponse } from "../constants/interfaces";
import fs from "fs";
import streamifier from "streamifier";

interface IImageUpload {
  imagePath: string;
  imageId: string;
}
class ImageUpload {
  async upload(path: string): Promise<UploadResponse> {
    let res: UploadApiResponse;

    try {
      res = await cloudinary.uploader.upload(path, {
        folder: "avatar",
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    return {
      imagePath: res.secure_url,
      imageId: res.public_id,
    };
  }

  async uploadStream(buffer: Buffer, folder: string) {
    return new Promise<IImageUpload>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
        },
        (error, result) => {
          if (result) {
            resolve({
              imagePath: result.secure_url,
              imageId: result.public_id,
            });
          } else {
            reject({
              message: "Fail",
              error: error,
            });
          }
        }
      );
      // write post strem
      streamifier.createReadStream(buffer).pipe(stream);
    });
  }
}

export const imageUpload = new ImageUpload();
