"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeftSquareIcon } from "lucide-react";

const formSchema = z
  .object({
    newpassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newpassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const CreatePass = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="h-screen bg-white">
      <div className="flex h-full">
        <div className="h-screen flex justify-center items-center w-1/2 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[416px] max-w-md"
            >
              <div className="text-gray-500 w-9 h-9">
                <ChevronLeftSquareIcon />
              </div>
              <div>
                <h1 className="font-semibold text-xl">
                  Create a strong password
                </h1>
                <p className="text-gray-500">
                  Create a strong password with letters, numbers.
                </p>
              </div>
              <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                style={{ backgroundColor: "gray", width: "100%" }}
              >
                Create password
              </Button>
              <div className="flex justify-center gap-2">
                <h1 className="text-gray-500">Already have an account?</h1>
                <h1 className="text-blue-500">Log in </h1>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex justify-end items-center h-screen w-1/2 pr-5">
          <img
            src="/delivery.png"
            className="w-[950px] h-[750px] object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
