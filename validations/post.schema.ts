import * as yup from "yup";

export const createPostSchema = yup.object({
  title: yup.string().required().trim(),
  description: yup.string().required().trim(),
});
