import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../public/models/ErrorClass";

export const incorrectRouteHandler = (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  return next(new Error("Could not find this route"));
};

export const mainErrorhandler = (
  error: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error handler route");
  // delete image if we got an error
  // multer adds file property to request object

  const errorObject: { message: string; error?: object } = {
    message: error.message,
  };

  if (error.data) {
    errorObject.error = error.data;
  }

  // console.log("******** error object *******");
  // console.log(error);

  res.status(error.statusCode || 500);
  res.json(errorObject);
};
