"use client";

import { Plus } from "lucide-react";
import { AddNewDish } from "./AddNewDish";
import { Salads } from "./Salad";

const categories = [
  { id: "1", name: "All Dishes", count: 19 },
  { id: "2", name: "Breakfast", count: 2 },
  { id: "3", name: "Lunch", count: 1 },
  { id: "4", name: "Dinner", count: 8 },
  { id: "5", name: "Dessert", count: 4 },
  { id: "6", name: "Drinks", count: 4 },
];

export const Menu = () => {
  return (
    <>
      <div className="w-full h-[176px] flex justify-center pt-10">
        <div className="w-290 h-full bg-white rounded-lg space-y-4 px-4 pt-4 border border-gray-300">
          <h1 className="font-semibold text-xl">Dishes category</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`h-7 px-3 rounded-xl flex items-center gap-2 cursor-pointer border border-gray-300`}
              >
                <span className="text-sm">{category.name}</span>
                <span className={`px-2 rounded-lg text-xs bg-black text-white`}>
                  {category.count}
                </span>
              </div>
            ))}
            <div className="w-7 h-7 flex justify-center items-center bg-red-500 text-white rounded-full">
              <Plus />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-10">
        <div className="w-290 bg-white rounded-lg space-y-4 px-4 pt-4">
          <h1 className="font-semibold text-xl">Salad</h1>
          <div className="flex gap-3">
            <div className="w-[270px] h-[241px] bg-white border border-dashed border-red-500 rounded-lg flex items-center justify-center flex-col">
              <div className="rounded-full bg-red-500 w-10 h-10 flex items-center justify-center text-center">
                <AddNewDish />
              </div>
              <div>
                <h1>Add new dishes to Salad</h1>
              </div>
            </div>
            <Salads />
          </div>
        </div>
      </div>
    </>
  );
};
