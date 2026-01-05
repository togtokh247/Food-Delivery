"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const OrderSidebar = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Sheet>
      <SheetTrigger>
        <Button>Open Order</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            🛒 Order detail
          </SheetTitle>
          <SheetDescription>
            Review your order before checkout.
          </SheetDescription>
        </SheetHeader>

        {/* Cart */}
        <div className="mt-4">
          <div className="flex gap-3 mb-3">
            <img
              src="/Food Image.png"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-red-500 font-semibold">Sunshine Stackers</h3>
              <p className="text-xs text-gray-600">
                Fluffy pancakes stacked with fruits.
              </p>
              <div className="flex gap-3 mt-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <p className="font-semibold">$12.99</p>
          </div>

          {/* Total */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Items</span>
              <span>${(12.99 * quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span>$0.99</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-semibold mb-3">
              <span>Total</span>
              <span>${(12.99 * quantity + 0.99).toFixed(2)}</span>
            </div>

            <Button className="w-full bg-red-500 text-white">Checkout</Button>
          </div>
        </div>

        {/* Close button */}
        <button className="absolute top-4 right-4" onClick={() => {}}>
          <X />
        </button>
      </SheetContent>
    </Sheet>
  );
};
