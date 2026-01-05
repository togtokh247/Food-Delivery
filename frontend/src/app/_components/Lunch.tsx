"use client";

import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FoodDetail } from "./FoodDetail";

type Food = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

const foods: Food[] = [
  {
    id: 1,
    title: "Finger food",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/Food Image.png",
  },
  {
    id: 2,
    title: "Burger",
    price: 15.5,
    description:
      "Juicy beef burger with cheese, lettuce, tomato, and special sauce.",
    image: "/Food Image.png",
  },
  {
    id: 3,
    title: "Pizza",
    price: 18.99,
    description:
      "Classic cheese pizza with a crispy crust and rich tomato sauce.",
    image: "/Food Image.png",
  },
  {
    id: 4,
    title: "Pasta",
    price: 14.25,
    description:
      "Creamy pasta with mushrooms, parmesan cheese, and fresh herbs.",
    image: "/Food Image.png",
  },
];

export const Lunch = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {foods.map((food) => (
        <div
          key={food.id}
          className="bg-white rounded-lg p-4 space-y-3 shadow"
        >
          <div className="relative">
            <img
              src={food.image}
              alt={food.title}
              className="w-full h-[210px] rounded-lg object-cover"
            />

            <Popover>
              <PopoverTrigger asChild>
                <button className="absolute bottom-3 right-3 w-11 h-11 bg-white rounded-full flex justify-center items-center text-red-500 shadow hover:scale-105 transition">
                  <Plus />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-[320px] p-4">
                <FoodDetail food={food} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="text-red-500 text-lg font-semibold">
              {food.title}
            </h1>
            <h1 className="text-black text-lg font-semibold">
              ${food.price.toFixed(2)}
            </h1>
          </div>

          <p className="text-sm text-gray-700 line-clamp-2">
            {food.description}
          </p>
        </div>
      ))}
    </div>
  );
};
