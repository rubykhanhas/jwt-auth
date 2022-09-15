import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import PostAPI from "../api/post.api";
import {IGetAuthorPostsVar, IGetPostsVar, IPost, IDeletePostVar} from "../api/post.type";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (params: IGetPostsVar, {rejectWithValue}) => {
    try {
      const res = await PostAPI.getPosts(params);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
    }
  }
);

export const getAuthorPosts = createAsyncThunk(
  "post/getAuthorPosts",
  async (params: IGetAuthorPostsVar, {rejectWithValue}) => {
    try {
      const res = await PostAPI.getAuthorPosts(params);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (params: IDeletePostVar, {rejectWithValue}) => {
    try {
      const res = await PostAPI.deletePost({postID: params.postID});
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error.response?.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    error: "",
    posts: [] as IPost[],
    ownPosts: [] as IPost[],
  },
  reducers: {},
  extraReducers: (builder) => {
    //#region GET POSTS
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts.push(...action.payload!.data);
    });
    //#endregion
    //#region GET AUTHOR POSTS
    builder.addCase(getAuthorPosts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAuthorPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAuthorPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.ownPosts.push(...action.payload!.data);
    });
    //#endregion
    //#region DELETE POST
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = true;
      state.error = "";
      state.posts = state.posts.filter((post) => post._id != action.payload?.data.postID);
      state.ownPosts = state.ownPosts.filter((post) => post._id != action.payload?.data.postID);
    });
    //#endregion
  },
});

export default postSlice.reducer;
