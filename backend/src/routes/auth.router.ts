import { Router } from "express";
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";
import { resetPassword } from "../controllers/auth/reset-password.js";
import { getMe } from "../controllers/auth/get-me.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const AuthRouter = Router();

AuthRouter
  .post("/login", login)
  .post("/register", register)
  .post("/reset-password", resetPassword)
  .get("/me", authMiddleware, getMe);

export { AuthRouter };
