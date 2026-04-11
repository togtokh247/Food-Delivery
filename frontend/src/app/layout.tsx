import type { Metadata } from "next";
import { AppProviders } from "@/context/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Delivery",
  description: "Order fresh meals from local restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
