import {RequestHandler} from "express";
import {IAuthenticatedParams} from "@/middlewares/token";
import postModel from "@/models/post.model";
import {createResponse} from "@/utils/dry";
import {IAuthorPostsParams, ICreatePostBody, IPostsQuery} from "./posts";

export const getPosts: RequestHandler<unknown, unknown, unknown, IPostsQuery> = async (
  req,
  res
) => {
  try {
    const {limit, skip} = req.query;
    const posts = await postModel.find().populate("author", ["username"]).limit(limit).skip(skip);
    return createResponse(res, 200, "get posts successfully", posts);
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const postCreatePost: RequestHandler<
  IAuthenticatedParams,
  unknown,
  ICreatePostBody
> = async (req, res) => {
  try {
    const {userID} = req.params;
    const {title, description} = req.body;
    const post = new postModel({title, description, author: userID});
    await post.save();
    return createResponse(res, 201, "created post successfully", post);
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const getAuthorPosts: RequestHandler<
  IAuthorPostsParams,
  unknown,
  unknown,
  IPostsQuery
> = async (req, res) => {
  try {
    const {userID} = req.params;
    const {limit, skip} = req.query;
    const posts = await postModel
      .find({author: userID})
      .populate("author", ["username"])
      .skip(skip)
      .limit(limit);
    return createResponse(res, 200, "get author posts successfully", posts);
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};

export const deletePost: RequestHandler<IAuthorPostsParams> = async (req, res) => {
  try {
    const {postID} = req.params;
    const deleted = await postModel.findByIdAndDelete(postID);
    if (!deleted) return createResponse(res, 400, "post was not found");
    return createResponse(res, 202, "deleted successfully", {postID: deleted._id});
  } catch (error) {
    return createResponse(res, 400, error.message);
  }
};
