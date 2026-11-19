"use client";

import React, { useState } from "react";
import { TrendingUp, Store, Filter, Calendar, Info, Search } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { MarketPriceSummaryCard } from "@/components/dashboard/MarketPriceSummaryCard";
import { MOCK_MARKET_PRICES } from "@/mock/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MarketPage() {
  const [searchCommodity, setSearchCommodity] = useState("");

  const filteredPrices = MOCK_MARKET_PRICES.filter((p) =>
    p.commodity.toLowerCase().includes(searchCommodity.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Agricultural Market & Mandi Prices</h1>
          <p className="text-xs text-gray-500 mt-1">
            Official daily bulletin from APMC mandis. Daily reporting date provided for transparency.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Filter commodity (e.g. Paddy)..."
            value={searchCommodity}
            onChange={(e) => setSearchCommodity(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-gray-900">
                <Store className="w-5 h-5 text-emerald-700" />
                <span>Mandi Rates Overview</span>
              </CardTitle>
              <span className="text-xs text-gray-400">Agmarknet Verified</span>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold">
                    <th className="py-2.5 px-3">Commodity</th>
                    <th className="py-2.5 px-3">Mandi</th>
                    <th className="py-2.5 px-3">Modal Price</th>
                    <th className="py-2.5 px-3">Min / Max</th>
                    <th className="py-2.5 px-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  {filteredPrices.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="py-3 px-3 font-bold text-gray-900">{row.commodity}</td>
                      <td className="py-3 px-3">{row.mandi_name}</td>
                      <td className="py-3 px-3 font-bold text-emerald-700 text-sm">
                        {formatCurrency(row.modal_price)} <span className="text-[10px] font-normal text-gray-400">/{row.unit}</span>
                      </td>
                      <td className="py-3 px-3 text-gray-500">₹{row.min_price} - ₹{row.max_price}</td>
                      <td className="py-3 px-3 text-gray-400">{formatDate(row.reporting_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-emerald-900 text-white">
            <h4 className="font-bold text-sm mb-2 text-emerald-200">Price Reporting Notice</h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Agmarknet rates are recorded once daily during auction sessions at agricultural produce market committees (APMC). These rates serve as indicative pricing references.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
