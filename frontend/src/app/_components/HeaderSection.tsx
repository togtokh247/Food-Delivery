"use client";
import { HandPlatter } from "lucide-react";
import { useRouter } from "next/navigation";

import { Cards } from "./Cards";
import { FooterSection } from "./FooterSection";
import { Lunch } from "./Lunch";
import { Salad } from "./Salad";

export const HeaderSection = () => {
  const router = useRouter();

  return (
    <>
      <div className="h-16 bg-black flex items-center px-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <HandPlatter className="text-red-600 h-[46px] w-[38px]" />
            <div>
              <h1 className="text-2xl font-bold leading-none">
                <span className="text-white">NOM</span>
                <span className="text-red-500">NOM</span>
              </h1>
              <p className="text-white text-sm text-center">Swift delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div
              onClick={() => router.push("/SignUp")}
              className="w-[75px] h-[36px] rounded-xl bg-red-500 text-white flex items-center justify-center cursor-pointer hover:bg-red-700"
            >
              Sign Up
            </div>

            <div
              onClick={() => router.push("/Login")}
              className="w-[75px] h-[36px] rounded-xl bg-white text-black flex items-center justify-center cursor-pointer hover:bg-gray-300"
            >
              Log In
            </div>
          </div>
        </div>
      </div>

      <img
        src="/Image.png"
        className="w-screen h-[700px] object-cover"
        alt="Food"
      />

      <div className="bg-gray-500 min-h-screen px-20">
        <div className="pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Appetizers</h1>
        </div>
        <Cards />

        <div className="pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Salads</h1>
        </div>
        <Salad />

        <div className="pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Lunch favorites</h1>
        </div>
        <div className="pb-20">
          <Lunch />
        </div>
      </div>

      <FooterSection />
    </>
  );
};
