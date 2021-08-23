import { ValidationError } from "joi";
import { FormatedInputError } from "../constants/interfaces";

export const formatError = (error: ValidationError): FormatedInputError => {
  const formatedErrorObject: FormatedInputError = {};

  for (let i of error.details) {
    const key = i.path[0];
    formatedErrorObject[key] = i.message;
  }

  return formatedErrorObject;
};
