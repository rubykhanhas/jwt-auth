import {Router} from "express";
import {deletePost, getAuthorPosts, getPosts, postCreatePost} from "@/controllers/posts.controller";
import {authenticateToken} from "@/middlewares/token.middleware";
import {validateBody} from "@/middlewares/validate.middleware";
import {createPostSchema} from "@/validations/post.schema";

const Route = Router();
export default Route;

// get all post
Route.get("/", getPosts);
// create new post
Route.post("/", authenticateToken, validateBody(createPostSchema), postCreatePost);
// get author posts
Route.get("/own", authenticateToken, getAuthorPosts);
// delete post
Route.delete("/own/:postID", authenticateToken, deletePost);
