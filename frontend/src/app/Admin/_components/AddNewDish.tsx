"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type DishForm = {
  name: string;
  price: number;
  ingredients: string;
  image: File;
};

export const AddNewDish = () => {
  const form = useForm<DishForm>();
  const [preview, setPreview] = useState<string | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    form.setValue("image", file);
  };

  const onSubmit = (data: DishForm) => {
    console.log("Dish data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger >
        <button
          className="flex justify-center items-center text-white"
        >
          <Plus className="w-8 h-8" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[520px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add new Dish to Appetizers</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <Input
                        type="number"
                        placeholder="Enter price..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Food image</FormLabel>

              <label className="mt-2 block cursor-pointer">
                <div
                  className="h-[160px] border-2 border-dashed rounded-lg
                                flex flex-col items-center justify-center
                                text-gray-500 relative overflow-hidden"
                >
                  {!preview && (
                    <>
                      <ImageIcon className="w-6 h-6 mb-2" />
                      <p className="text-sm">
                        Choose a file or drag & drop it here
                      </p>
                    </>
                  )}

                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0"
                    onChange={onImageChange}
                  />

                  {preview && (
                    <img
                      src={preview}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              </label>
            </div>

            <div className="flex justify-end">
              <Button className="bg-black text-white px-6">Add Dish</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
