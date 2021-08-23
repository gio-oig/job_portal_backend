import Joi from "joi";
import { Role } from "../constants/interfaces";

export const registerInputValidation = (data: {
  name: string;
  email: string;
}) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required(),
    role: Joi.string().valid(Role.USER, Role.ADMIN, Role.HR).required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const logInInputValidation = (data: { name: string; email: string }) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const seekerDataValidation = (data: {
  firstName: string;
  lastName: string;
}) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const createJobDataValidation = (data: {
  title: string;
  description: string;
  expirationDate: string;
  companyId: number;
  locationId: number;
  categoryId: number;
}) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    expirationDate: Joi.date().required(),
    companyId: Joi.number().required(),
    locationId: Joi.number().required(),
    categoryId: Joi.number().required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};

export const CompanyDataValidation = (data: {
  companyName: string;
  companyDescription: string;
  userAccountId: number;
}) => {
  const schema = Joi.object({
    companyName: Joi.string().min(3).required(),
    companyDescription: Joi.string().min(3).required(),
    userAccountId: Joi.number().required(),
  }).options({ abortEarly: false });
  return schema.validate(data);
};
