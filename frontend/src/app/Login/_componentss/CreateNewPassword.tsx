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
import { useContext, useState } from "react";
import { StepContext, StepContextType } from "../page";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const CreateNewPassword = () => {
  const { data, setData, setStep } = useContext(StepContext) as StepContextType;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: data.newPassword || "",
      confirmPassword: data.confirmPassword || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setError("");
      setSuccess("");

      await api.post("/auth/reset-password", {
        email: data.email,
        password: values.newPassword,
      });

      setData((prev) => ({
        ...prev,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }));

      setSuccess("Password updated. Please login with your new password.");
      setTimeout(() => setStep(1), 900);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "Could not reset password.");
    }
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
                onClick={() => setStep(3)}
              >
                <ChevronLeftSquareIcon />
              </button>
              <div>
                <h1 className="font-semibold text-xl">Create new password</h1>
                <p className="text-gray-500">
                  Set a new password with letters and numbers.
                </p>
              </div>
              <FormField
                control={form.control}
                name="newPassword"
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
                name="confirmPassword"
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

              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              {success ? <p className="text-sm text-green-600">{success}</p> : null}

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Create password"}
              </Button>
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
