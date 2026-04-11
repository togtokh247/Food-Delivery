import type { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.js";

export const getFoods: RequestHandler = async (_req, res) => {
  try {
    const foods = await FoodModel.find({}).populate("categoryIds", "name");

    return res.status(200).json(foods);
  } catch (error) {
    console.error("Get foods failed", error);
    return res.status(500).json({ message: "Unable to load foods right now" });
  }
};
