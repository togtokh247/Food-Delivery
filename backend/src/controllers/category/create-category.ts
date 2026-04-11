import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/index.js";

export const createCategories: RequestHandler = async (req, res) => {
  try {
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await CategoryModel.create({ name });

    return res.status(200).json({ category });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return res.status(400).json({ message: "Category already exists" });
    }

    console.error("Create category failed", error);
    return res
      .status(500)
      .json({ message: "Unable to create category right now" });
  }
};
