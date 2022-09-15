import {axiosDefault, axiosPrivate} from "../axios";
import {IAxiosResponse} from "../axios.type";
import {
  ICreatePostData,
  ICreatePostValue,
  IDeletePostData,
  IDeletePostVar,
  IGetAuthorPostsData,
  IGetAuthorPostsVar,
  IGetPostsData,
  IGetPostsVar,
} from "./post.type";

const PostAPI = {
  BASE_URL: "/posts",
  getPosts: function (params: IGetPostsVar) {
    const URL = this.BASE_URL;
    return axiosDefault.get<IAxiosResponse<IGetPostsData>>(URL, {params});
  },
  newPost: function (value: ICreatePostValue) {
    const URL = this.BASE_URL;
    return axiosPrivate.post<IAxiosResponse<ICreatePostData>>(URL, value);
  },
  getAuthorPosts: function (params: IGetAuthorPostsVar) {
    const URL = this.BASE_URL + "/own";
    return axiosPrivate.get<IAxiosResponse<IGetAuthorPostsData>>(URL, {params});
  },
  deletePost: function (args: IDeletePostVar) {
    const URL = this.BASE_URL + `/own/${args.postID}`;
    return axiosPrivate.delete<IAxiosResponse<IDeletePostData>>(URL);
  },
};

export default PostAPI;
