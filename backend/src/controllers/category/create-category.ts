import type { RequestHandler } from "express";
import { CategoryModel } from "../../database/schema/index.js";

export const createCategories: RequestHandler = async (req, res) => {
  const body = req.body;

  const category = await CategoryModel.create({
    name: body.name,
  });

  return res.status(200).json({ category });
};
