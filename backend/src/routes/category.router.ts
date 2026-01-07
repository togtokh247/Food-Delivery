import { Router } from "express";
import { getCategories } from "../controllers/category/get-category.js";
import { createCategories } from "../controllers/category/create-category.js";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories).post("/create", createCategories);

export { CategoryRouter };
