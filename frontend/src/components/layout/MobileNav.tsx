"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CloudSun,
  ShieldAlert,
  TrendingUp,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Weather", href: "/dashboard/weather", icon: CloudSun },
  { name: "Advisories", href: "/dashboard/advisories", icon: ShieldAlert, badge: true },
  { name: "Market", href: "/dashboard/market", icon: TrendingUp },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 z-40 flex items-center justify-around shadow-lg">
      {MOBILE_NAV_ITEMS.map((item) => {
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
              "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative",
              isActive ? "text-[#15803d]" : "text-gray-500 hover:text-gray-900"
            )}
          >
            <div className="relative">
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </div>
            <span
              className={cn(
                "text-[10px] mt-1 font-medium",
                isActive ? "font-bold text-[#15803d]" : "text-gray-600"
              )}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
