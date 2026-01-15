"use client";

import { useContext, useState } from "react";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepContext, StepContextTyoe } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeftSquareIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 chars"),
});

export const LoginSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const stepContext = useContext(StepContext) as StepContextType;
  const { handleBack, setData, setStep } = stepContext;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setData((prev) => ({
      ...prev,
      email: values.email,
      password: values.password,
    }));
  };

  return (
    <div className="h-screen flex">
      <div className="flex justify-center items-center w-1/2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-[416px]"
          >
            <div
              onClick={handleBack}
              className="cursor-pointer w-9 h-9 text-gray-500 hover:text-black"
            >
              <ChevronLeftSquareIcon />
            </div>

            <h1 className="font-semibold text-xl">Login</h1>
            <p className="text-gray-500">
              Log in to enjoy your favorite dishes.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-password"
                  checked={showPassword}
                  onCheckedChange={(checked) =>
                    setShowPassword(checked === true)
                  }
                />
                <Label
                  htmlFor="show-password"
                  className="text-gray-500 text-sm cursor-pointer"
                >
                  Show password
                </Label>
              </div>

              <div>
                <Button type="button" variant="link" onClick={() => setStep(2)}>
                  Forgot password?
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-400"
            >
              Let's Go
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex justify-end items-center w-1/2 pr-5">
        <img
          src="/delivery.png"
          className="w-[950px] h-[750px] object-cover rounded-md"
        />
      </div>
    </div>
  );
};
