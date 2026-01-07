import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
  },
  { timestamps: true }
);

export const FoodModel = model(`Food`, foodSchema);
