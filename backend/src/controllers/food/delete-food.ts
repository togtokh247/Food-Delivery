import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { FoodModel } from "../../database/schema/food.schema.js";

export const deleteFood: RequestHandler = async (req, res) => {
  try {
    const { foodId } = req.params;

    if (!foodId || !mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "Invalid food selected" });
    }

    const food = await FoodModel.findByIdAndDelete(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json({ message: "Food deleted" });
  } catch (error) {
    console.error("Delete food failed", error);
    return res.status(500).json({ message: "Unable to delete food right now" });
  }
};
