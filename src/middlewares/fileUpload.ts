import multer from "multer";
import { v4 as uuid } from "uuid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

export const fileUpload = multer({
  //   limits: 50000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // null is the place for error
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      // set file extention
      console.log("filename section");
      console.dir(file);
      // @ts-ignore
      const extension = MIME_TYPE_MAP[file.mimetype];
      // create file name
      cb(null, uuid() + "." + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    // check if file type is acceptable or not -> true/false
    // @ts-ignore
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid ? null : new Error("Invalid mime type!");
    console.log("error section");
    console.log(error);
    console.log("is valid");
    console.log(isValid);
    // @ts-ignore
    cb(error, isValid);
  },
});
