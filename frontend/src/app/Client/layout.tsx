"use client";
import { SheetSection } from "./_components/Sheet";

import {
  ChevronRight,
  FacebookIcon,
  HandPlatter,
  InstagramIcon,
  MapPin,
} from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="h-16 bg-black flex items-center px-8">
        <div className="flex items-center gap-3 w-full justify-between">
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
            <div className="ml-10 flex items-center w-[320px] h-10 bg-white rounded-md px-3 gap-2 cursor-pointer">
              <MapPin className="text-red-500 w-4 h-4" />
              <p className="text-red-500 text-sm">Delivery address:</p>
              <span className="text-sm text-gray-400 flex items-center gap-1">
                Add Location <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <SheetSection />
          </div>
        </div>
      </div>

      <main>{children}</main>

      <div className="h-[755px] bg-black">
        <div className="pt-20" />

        <div className="bg-red-500 flex items-center h-[92px] justify-center overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex gap-12 font-semibold text-2xl text-white">
            <h1>Fresh fast delivered</h1>
            <h1>Fresh fast delivered</h1>
            <h1>Fresh fast delivered</h1>
            <h1>Fresh fast delivered</h1>
          </div>
        </div>

        <div className="bg-black">
          <div className="h-full flex flex-wrap gap-20 pt-20 justify-around">
            <div className="text-center">
              <HandPlatter className="text-red-600 h-[60px] w-[70px] mx-auto" />
              <h1 className="text-2xl font-bold leading-none">
                <span className="text-white">NOM</span>
                <span className="text-red-500">NOM</span>
              </h1>
              <p className="text-white">Swift delivery</p>
            </div>

            <div>
              <h1 className="text-gray-500 text-xl">NOMNOM</h1>
              <div className="text-white pt-10 space-y-6">
                <p>Home</p>
                <p>Contact Us</p>
                <p>Delivery zone</p>
              </div>
            </div>

            <div>
              <h1 className="text-gray-500 text-xl">Menu</h1>
              <div className="text-white pt-10 space-y-6">
                <p>Appetizers</p>
                <p>Salads</p>
                <p>Pizzas</p>
                <p>Main dishes</p>
                <p>Desserts</p>
              </div>
            </div>

            <div className="text-white pt-16 space-y-6">
              <p>Side dish</p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
              <p>Fish & Sea foods</p>
            </div>

            <div>
              <h1 className="text-gray-500 text-xl">Follow Us</h1>
              <div className="text-white pt-10 gap-4 flex">
                <FacebookIcon />
                <InstagramIcon />
              </div>
            </div>
          </div>

          <div className="pl-20 pt-20">
            <div className="border-t border-gray-700 w-[1300px]" />
            <div className="flex flex-wrap pt-6 gap-10">
              <p className="text-gray-500">Copyright 2024 © Nomnom LLC</p>
              <p className="text-gray-500">Privacy policy</p>
              <p className="text-gray-500">Terms and condition</p>
              <p className="text-gray-500">Cookie policy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
