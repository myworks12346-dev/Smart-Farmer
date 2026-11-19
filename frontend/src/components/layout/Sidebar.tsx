"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Sprout,
  CloudSun,
  ShieldAlert,
  TrendingUp,
  Bell,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Farms", href: "/dashboard/farms", icon: MapPin },
  { name: "Crop Management", href: "/dashboard/crops", icon: Sprout },
  { name: "Weather Intelligence", href: "/dashboard/weather", icon: CloudSun },
  { name: "Crop Risk & Advisories", href: "/dashboard/advisories", icon: ShieldAlert, badge: 2 },
  { name: "Mandi Prices", href: "/dashboard/market", icon: TrendingUp },
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell, badge: "New" },
  { name: "Profile & Settings", href: "/dashboard/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { farmerMetadata, signOut, isDemoMode } = useAuth();

  const farmerName = farmerMetadata?.full_name || "Farmer";
  const initials = farmerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#e5e9e4] h-screen sticky top-0 shrink-0 z-30">
      {/* Brand Header */}
      <div className="h-18 flex items-center px-6 border-b border-[#f1f4f1] justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#0f4a2c] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-[#4ade80]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#0f4a2c] flex items-center gap-1">
              Smart<span className="text-[#16a34a]">Farmer</span>
            </span>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-[#7b8d83]">
              Agri-Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation List */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#7b8d83] mb-2">
          Agricultural Hub
        </p>
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
              className={cn(
                "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-[#ecfdf5] text-[#15803d] font-semibold shadow-2xs border border-[#bbf7d0]"
                  : "text-[#526359] hover:bg-[#f7f9f6] hover:text-[#19261f]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-[#15803d]" : "text-[#7b8d83] group-hover:text-[#19261f]"
                  )}
                />
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    typeof item.badge === "number"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-emerald-100 text-emerald-800"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Development Mode Notice */}
      <div className="px-4 py-3 mx-3 mb-3 bg-[#f7f9f6] rounded-xl border border-[#e5e9e4]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#15803d]">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{isDemoMode ? "Demo Mode Active" : "Supabase Auth Active"}</span>
        </div>
        <p className="text-[11px] text-[#7b8d83] mt-1">
          {isDemoMode
            ? "Configure NEXT_PUBLIC_SUPABASE_URL in .env.local for live auth."
            : "Authenticated via Supabase SSR."}
        </p>
      </div>

      {/* User Profile Bar at bottom */}
      <div className="p-3 border-t border-[#f1f4f1]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-9 h-9 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {initials}
            </div>
            <div className="text-left truncate">
              <p className="text-xs font-bold text-gray-900 leading-tight truncate">
                {farmerName}
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                Lang: {farmerMetadata?.preferred_language?.toUpperCase() || "EN"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
