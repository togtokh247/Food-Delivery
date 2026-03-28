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
import { useContext } from "react";
import { SignUpStepContext, SignUpStepContextType } from "../page";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z
    .string()
    .email("Invalid email. Use a format like example@email.com."),
});

export const SignUp1 = () => {
  const router = useRouter();
  const { data, setData, setStep } = useContext(
    SignUpStepContext
  ) as SignUpStepContextType;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data.username || "",
      email: data.email || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setData((prev) => ({
      ...prev,
      username: values.username,
      email: values.email,
    }));
    setStep(2);
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
              <button
                type="button"
                className="text-gray-500 w-9 h-9"
                onClick={() => router.push("/")}
              >
                <ChevronLeftSquareIcon />
              </button>
              <div>
                <h1 className="font-semibold text-xl">Create your account</h1>
                <p className="text-gray-500">
                  Sign up to explore your favorite dishes.
                </p>
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue
              </Button>
              <div className="flex justify-center gap-2">
                <h1 className="text-gray-500">Already have an account?</h1>
                <button
                  type="button"
                  onClick={() => router.push("/Login")}
                  className="text-blue-500"
                >
                  Log in
                </button>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex justify-end items-center h-screen w-1/2 pr-5">
          <img
            src="/delivery.png"
            className="w-[950px] h-[750px] object-cover rounded-md"
            alt="delivery"
          />
        </div>
      </div>
    </div>
  );
};
