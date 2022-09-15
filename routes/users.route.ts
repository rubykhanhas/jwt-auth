import {Router} from "express";
import {getUser, getUsers} from "@/controllers/users.controller";
import {authenticateToken} from "@/middlewares/token.middleware";

const Route = Router();
export default Route;

Route.get("/", authenticateToken, getUsers);

Route.get("/:userID", getUser);
