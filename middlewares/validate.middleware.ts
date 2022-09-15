import {Handler} from "express";
import {createResponse} from "@/utils/dry";
import {OptionalObjectSchema} from "yup/lib/object";

export const validateBody =
  (validateSchema: OptionalObjectSchema<{}>): Handler =>
  async (req, res, next) => {
    try {
      const validated = await validateSchema.validate(req.body);
      req.body = validated;
      return next();
    } catch (error) {
      return createResponse(res, 400, error.message);
    }
  };
