"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";

import { Plus } from "lucide-react";
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

const schema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters."),
});

type FormValues = z.infer<typeof schema>;

type Category = {
  _id: string;
  name: string;
};

type Props = {
  onCreated?: (category: Category) => void;
};

export const CreateCategory = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      const res = await api.post("/categories", { name: values.name.trim() });
      const created: Category = res.data?.category ?? res.data;
      onCreated?.(created);
      form.reset();
      setOpen(false);
    } catch (e) {
      console.error(e);
      alert("Create category failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-md">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type category name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-black text-white hover:bg-black/90"
                >
                  {saving ? "Creating..." : "Add category"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
