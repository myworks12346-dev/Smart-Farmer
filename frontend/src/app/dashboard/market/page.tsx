"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Store,
  Filter,
  Calendar,
  Info,
  Search,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  Scale,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MandiComparisonChart } from "@/components/market/MandiComparisonChart";
import { MOCK_MARKET_PRICES } from "@/mock/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MarketPage() {
  const [selectedCommodity, setSelectedCommodity] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const commodities = [
    "all",
    "Paddy (Dhan) - Common",
    "Paddy (Dhan) - Fine",
    "Tomato - Hybrid",
    "Maize (Corn)",
  ];

  const districts = [
    "all",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Mandya",
    "Kolar",
    "Tumakuru",
    "Chikkaballapura",
    "Davanagere",
    "Haveri",
  ];

  const filteredPrices = MOCK_MARKET_PRICES.filter((p) => {
    const matchesCommodity =
      selectedCommodity === "all" || p.commodity === selectedCommodity;
    const matchesDistrict =
      selectedDistrict === "all" || p.district === selectedDistrict;
    const matchesSearch =
      searchQuery === "" ||
      p.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mandi_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCommodity && matchesDistrict && matchesSearch;
  });

  // Calculate highest paying mandi from filtered selection
  const highestPricedMandi =
    filteredPrices.length > 0
      ? [...filteredPrices].sort((a, b) => b.modal_price - a.modal_price)[0]
      : null;

  return (
    <div className="space-y-6">
      {/* Top Header & Official Bulletin Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">
              Agricultural Commodity & Mandi Prices
            </h1>
            <Badge variant="success" className="text-[10px]">
              Agmarknet Daily Feed
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Official APMC daily market bulletins. Compare rates across nearby agricultural markets before dispatching crops.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-amber-900 shadow-2xs">
          <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Bulletin: <strong>18 Nov 2026</strong> (Daily Publication)</span>
        </div>
      </div>

      {/* 4 Market KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 hoverEffect">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Benchmark Modal Rate</p>
          <h4 className="text-xl font-black text-gray-900 mt-1">
            {formatCurrency(filteredPrices[0]?.modal_price || 2280)}
          </h4>
          <p className="text-[11px] text-gray-500 mt-0.5">Per Quintal (100 kg)</p>
        </Card>

        <Card className="p-4 hoverEffect bg-emerald-50/40 border-emerald-200">
          <p className="text-[10px] text-emerald-800 font-bold uppercase">Top Paying Market</p>
          <h4 className="text-lg font-black text-emerald-950 mt-1 truncate">
            {highestPricedMandi ? highestPricedMandi.mandi_name.split(" ")[0] : "Mandya"} APMC
          </h4>
          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
            {highestPricedMandi ? formatCurrency(highestPricedMandi.modal_price) : "₹2,380"} /Qtl
          </p>
        </Card>

        <Card className="p-4 hoverEffect">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Active Mandis Listed</p>
          <h4 className="text-xl font-black text-gray-900 mt-1">
            {filteredPrices.length} Markets
          </h4>
          <p className="text-[11px] text-gray-500 mt-0.5">Across Karnataka Districts</p>
        </Card>

        <Card className="p-4 hoverEffect">
          <p className="text-[10px] text-gray-400 font-bold uppercase">Price Trend</p>
          <div className="flex items-center gap-1.5 mt-1">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h4 className="text-xl font-black text-emerald-700">+1.8%</h4>
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5">Week-on-Week Movement</p>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Commodity Dropdown */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-gray-400" /> Commodity:
            </span>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            >
              {commodities.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Commodities" : c}
                </option>
              ))}
            </select>

            {/* District Dropdown */}
            <span className="text-xs font-bold text-gray-600 ml-2">District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === "all" ? "All Districts" : d}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search commodity or mandi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
            />
          </div>
        </div>
      </div>

      {/* Comparison Chart Section */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-base text-gray-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#15803d]" />
              <span>Nearby Mandi Price Comparison (Modal vs. Min vs. Max)</span>
            </CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              Visualizes rate differentials across markets to help farmers select the best mandi
            </p>
          </div>
          <span className="text-xs text-gray-400">Unit: ₹ / Quintal</span>
        </CardHeader>

        <div className="mt-2">
          {filteredPrices.length > 0 ? (
            <MandiComparisonChart data={filteredPrices.slice(0, 6)} />
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-gray-400">
              No price data available for the chosen filters.
            </div>
          )}
        </div>
      </Card>

      {/* Detailed Market Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-[#15803d]" />
            <span>Mandi Rates Bulletin</span>
          </CardTitle>
          <span className="text-xs text-gray-400">{filteredPrices.length} Records</span>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3">Commodity</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Mandi / Market Yard</th>
                <th className="py-2.5 px-3">Modal Rate</th>
                <th className="py-2.5 px-3">Price Range (Min - Max)</th>
                <th className="py-2.5 px-3">Trend</th>
                <th className="py-2.5 px-3">Reported On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {filteredPrices.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <strong className="text-gray-900 block font-bold">{row.commodity}</strong>
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-600">{row.district}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-gray-800">{row.mandi_name}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-sm font-black text-emerald-800">
                      {formatCurrency(row.modal_price)}
                    </span>
                    <span className="text-[10px] text-gray-400 block font-medium">
                      /{row.unit}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-500">
                    ₹{row.min_price} – ₹{row.max_price}
                  </td>
                  <td className="py-3 px-3">
                    {row.trend === "up" ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                        <TrendingUp className="w-3.5 h-3.5" /> +{row.change_percentage}%
                      </span>
                    ) : row.trend === "down" ? (
                      <span className="text-rose-600 font-bold flex items-center gap-0.5">
                        <TrendingDown className="w-3.5 h-3.5" /> {row.change_percentage}%
                      </span>
                    ) : (
                      <span className="text-gray-500 font-medium">Stable</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-gray-500 font-medium">
                    {formatDate(row.reporting_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transparency & Disclaimer Card */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Daily Publishing Transparency Notice:</strong> Market prices are compiled once daily following the official auction close at designated Agricultural Produce Market Committees (APMCs) and synchronized via Agmarknet. Rates are not continuously real-time. Always verify the prevailing day rate at your local mandi before dispatching farm consignments.
        </div>
      </div>
    </div>
  );
}
