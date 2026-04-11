"use client";

import { useState } from "react";
import { ShoppingCart, ShoppingCartIcon, UserIcon, X } from "lucide-react";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useCart } from "@/context/cart-context";

export const SheetSection = () => {
  const router = useRouter();
  const {
    cartItems,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartOpen,
    removeFromCart,
    setIsCartOpen,
    updateQuantity,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState("");

  const increaseQty = (id: string | number, quantity: number) => {
    updateQuantity(id, quantity + 1);
  };

  const decreaseQty = (id: string | number, quantity: number) => {
    updateQuantity(id, quantity - 1);
  };

  const itemsTotal = getTotalPrice();
  const shipping = cartItems.length > 0 ? 0.99 : 0;
  const total = itemsTotal + shipping;

  const handleCheckout = async () => {
    setCheckoutError("");
    setCheckoutSuccess("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setCheckoutError("Please log in before checkout.");
      router.push("/Login");
      return;
    }

    const hasUnsavedFood = cartItems.some((item) => typeof item.id !== "string");
    if (hasUnsavedFood) {
      setCheckoutError("Only saved menu items can be checked out.");
      return;
    }

    setIsCheckingOut(true);
    try {
      await api.post(
        "/orders",
        {
          items: cartItems.map((item) => ({
            foodId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );

      clearCart();
      setCheckoutSuccess("Order placed successfully.");
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? (error.response?.data?.message ?? "Checkout failed.")
        : "Checkout failed.";
      setCheckoutError(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger>
          <div className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer">
            <ShoppingCart />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalItems()}
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
            {checkoutSuccess ? (
              <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                {checkoutSuccess}
              </p>
            ) : null}

            {checkoutError ? (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {checkoutError}
              </p>
            ) : null}

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
                  alt={item.name}
                />

                <div className="flex-1">
                  <h3 className="text-red-500 font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {item.description}
                  </p>

                  <div className="flex gap-2 mt-2 items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseQty(item.id, item.quantity)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseQty(item.id, item.quantity)}
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
                    onClick={() => removeFromCart(item.id)}
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

              <Button
                className="w-full bg-red-500 text-white"
                disabled={isCheckingOut}
                onClick={handleCheckout}
              >
                {isCheckingOut ? "Checking out..." : "Checkout"}
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
