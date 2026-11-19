

import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { FarmProvider } from "@/context/FarmContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Farmer — Crop-Stage Weather Intelligence & Mandi Prices",
  description:
    "A location-aware, crop-stage-based weather intelligence and agricultural market information platform for farmers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <FarmProvider>{children}</FarmProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
