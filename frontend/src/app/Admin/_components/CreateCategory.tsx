"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { api } from "@/lib/axios";

import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = {
  _id: string;
  name: string;
};

type ApiResponse = {
  category: Category;
};

type Props = {
  onCreated?: (category: Category) => void;
};

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
});

type FormValues = z.infer<typeof schema>;

// ─── API ──────────────────────────────────────────────────────────────────────

async function createCategory(name: string): Promise<Category> {
  const res = await api.post<ApiResponse>("/categories/create", { name });
  return res.data.category;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CreateCategory = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const category = await createCategory(values.name.trim());
      onCreated?.(category);
      form.reset();
      setOpen(false);
    } catch (err) {
      const message = isAxiosError(err)
        ? (err.response?.data?.message ?? "Failed to create category.")
        : "An unexpected error occurred.";
      setError(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white"
          aria-label="Add new category"
        >
          <Plus className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type category name..."
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-black/90 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Add category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
