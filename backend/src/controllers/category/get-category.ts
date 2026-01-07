import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/index.js";

export const getCategories: RequestHandler = async (req, res) => {
  const categories = await CategoryModel.find({});

  return res.status(200).json({ categories });
};
