import {
  getLogout,
  getRefresh,
  getReset,
  postLogin,
  postRegister,
} from "@/controllers/auth.controller";
import {Router} from "express";
import {authenticateToken, revokeExpiredToken} from "@/middlewares/token.middleware";
import {validateBody} from "@/middlewares/validate.middleware";
import {loginSchema, registerSchema} from "@/validations/auth.schema";

const Route = Router();
export default Route;

Route.post("/register", validateBody(registerSchema), postRegister);

Route.post("/login", validateBody(loginSchema), postLogin);

Route.get("/logout", authenticateToken, getLogout);

Route.get("/refresh", getRefresh);

// reset password case -> logout all devices
Route.get("/reset", authenticateToken, getReset);
