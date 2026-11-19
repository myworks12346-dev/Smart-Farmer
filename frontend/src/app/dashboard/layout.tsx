"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f7f9f6]">
      {/* Desktop Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-6">
        <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Mobile Fixed Navigation Bar */}
        <MobileNav />
      </div>
    </div>
  );
}
