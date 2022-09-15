import {ParsedUrlQuery} from "querystring";

interface IPost {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface IGetPostsVar {
  limit?: number;
  skip?: number;
}

type IGetPostsData = IPost[];

interface ICreatePostValue {
  title: string;
  description: string;
}

type ICreatePostData = IPost;

interface IGetAuthorPostsVar {
  limit: number;
  skip: number;
}

type IGetAuthorPostsData = IPost[];

interface IDeletePostVar {
  postID: string;
}

interface IDeletePostData {
  postID: string;
}

export {
  IPost,
  ICreatePostData,
  ICreatePostValue,
  IDeletePostData,
  IDeletePostVar,
  IGetAuthorPostsData,
  IGetAuthorPostsVar,
  IGetPostsData,
  IGetPostsVar,
};
