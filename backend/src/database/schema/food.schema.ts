import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    image: { type: String, required: false },
    categoryIds: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const FoodModel = model("Food", foodSchema);
