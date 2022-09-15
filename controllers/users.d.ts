import {ParamsDictionary} from "express-serve-static-core";
import {ParsedUrlQuery} from "querystring";

export interface IUsersQuery extends ParsedUrlQuery {
  limit: number;
  skip: number;
}

export interface IUserParams extends ParamsDictionary {
  userID: string;
}
