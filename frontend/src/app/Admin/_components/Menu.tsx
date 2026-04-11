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
  ingredients: string[] | string;
  categoryIds: {
    _id: string;
    name: string;
  }[];
};

type Category = {
  _id: string;
  name: string;
};

type CategoryResponse = {
  categories: Category[];
};

const formatIngredients = (ingredients: Food["ingredients"]) => {
  return Array.isArray(ingredients) ? ingredients.join(", ") : ingredients;
};

export const Menu = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const [{ data: foodsData }, { data: categoriesData }] = await Promise.all([
        api.get<Food[]>("/foods"),
        api.get<CategoryResponse>("/categories"),
      ]);

      if (!isMounted) {
        return;
      }

      setFoods(foodsData);
      setCategories(categoriesData.categories);
    };

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getFoods = async () => {
    const { data } = await api.get<Food[]>("/foods");
    setFoods(data);
  };

  const getCategories = async () => {
    const { data } = await api.get<CategoryResponse>("/categories");
    setCategories(data.categories);
  };

  return (
    <main className="flex-1 p-8">
      <CreateCategory onCreated={getCategories} />
      <Card className="grid grid-cols-5 gap-4 p-6 pt-8 mt-4">
        <AddNewDish categories={categories} onCreated={getFoods} />

        {foods.map((food) => (
          <FoodCard
            key={food._id}
            name={food.name}
            price={food.price}
            ingredients={formatIngredients(food.ingredients)}
            image={food.image}
          />
        ))}
      </Card>
    </main>
  );
};
