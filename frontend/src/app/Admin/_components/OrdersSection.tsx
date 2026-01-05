"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, ChevronsUpDown } from "lucide-react";
import { Order } from "./Order";

export const OrdersSection = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      {/* <div className="w-full h-11 flex justify-end items-center px-4">
        <img
          src="/rick.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          alt="avatar"
        />
      </div> */}

      <div className="bg-white m-10 p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div className="pl-4 pt-2">
            <h1 className="font-semibold text-lg text-black">Orders</h1>
            <div className="flex gap-1 text-sm text-gray-500">
              <span>1</span>
              <span>items</span>
            </div>
          </div>

          <div className="flex pt-2 gap-4">
            <div className="flex w-[300px] h-[36px] items-center rounded-md border border-gray-300 gap-2 px-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4" />
            </div>

            <div className="flex w-[220px] h-[36px] bg-gray-500 text-white items-center justify-center rounded-md cursor-pointer">
              Change delivery state
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-[40px_60px_220px_120px_120px_120px_1fr_140px]
             h-[52px] items-center px-4 border-b mt-6
             text-sm font-medium text-gray-600"
        >
          <Checkbox />
          <span>№</span>
          <span>Customer</span>
          <span>Food</span>
          <span>Date</span>
          <span>Total</span>
          <span>Delivery address</span>
          <div className="flex items-center gap-1">
            <span>Delivery state</span>
            <ChevronsUpDown className="w-4 h-4" />
          </div>
        </div>
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  );
};
