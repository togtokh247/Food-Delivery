"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    router.push("/Login");
  }

  return (
    <div className="h-screen bg-white">
      <div className="flex h-full">
        <div className="flex justify-center items-center w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[416px]"
            >
              <ChevronLeftSquareIcon
                onClick={() => router.back()}
                className="w-9 h-9 text-gray-500 cursor-pointer hover:text-black transition"
              />

              <div>
                <h1 className="font-semibold text-xl">
                  Create a strong password
                </h1>
                <p className="text-gray-500">
                  Use at least 8 characters with letters and numbers.
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
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gray-500"
                disabled={!form.formState.isValid}
              >
                Create password
              </Button>

              <div className="flex justify-center gap-2 text-sm">
                <span className="text-gray-500">Already have an account?</span>
                <span
                  onClick={() => router.push("/Login")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Log in
                </span>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex justify-end items-center w-1/2 pr-5">
          <img
            src="/delivery.png"
            alt="Delivery"
            className="w-[950px] h-[750px] object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
