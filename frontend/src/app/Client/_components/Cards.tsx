"use client";

import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FoodDetail } from "@/app/_components/FoodDetail";

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
    title: "Finger food",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/Food Image.png",
  },
  {
    id: 3,
    title: "Finger food",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/Food Image.png",
  },
  {
    id: 4,
    title: "Finger food",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/Food Image.png",
  },
];

export const FoodCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {foods.map((food) => (
        <div
          key={food.id}
          className="w-[398px] h-[342px] bg-white rounded-lg p-4 space-y-3"
        >
          <div className="relative">
            <img
              src={food.image}
              className="w-full h-[210px] rounded-lg object-cover"
              alt={food.title}
            />

            <Popover>
              <PopoverTrigger>
                <div className="absolute bottom-3 right-3 w-11 h-11 bg-white rounded-full flex justify-center items-center text-red-500 cursor-pointer shadow">
                  <Plus />
                </div>
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
              ${food.price}
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
