"use client";

import { Card } from "@/components/ui/card";
import { AddNewDish } from "./AddNewDish";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { FoodCard } from "./FoodCard";
import { CreateCategory } from "./CreateCategory";

type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  categoryIds: {
    _id: string;
    name: string;
  }[];
};

export const Menu = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<Food[]>("/foods");
      setFoods(data);
    };

    getData();
  }, []);

  return (
    <main className="flex-1 p-8">
      <CreateCategory />
      <Card className="grid grid-cols-5 gap-4 p-6 pt-8 mt-4">
        <AddNewDish />

        {foods.map((food) => (
          <FoodCard
            key={food._id}
            id={food._id}
            name={food.name}
            price={food.price}
            ingredients={food.ingredients}
            image={food.image}
          />
        ))}
      </Card>
    </main>
  );
};
