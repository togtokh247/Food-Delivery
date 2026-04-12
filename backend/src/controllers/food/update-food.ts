import type { RequestHandler } from "express";
import mongoose from "mongoose";
import { FoodModel } from "../../database/schema/food.schema.js";

const normalizeIngredients = (ingredients: unknown) => {
  if (Array.isArray(ingredients)) {
    return ingredients
      .map((ingredient) => String(ingredient).trim())
      .filter(Boolean);
  }

  return String(ingredients ?? "")
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
};

export const updateFood: RequestHandler = async (req, res) => {
  try {
    const { foodId } = req.params;

    if (!foodId || !mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "Invalid food selected" });
    }

    const name = req.body.name?.trim();
    const price = Number(req.body.price);
    const image = req.body.image?.trim();
    const ingredients = normalizeIngredients(req.body.ingredients);
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
      (categoryId) => !mongoose.Types.ObjectId.isValid(categoryId),
    );

    if (hasInvalidCategory) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    const normalizedCategoryIds = categoryIds.map(
      (categoryId) => new mongoose.Types.ObjectId(categoryId),
    );

    const food = await FoodModel.findByIdAndUpdate(
      foodId,
      {
        name,
        price,
        image,
        ingredients,
        categoryIds: normalizedCategoryIds,
      },
      { new: true, runValidators: true },
    ).populate("categoryIds", "name");

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json(food);
  } catch (error) {
    console.error("Update food failed", error);
    return res.status(500).json({ message: "Unable to update food right now" });
  }
};
