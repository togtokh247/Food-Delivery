import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/index.js";

export const getCategories: RequestHandler = async (_req, res) => {
  try {
    const categories = await CategoryModel.find({});

    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Get categories failed", error);
    return res
      .status(500)
      .json({ message: "Unable to load categories right now" });
  }
};
