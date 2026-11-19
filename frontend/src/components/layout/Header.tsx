"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Plus,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Sprout,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MOCK_FARMS } from "@/mock/data";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export function Header({ onToggleMobileMenu }: HeaderProps) {
  const [selectedFarm, setSelectedFarm] = useState(MOCK_FARMS[0]);
  const [isFarmDropdownOpen, setIsFarmDropdownOpen] = useState(false);

  return (
    <header className="h-18 bg-white border-b border-[#e5e9e4] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & Farm Selector / Greeting */}
      <div className="flex items-center gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setIsFarmDropdownOpen(!isFarmDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white text-xs md:text-sm font-semibold text-gray-800 transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#15803d]" />
            <span className="truncate max-w-[140px] md:max-w-[200px]">
              {selectedFarm.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {isFarmDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-lg p-2 z-50">
              <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Switch Farm
              </p>
              {MOCK_FARMS.map((farm) => (
                <button
                  key={farm.id}
                  onClick={() => {
                    setSelectedFarm(farm);
                    setIsFarmDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col transition-colors ${
                    farm.id === selectedFarm.id
                      ? "bg-emerald-50 text-emerald-900 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-semibold">{farm.name}</span>
                  <span className="text-[11px] text-gray-500">
                    {farm.district}, {farm.state} ({farm.land_area} {farm.area_unit})
                  </span>
                </button>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <Link
                  href="/onboarding"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#15803d] hover:bg-emerald-50 rounded-xl"
                  onClick={() => setIsFarmDropdownOpen(false)}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register New Farm</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Quick search bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search crops, advisories, weather or mandi prices..."
            className="w-full bg-[#f7f9f6] border border-[#e5e9e4] rounded-xl pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Alerts / Notification bell with badge */}
        <Link
          href="/dashboard/alerts"
          className="relative p-2.5 text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          title="Weather Risk Alerts"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
        </Link>

        {/* Add Field / Add Crop CTA */}
        <Link href="/onboarding">
          <Button size="sm" icon={<Plus className="w-4 h-4" />}>
            <span className="hidden sm:inline">Add Field</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
