"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Food = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

type Props = {
  food: Food;
};

export const FoodDetail = ({ food }: Props) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <div>
        <img
          src={food.image}
          alt={food.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <h1 className="text-lg font-semibold">{food.title}</h1>

      <p className="text-sm text-gray-500">{food.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 border rounded-full flex items-center justify-center"
          >
            <Minus size={16} />
          </button>

          <span className="font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 border rounded-full flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>

        <span className="font-semibold">
          ${(food.price * quantity).toFixed(2)}
        </span>
      </div>

      <button
        onClick={() => {
          console.log("Added to cart:", food, quantity);
        }}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Add to cart
      </button>
    </div>
  );
};
