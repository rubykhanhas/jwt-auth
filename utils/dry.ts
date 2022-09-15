/* DONT REPEAT YOURSELF */
import {Response} from "express";
import jwt from "jsonwebtoken";

type TResponse<T = any> =
  | {
      success: true;
      code: number;
      msg: string;
      data: T;
    }
  | {
      success: false;
      code: number;
      msg: string;
    };

export const createResponse = (response: Response, code: number, msg: string, payload?: any) => {
  type DataType = typeof payload;
  if (payload) {
    const data: TResponse<DataType> = {
      success: true,
      code,
      msg,
      data: payload,
    };
    return response.status(code).json(data);
  }
  return response.status(code).send(msg);
};

export const createToken = (type: "access" | "refresh", userID: string) => {
  switch (type) {
    case "access":
      return jwt.sign({userID}, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME!,
      });
    case "refresh":
      return jwt.sign({userID}, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: process.env.REFRESH_TOKEN_LIFETIME!,
      });
    default:
      return "";
  }
};
