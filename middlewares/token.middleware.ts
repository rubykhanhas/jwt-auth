import {Handler, RequestHandler} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import userModel from "@/models/user.model";
import {createResponse} from "@/utils/dry";
import {IAuthenticatedParams} from "./token";

export const authenticateToken: Handler = async (req, res, next) => {
  const authorization = req.headers.authorization;
  // authorization = "Bearer ntjaneuon1o2u3123mklmk312"
  const token = authorization && authorization.split(" ")[1];
  if (!token) return createResponse(res, 401, "token was not found");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, async (err, decoded) => {
    if (err) {
      if (err.message == "jwt expired") return createResponse(res, 403, "token expired");
      return createResponse(res, 403, "invalid token");
    }
    const payload = decoded as JwtPayload;
    req.params.userID = payload.userID;

    // check current token was accepted in database?
    const user = await userModel.findById(payload.userID);
    const valid = user!.accessTokens.findIndex((x) => x == token);
    if (valid == -1) return createResponse(res, 401, "token was revoked");
    return next();
  });
};

export const revokeExpiredToken: RequestHandler<IAuthenticatedParams> = async (req, res, next) => {
  try {
    const {userID} = req.params;
    const user = await userModel.findById(userID);
    if (!user) return createResponse(res, 400, "revoke failed, user was not found");

    const now_sec = new Date().getTime() / 1000;
    const revokedAccessTokens = user.accessTokens.filter((accessToken) => {
      const decoded = jwt.decode(accessToken) as JwtPayload;
      return decoded.exp! >= now_sec;
    });
    await user.updateOne({$set: {accessTokens: revokedAccessTokens}});
    return next();
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};
