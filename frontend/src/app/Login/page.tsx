"use client";

import { AnimatePresence } from "framer-motion";
import { CreateNewPassword } from "./_componentss/CreateNewPassword";
import { ForgotPass } from "./_componentss/ForgotPass";
import { LoginSection } from "./_componentss/LoginSection";
import { Verify } from "./_componentss/Verify";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContext } from "react";

type StepContextType = {
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
}

const initValue = {
  email: "",
  password: "",
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>(initValue);
  const [isReady, setIsReady] = useState(false);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.min(prev - 1, 1));
  };

  useEffect(() => {
    const saved = localStorage.getItem("data");
    const savedData = JSON.parse(saved ?? JSON.stringify(initValue));
    setData({
      ...savedData,
      datepicker: new Date(savedData.datepicker),
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) localStorage.setItem("data", JSON.stringify(data));
  }, [data, isReady]);

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
