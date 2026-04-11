import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { FoodModel } from "../../database/schema/food.schema.js";

export const createFood: RequestHandler = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const price = Number(req.body.price);
    const image = req.body.image?.trim();
    const ingredients = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : String(req.body.ingredients ?? "")
          .split(",")
          .map((ingredient) => ingredient.trim())
          .filter(Boolean);
    const categoryIds: string[] = Array.isArray(req.body.categoryIds)
      ? req.body.categoryIds
      : [];

    if (!name || !Number.isFinite(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Food name and a valid price are required" });
    }

    if (ingredients.length === 0) {
      return res.status(400).json({ message: "Ingredients are required" });
    }

    const hasInvalidCategory = categoryIds.some(
      (categoryId) => !mongoose.Types.ObjectId.isValid(categoryId)
    );

    if (hasInvalidCategory) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    const normalizedCategoryIds = categoryIds.map(
      (categoryId) => new mongoose.Types.ObjectId(categoryId)
    );

    const food = await FoodModel.create({
      name,
      price,
      image,
      ingredients,
      categoryIds: normalizedCategoryIds,
    });

    return res.status(201).json(food);
  } catch (error) {
    console.error("Create food failed", error);
    return res.status(500).json({ message: "Unable to create food right now" });
  }
};
