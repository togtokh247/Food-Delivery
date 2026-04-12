import { Router } from "express";
import { createFood } from "../controllers/food/create-food.js";
import { deleteFood } from "../controllers/food/delete-food.js";
import { getFoods } from "../controllers/food/get-foods.js";
import { updateFood } from "../controllers/food/update-food.js";

const FoodRouter = Router();

FoodRouter.get("/", getFoods)
  .post("/create", createFood)
  .patch("/:foodId", updateFood)
  .delete("/:foodId", deleteFood);

export { FoodRouter };
