"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/lib/axios";
import { FoodDetail } from "./FoodDetail";

type Category = {
  _id: string;
  name: string;
};

type Food = {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients: string[] | string;
  categoryIds: Category[];
};

type CategoryResponse = {
  categories: Category[];
};

const normalizeDescription = (ingredients: Food["ingredients"]) => {
  if (Array.isArray(ingredients)) {
    return ingredients.join(", ");
  }

  return ingredients;
};

const toFoodDetail = (food: Food) => ({
  id: food._id,
  title: food.name,
  price: food.price,
  description: normalizeDescription(food.ingredients),
  image: food.image,
});

export const FoodSections = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [{ data: categoryData }, { data: foodData }] = await Promise.all([
          api.get<CategoryResponse>("/categories"),
          api.get<Food[]>("/foods"),
        ]);

        if (!isMounted) return;
        setCategories(categoryData.categories);
        setFoods(foodData);
      } catch {
        if (!isMounted) return;
        setError("Could not load menu. Please make sure the backend is running.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const sections = categories
    .map((category) => ({
      category,
      foods: foods.filter((food) =>
        food.categoryIds?.some((foodCategory) => foodCategory._id === category._id)
      ),
    }))
    .filter((section) => section.foods.length > 0);

  const uncategorizedFoods = foods.filter(
    (food) => !food.categoryIds || food.categoryIds.length === 0
  );

  if (uncategorizedFoods.length > 0) {
    sections.push({
      category: { _id: "uncategorized", name: "Other dishes" },
      foods: uncategorizedFoods,
    });
  }

  if (isLoading) {
    return (
      <div className="pt-20 text-center text-white">Loading menu...</div>
    );
  }

  if (error) {
    return <div className="pt-20 text-center text-white">{error}</div>;
  }

  if (sections.length === 0) {
    return (
      <div className="pt-20 text-center text-white">
        No dishes yet. Add dishes from the admin page.
      </div>
    );
  }

  return (
    <>
      {sections.map((section) => (
        <div key={section.category._id}>
          <div className="pt-20 pb-5">
            <h1 className="text-2xl font-semibold text-white">
              {section.category.name}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {section.foods.map((food) => {
              const detailFood = toFoodDetail(food);

              return (
                <div
                  key={food._id}
                  className="bg-white rounded-lg p-4 space-y-3 shadow-sm hover:shadow-md transition"
                >
                  <div className="relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-[210px] rounded-lg object-cover"
                    />

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="absolute bottom-3 right-3 w-11 h-11 bg-white rounded-full flex justify-center items-center text-red-500 shadow hover:scale-105 transition">
                          <Plus />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[320px] p-4">
                        <FoodDetail food={detailFood} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <h1 className="text-red-500 text-lg font-semibold">
                      {food.name}
                    </h1>
                    <h1 className="text-black text-lg font-semibold">
                      ${food.price.toFixed(2)}
                    </h1>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">
                    {normalizeDescription(food.ingredients)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};
