"use client";

import { useState } from "react";
import { HandPlatter, LayoutDashboard, Truck } from "lucide-react";
import Link from "next/link";
import { Menu } from "./_components/Menu";
import { OrdersSection } from "./_components/OrdersSection";

type Step = "food" | "order";

export default function RootLayout() {
  const [step, setStep] = useState<Step>("food");

  return (
    <div className="flex h-screen">
      <div className="w-[205px] bg-white border-r px-4 py-6">
        <Link href="/" className="flex items-center gap-3">
          <HandPlatter className="text-red-600 h-[50px] w-[50px]" />
          <div>
            <h1 className="text-2xl font-bold leading-none">
              <span className="text-black">NOM</span>
              <span className="text-black">NOM</span>
            </h1>
            <p className="text-gray-500 text-sm">Swift delivery</p>
          </div>
        </Link>

        <div className="space-y-4 pt-4">
          <div
            onClick={() => setStep("food")}
            className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer
              ${step === "food" ? "bg-black text-white font-semibold" : "hover:bg-gray-100"}
            `}
          >
            <LayoutDashboard className="w-5 h-5" />
            Food menu
          </div>

          <div
            onClick={() => setStep("order")}
            className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer
              ${step === "order" ? "bg-black text-white font-semibold" : "hover:bg-gray-100"}
            `}
          >
            <Truck className="w-6 h-6" />
            Orders
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="w-full h-11 flex justify-end items-center px-4 bg-gray-300">
          <img
            src="/rick.jpeg"
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
        </div>

        <main className="flex-1 overflow-auto bg-gray-300">
          {step === "food" && <Menu />}
          {step === "order" && <OrdersSection />}
        </main>
      </div>
    </div>
  );
}
