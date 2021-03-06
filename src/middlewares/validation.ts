import { NextFunction, Request, Response } from "express";
import { ExtendedError } from "../public/models/ErrorClass";
import {
  companyDataValidation,
  createCategoryDataValidation,
  createLocationDataValidation,
  logInInputValidation,
  registerInputValidation,
  resetPasswordDataValidation,
  seekerDataValidation,
} from "../validations/inputValidations";
import { FormatedInputError } from "../constants/interfaces";
import { formatError } from "../_helpers/formatError";
import Joi, { ValidationError } from "joi";

export const registerValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = registerInputValidation(req.body);
  let formatedErrorObj: FormatedInputError = {};

  if (error) {
    formatedErrorObj = formatError(error);
    next(new ExtendedError("Invalid properties", 500, formatedErrorObj));
  }
  next();
};

export const logInValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = logInInputValidation(req.body);
  let formatedErrorObj: FormatedInputError = {};

  if (error) {
    formatedErrorObj = formatError(error);
    next(new ExtendedError("Invalid properties", 500, formatedErrorObj));
  }
  next();
};

export const seekerValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = seekerDataValidation(req.body);
  let formatedErrorObj: FormatedInputError = {};

  if (error) {
    formatedErrorObj = formatError(error);
    next(new ExtendedError("Invalid properties", 500, formatedErrorObj));
  }
  next();
};

export const companyValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = companyDataValidation(req.body);
  let formatedErrorObj: FormatedInputError = {};

  if (error) {
    formatedErrorObj = formatError(error);
    next(new ExtendedError("Invalid properties", 500, formatedErrorObj));
  }
  next();
};

export const resetPasswordValidation = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { error } = resetPasswordDataValidation(req.body);
  let formatedErrorObj: FormatedInputError = {};

  if (error) {
    formatedErrorObj = formatError(error);
    next(new ExtendedError("Invalid properties", 500, formatedErrorObj));
  }
  next();
};

export type Validable = (data: any) => Joi.ValidationResult;

export const baseValidation = (validation: Validable) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = validation(req.body);
    let formatedErrorObj: FormatedInputError = {};

    if (error) {
      formatedErrorObj = formatError(error);
      next(new ExtendedError("Invalid properties", 500, formatedErrorObj));
    }
    next();
  };
};

export const createLocationValidation = baseValidation(
  createLocationDataValidation
);

export const createCategoryValidation = baseValidation(
  createCategoryDataValidation
);
