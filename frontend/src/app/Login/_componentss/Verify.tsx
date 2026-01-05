"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftSquareIcon } from "lucide-react";
import { useContext } from "react";
import { StepContext } from "../page";


export const Verify = () => {
  const { handleBack, handleNext, data } = useContext(StepContext);

  return (
    <div className="h-screen bg-white">
      <div className="flex h-full">
        <div className="flex flex-col justify-center w-1/2 px-16 gap-6">
          <div className="w-[416px] space-y-6">
            <Button
              variant="ghost"
              className="p-0 w-fit"
              onClick={handleBack}
            >
              <ChevronLeftSquareIcon className="w-9 h-9 text-gray-500" />
            </Button>

            <div className="space-y-2">
              <h1 className="font-semibold text-xl">
                Please verify your email
              </h1>
              <p className="text-gray-500">
                We just sent an email to{" "}
                <span className="font-medium">{data?.email}</span>.  
                Click the link in the email to verify your account.
              </p>
            </div>

            <Button
              className="w-full"
              onClick={handleNext}
            >
              I have verified
            </Button>
          </div>
        </div>

        <div className="flex justify-end items-center w-1/2 pr-5">
          <img
            src="/delivery.png"
            alt="delivery"
            className="w-[950px] h-[750px] object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
