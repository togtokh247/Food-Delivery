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

  const categorySections = categories.map((category) => ({
    category,
    foods: foods.filter((food) =>
      food.categoryIds?.some(
        (foodCategory) => foodCategory._id === category._id
      )
    ),
  }));

  const categorizedFoodIds = new Set(
    categorySections.flatMap((section) =>
      section.foods.map((food) => food._id)
    )
  );

  const uncategorizedFoods = foods.filter(
    (food) => !categorizedFoodIds.has(food._id)
  );

  const foodSections = [
    ...categorySections,
    ...(uncategorizedFoods.length > 0
      ? [
          {
            category: { _id: "uncategorized", name: "Uncategorized" },
            foods: uncategorizedFoods,
          },
        ]
      : []),
  ];

  return (
    <main className="flex-1 p-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-black">Categories</h2>
            <p className="text-sm text-gray-500">
              {categories.length} category{categories.length === 1 ? "" : "ies"}
            </p>
          </div>

          <CreateCategory onCreated={getCategories} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800"
              >
                {category.name}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No categories yet. Add your first category.
            </p>
          )}
        </div>
      </section>

      <Card className="mt-4 space-y-8 p-6 pt-8">
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-black">Food menu</h2>
              <p className="text-sm text-gray-500">
                Add dishes and review them by category.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="min-h-[220px]">
              <AddNewDish categories={categories} onCreated={getFoods} />
            </div>
          </div>
        </div>

        {foodSections.length > 0 ? (
          foodSections.map((section) => (
            <section key={section.category._id}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-lg font-semibold text-black">
                  {section.category.name}
                </h3>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {section.foods.length} dish
                  {section.foods.length === 1 ? "" : "es"}
                </span>
              </div>

              {section.foods.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {section.foods.map((food) => (
                    <FoodCard
                      key={`${section.category._id}-${food._id}`}
                      name={food.name}
                      price={food.price}
                      ingredients={formatIngredients(food.ingredients)}
                      image={food.image}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                  No dishes in this category yet.
                </div>
              )}
            </section>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
            No dishes yet. Add your first dish.
          </div>
        )}
      </Card>
    </main>
  );
};
