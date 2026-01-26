"use client";


import { FoodDetail } from "@/app/_components/FoodDetail";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pen } from "lucide-react";

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
    id: 1,
    title: "Finger food",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/Food Image.png",
  },
  {
    id: 1,
    title: "Finger food",
    price: 12.99,
    description:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
    image: "/Food Image.png",
  },
  
];

export const Salads = () => {
  return (
    <div className="h-[330px] flex gap-6 justify-end">
      {foods.map((food, i) => (
        <div
          key={food.id + i}
          className="w-[270px] h-[241px] bg-white rounded-lg p-4 space-y-3 border border-gray-300 shadow-lg"
        >
          <div className="relative">
            <img
              src={food.image}
              className="w-[238px] h-[110px] rounded-lg object-cover"
              alt={food.title}
            />

            <Popover>
              <PopoverTrigger >
                <div className="absolute bottom-3 right-3 w-11 h-11 bg-white rounded-full flex justify-center items-center text-red-500 cursor-pointer shadow">
                  <Pen />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-[300px] ">
                <FoodDetail food={food} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="text-red-500 text-lg font-semibold">{food.title}</h1>
            <h1 className="text-black text-lg font-semibold">${food.price}</h1>
          </div>

          <p className="text-sm text-gray-700 line-clamp-2">
            {food.description}
          </p>
        </div>
      ))}
    </div>
  );
};
