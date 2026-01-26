"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Order = () => {
  return (
    <div
      className="grid grid-cols-[40px_60px_220px_120px_120px_120px_1fr_140px] 
                    items-center h-[56px] px-4 border-b text-sm text-gray-700"
    >
      <Checkbox />

      <div>1</div>

      <div className="truncate">Test@gmail.com</div>

      <Popover>

        <PopoverTrigger >
            <div className="flex items-center gap-1">

         
          <p>2 foods</p>
          <ChevronDown className="w-4 h-4" />
           </div>
        </PopoverTrigger>
        <PopoverContent className="w-[230px] flex justify-between text-center">
            <div className="flex gap-2 text-center ">
              <img src="/food.png" className="w-8 h-8 object-cover" />
              <div>Finger food</div>
            </div>
            <div>x1</div>
          </PopoverContent> 
      </Popover>

      <div>2024/12/20</div>

      <div className="font-medium">$26.97</div>

      <div className="truncate">
        2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen
      </div>

      <button
        className={`h-[32px] px-4 rounded-full border flex items-center justify-center gap-1`}
      >
        Pending
        <ChevronsUpDown className="w-4 h-4" />
      </button>
    </div>
  );
};
