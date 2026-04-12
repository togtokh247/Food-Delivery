"use client";

import { useRef, useState } from "react";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Trash2, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";

const uncategorizedValue = "uncategorized";

const foodFormSchema = z.object({
  name: z.string().min(2, {
    message: "Food name must be at least 2 characters.",
  }),
  price: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Price must be a valid positive number.",
    },
  ),
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  ingredients: z.string().min(5, {
    message: "Ingredients must be at least 5 characters.",
  }),
  categoryId: z.string().min(1, {
    message: "Please select a category.",
  }),
});

type FoodFormValues = z.infer<typeof foodFormSchema>;

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
  categoryIds?: Category[];
};

type FoodCardProps = {
  food: Food;
  categories: Category[];
  onChanged?: () => Promise<void> | void;
};

const formatIngredients = (ingredients: Food["ingredients"]) => {
  return Array.isArray(ingredients) ? ingredients.join(", ") : ingredients;
};

const getPrimaryCategoryId = (food: Food) => {
  return food.categoryIds?.[0]?._id ?? uncategorizedValue;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return fallback;
};

export function FoodCard({ food, categories, onChanged }: FoodCardProps) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(food.image);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = `food-image-${food._id}`;

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: food.name,
      price: String(food.price),
      ingredients: formatIngredients(food.ingredients),
      image: food.image,
      categoryId: getPrimaryCategoryId(food),
    },
  });

  const { isSubmitting } = form.formState;
  const isBusy = isUploading || isSubmitting || isDeleting;

  const resetForm = () => {
    form.reset({
      name: food.name,
      price: String(food.price),
      ingredients: formatIngredients(food.ingredients),
      image: food.image,
      categoryId: getPrimaryCategoryId(food),
    });
    setUploadedImageUrl(food.image);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isBusy) return;

    if (nextOpen) {
      resetForm();
    }

    setOpen(nextOpen);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!response.ok) {
        const uploadError = await response.json();
        setError(uploadError.details || uploadError.error || "Upload failed.");
        return;
      }

      const blob = await response.json();
      setUploadedImageUrl(blob.url);
      form.setValue("image", blob.url, { shouldValidate: true });
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImageUrl("");
    form.setValue("image", "", { shouldValidate: true });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: FoodFormValues) => {
    setError(null);

    try {
      await api.patch(`/foods/${food._id}`, {
        name: values.name.trim(),
        price: parseFloat(values.price),
        ingredients: values.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim())
          .filter(Boolean),
        image: values.image,
        categoryIds:
          values.categoryId === uncategorizedValue
            ? []
            : [values.categoryId],
      });

      setOpen(false);
      await onChanged?.();
    } catch (error) {
      setError(getErrorMessage(error, "Could not update this dish."));
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${food.name}"?`);

    if (!confirmed) return;

    setIsDeleting(true);
    setError(null);

    try {
      await api.delete(`/foods/${food._id}`);
      setOpen(false);
      await onChanged?.();
    } catch (error) {
      setError(getErrorMessage(error, "Could not delete this dish."));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-[160px] bg-gray-100">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />

          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-md"
              aria-label={`Edit ${food.name}`}
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
          </DialogTrigger>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm leading-tight flex-1">
              {food.name}
            </h4>
            <span className="text-sm font-semibold ml-2">
              ${food.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2">
            {formatIngredients(food.ingredients)}
          </p>
        </div>
      </Card>

      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Edit Dish</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type food name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={uncategorizedValue}>
                        Uncategorized
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Food image</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id={fileInputId}
                      />

                      {uploadedImageUrl ? (
                        <div className="relative overflow-hidden rounded-lg border-2 border-gray-300">
                          <img
                            src={uploadedImageUrl}
                            alt={food.name}
                            className="h-48 w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor={fileInputId}
                          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 transition-colors hover:border-gray-400"
                        >
                          <Upload className="mb-3 h-8 w-8 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {isUploading
                              ? "Uploading..."
                              : "Choose a file or drag & drop it here"}
                          </p>
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-3">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isBusy}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>

              <Button
                type="submit"
                disabled={isBusy}
                className="bg-black text-white hover:bg-black/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
