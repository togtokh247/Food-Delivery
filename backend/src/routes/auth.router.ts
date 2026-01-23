import { Router } from "express";
import { getCategories } from "../controllers/category/get-category.js";
import { createCategories } from "../controllers/category/create-category.js";
import { login } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";

const AuthRouter = Router();

AuthRouter.post("/login", login).post("/register", register);

export { AuthRouter };
