"use client";

import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./cart-context";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
