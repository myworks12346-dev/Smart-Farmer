"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Sprout,
  LayoutDashboard,
  MapPin,
  CloudSun,
  ShieldAlert,
  TrendingUp,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Farms", href: "/dashboard/farms", icon: MapPin },
  { name: "Crop Management", href: "/dashboard/crops", icon: Sprout },
  { name: "Weather Intelligence", href: "/dashboard/weather", icon: CloudSun },
  { name: "Crop Risk & Advisories", href: "/dashboard/advisories", icon: ShieldAlert, badge: 2 },
  { name: "Mandi Prices", href: "/dashboard/market", icon: TrendingUp },
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell, badge: "New" },
  { name: "Profile & Settings", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { farmerMetadata, signOut } = useAuth();

  return (
    <div className="min-h-screen flex bg-[#f7f9f6]">
      {/* Desktop Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-6">
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Mobile Fixed Navigation Bar */}
        <MobileNav />
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0f4a2c] flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5 text-[#4ade80]" />
                </div>
                <span className="font-bold text-gray-900 text-sm">
                  Smart<span className="text-[#16a34a]">Farmer</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                      isActive
                        ? "bg-[#ecfdf5] text-[#15803d] border border-[#bbf7d0]"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Drawer Footer User Info */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-8 h-8 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {farmerMetadata?.full_name?.slice(0, 2).toUpperCase() || "RK"}
                  </div>
                  <div className="truncate text-left">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {farmerMetadata?.full_name || "Rakib Kowshar"}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Lang: {farmerMetadata?.preferred_language?.toUpperCase() || "EN"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
