import {RequestHandler} from "express";
import userModel from "@/models/user.model";
import {createResponse} from "@/utils/dry";
import {IUserParams, IUsersQuery} from "./users";

export const getUsers: RequestHandler<unknown, unknown, unknown, IUsersQuery> = async (
  req,
  res
) => {
  try {
    const {limit, skip} = req.query;
    const users = await userModel.find().skip(skip).limit(limit);
    return createResponse(res, 200, "get users successfully", users);
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const getUser: RequestHandler<IUserParams> = async (req, res) => {
  try {
    const {userID} = req.params;
    const user = await userModel.findById(userID);
    if (!user) return createResponse(res, 400, "user was not found");
    return createResponse(res, 200, "get user successfully", user);
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};
