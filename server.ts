import Compression from "compression";
import CookieParser from "cookie-parser";
import Cors from "cors";
import * as dotenv from "dotenv";
import Express from "express";
import Morgan from "morgan";
import path from "path";
import "./paths.config";
dotenv.config();
/*  */
import authRoutes from "@/routes/auth.route";
import postsRoutes from "@/routes/posts.route";
import usersRoutes from "@/routes/users.route";
import {connectDB} from "@/utils/database";

/*  */
const App = Express();
App.use(Morgan("dev"));
App.use(
  Cors({
    origin: "http://127.0.0.1:8080",
    credentials: true,
  })
);
const __PUBLIC_DIR =
  process.env.NODE_ENV == "production"
    ? path.join(__dirname, "..", "client", "dist")
    : path.join(__dirname, "client", "dist");
App.use(Express.static(__PUBLIC_DIR));
App.use(Compression());
App.use(CookieParser());
App.use(Express.json());
App.use(Express.urlencoded({extended: true}));

/*  */
const __PORT = process.env.PORT || 3000;
connectDB();
App.listen(__PORT, () => console.log(`-> Server:\t http://127.0.0.1:${__PORT}`));

App.use("/api/v1/auth", authRoutes);
App.use("/api/v1/users", usersRoutes);
App.use("/api/v1/posts", postsRoutes);
/* production only */
App.get("*", (req, res) => {
  return res.sendFile(path.join(__PUBLIC_DIR, "index.html"));
});
