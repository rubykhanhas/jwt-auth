import {ParamsDictionary} from "express-serve-static-core";

export interface IAuthenticatedParams extends ParamsDictionary {
  userID: string;
}
