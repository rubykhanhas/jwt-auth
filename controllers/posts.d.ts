import {ParamsDictionary} from "express-serve-static-core";
import {IAuthenticatedParams} from "middlewares/token";
import {ParsedUrlQuery} from "querystring";

export interface IPostsQuery extends ParsedUrlQuery {
  limit: number;
  skip: number;
}

export interface IAuthorPostsParams extends ParamsDictionary, IAuthenticatedParams {
  postID: string;
}

export interface ICreatePostBody {
  title: string;
  description: string;
}
