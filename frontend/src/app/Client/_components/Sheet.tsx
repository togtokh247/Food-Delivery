"use client";

import { useState } from "react";
import { ShoppingCart, ShoppingCartIcon, UserIcon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const SheetSection = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Sunshine Stackers",
      price: 12.99,
      quantity: 1,
      image: "/Food Image.png",
    },
    {
      id: 2,
      name: "Sunshine Stackers",
      price: 12.99,
      quantity: 1,
      image: "/Food Image.png",
    },
  ]);

  const increaseQty = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cartItems.length > 0 ? 0.99 : 0;
  const total = itemsTotal + shipping;

  return (
    <div className="flex items-center gap-3">
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetTrigger>
          <div className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <ShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </SheetTrigger>

        <SheetContent className="bg-gray-100">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCartIcon /> Order detail
            </SheetTitle>
            <SheetDescription>
              Review your order before checkout
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {cartItems.length === 0 && (
              <p className="text-center text-gray-500">
                Your cart is empty
              </p>
            )}

            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex gap-3 bg-white p-3 rounded-lg items-center"
              >
                <img
                  src={item.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-red-500 font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Fluffy pancakes stacked with fruits.
                  </p>

                  <div className="flex gap-2 mt-2 items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 mt-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="bg-white rounded-lg p-4 mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Items</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button className="w-full bg-red-500 text-white">
                Checkout
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <div className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer">
        <UserIcon />
      </div>
    </div>
  );
};
