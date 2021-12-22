import { Request } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import { nanoid } from "nanoid";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    // null is the place for error
    cb(null, "uploads/images");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    // set file extention
    // @ts-expect-error
    const extension = MIME_TYPE_MAP[file.mimetype];
    // create file name
    cb(null, nanoid() + "." + extension);
  },
});

const filter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // check if file type is acceptable or not -> true/
  // @ts-expect-error
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  const error = isValid ? null : new Error("Invalid mime type!");
  //   cb(null, isValid);
  if (isValid) {
    cb(null, isValid);
  } else {
    cb(new Error("Invalid mime type!"));
  }
};

const multerMemoryStorage = multer.memoryStorage();

export const multerMemoryUpload = multer({ storage: multerMemoryStorage });

const upload: Multer = multer({ storage: storage, fileFilter: filter });

export default upload;
