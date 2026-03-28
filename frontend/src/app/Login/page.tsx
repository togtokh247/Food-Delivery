"use client";

import { AnimatePresence } from "framer-motion";
import { CreateNewPassword } from "./_componentss/CreateNewPassword";
import { ForgotPass } from "./_componentss/ForgotPass";
import { LoginSection } from "./_componentss/LoginSection";
import { Verify } from "./_componentss/Verify";
import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

export type StepContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  handleNext: () => void;
  handleBack: () => void;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType
);

export type Data = {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const initValue = {
  email: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>(initValue);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <StepContext.Provider
      value={{ step, setStep, data, setData, handleNext, handleBack }}
    >
      <div className="h-screen w-screen flex justify-center items-center ">
        <AnimatePresence>{step == 1 && <LoginSection />}</AnimatePresence>
        <AnimatePresence>{step == 2 && <ForgotPass />}</AnimatePresence>
        <AnimatePresence>{step == 3 && <Verify />}</AnimatePresence>
        <AnimatePresence>{step == 4 && <CreateNewPassword />}</AnimatePresence>
      </div>
    </StepContext.Provider>
  );
}
