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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  newpassword: z
    .string()
    .min(8, "Invalid email. Use a format like example@email.com."),
  confirmpassword: z.string().min(8, "Incorrect password. Please try again."),
});

export const CreateNewPassword = () => {
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
                <h1 className="font-semibold text-xl">Create new password</h1>
                <p className="text-gray-500">
                  Set a new password with a combination of letters and numbers
                  for better security.
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
