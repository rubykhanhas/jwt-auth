import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .min(5)
    .max(30)
    .matches(/^([a-z0-9_])+$/g, "username invalid"),
  email: yup.string().email().required().trim().lowercase(),
  password: yup.string().required().trim().min(6).max(30),
});

export const loginSchema = yup.object({
  username: yup
    .string()
    .required()
    .trim()
    .lowercase()
    .min(5)
    .max(30)
    .matches(/^([a-z0-9_])+$/g, "username invalid"),
  password: yup.string().required().trim().min(6).max(30),
});
