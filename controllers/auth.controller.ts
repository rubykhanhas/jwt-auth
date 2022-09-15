import {IAuthenticatedParams} from "@/middlewares/token";
import userModel from "@/models/user.model";
import {createResponse, createToken} from "@/utils/dry";
import argon2 from "argon2";
import {Handler, RequestHandler} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {ILoginBody, IRegisterBody} from "./auth";

export const postRegister: RequestHandler<unknown, unknown, IRegisterBody> = async (req, res) => {
  const {email, password, username} = req.body;
  try {
    const user = new userModel({email, username, password});
    await user.save();
    return createResponse(res, 201, "register successfully", {
      userID: user._id,
      username: user.username,
    });
  } catch (error) {
    // Mongoose unique field validate error code
    if (error.code == 11000) return createResponse(res, 422, "user existed");
    return createResponse(res, 400, error.message);
  }
};

export const postLogin: RequestHandler<unknown, unknown, ILoginBody> = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await userModel.findOne({username});
    if (!user) return createResponse(res, 422, "user was not found");
    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) return createResponse(res, 422, "invalid password");

    const accessToken = createToken("access", user._id);
    const refreshToken = createToken("refresh", user._id);
    await user.updateOne({$push: {accessTokens: accessToken}});

    res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: "strict"});
    return createResponse(res, 201, "login successfully", {
      userID: user._id,
      username: user.username,
      accessToken,
    });
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const getLogout: RequestHandler<IAuthenticatedParams> = async (req, res) => {
  const {userID} = req.params;
  const authorization = req.headers.authorization;
  const token = authorization && authorization.split(" ")[1];

  try {
    const user = await userModel.findByIdAndUpdate(userID, {$pull: {accessTokens: token}});
    if (!user) return createResponse(res, 400, "user was not found");
    res.clearCookie("refreshToken");
    return createResponse(res, 200, "logout successfully", {
      userID: user._id,
    });
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const getRefresh: Handler = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"] as string | null;
    if (!refreshToken) return createResponse(res, 400, "cookie was not found");
    jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, async (err, decoded) => {
      if (err) return createResponse(res, 400, "invalid token");
      const payload = decoded as JwtPayload;
      const userID = payload.userID as string;
      const user = await userModel.findById(userID);
      if (!user) return createResponse(res, 400, "user was not found");
      if (user) {
        const now_sec = new Date().getTime() / 1000;
        const revokedTokens = user.accessTokens.filter((token) => {
          const _decoded = jwt.decode(token) as jwt.JwtPayload;
          if (_decoded.exp) return _decoded.exp >= now_sec;
          else return false;
        });
        const newAccessToken = createToken("access", userID);
        const newRefreshToken = createToken("refresh", userID);
        await revokedTokens.push(newAccessToken);
        await user.updateOne({$set: {accessTokens: revokedTokens}});
        await res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "strict",
        });
        return createResponse(res, 200, "refreshed successfully", {
          accessToken: newAccessToken
        });
      }
    });
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const getReset: RequestHandler<IAuthenticatedParams> = async (req, res) => {
  try {
    const {userID} = req.params;
    const updated = await userModel.findByIdAndUpdate(userID, {$set: {accessTokens: []}});
    return createResponse(res, 200, "loged out all devices successfully!", {
      userID: updated!._id,
    });
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};
