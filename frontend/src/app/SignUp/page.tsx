"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { CreatePass } from "./_components/CreatePass";
import { SignUp1 } from "./_components/SignUp1";

export type SignUpData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpStepContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  data: SignUpData;
  setData: Dispatch<SetStateAction<SignUpData>>;
};

export const SignUpStepContext = createContext({} as SignUpStepContextType);

const initialData: SignUpData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SignUpData>(initialData);

  return (
    <SignUpStepContext.Provider value={{ step, setStep, data, setData }}>
      {step === 1 ? <SignUp1 /> : <CreatePass />}
    </SignUpStepContext.Provider>
  );
}
