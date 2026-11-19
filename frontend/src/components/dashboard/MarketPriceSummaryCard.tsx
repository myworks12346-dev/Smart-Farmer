"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Store,
  ArrowRight,
  Info,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { MarketPrice } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface MarketPriceSummaryCardProps {
  prices: MarketPrice[];
}

export function MarketPriceSummaryCard({ prices }: MarketPriceSummaryCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="pb-2">
          <div>
            <CardTitle className="text-base text-gray-900">
              <TrendingUp className="w-5 h-5 text-[#15803d]" />
              <span>Nearby Mandi Commodity Prices</span>
            </CardTitle>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
              <Info className="w-3.5 h-3.5 text-gray-400" />
              <span>
                Official Daily APMC Mandi Bulletin · Source: <strong>Agmarknet / State APMC</strong>
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/market"
            className="text-xs font-semibold text-[#15803d] hover:underline flex items-center gap-1"
          >
            <span>Compare Mandis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </CardHeader>

        {/* Market Price Rows */}
        <div className="divide-y divide-gray-100 my-2">
          {prices.slice(0, 3).map((item) => {
            const isUp = item.trend === "up";
            const isDown = item.trend === "down";

            return (
              <div
                key={item.id}
                className="py-3 flex items-center justify-between hover:bg-gray-50/70 px-2 rounded-xl transition-colors"
              >
                <div>
                  <h5 className="font-bold text-gray-900 text-xs md:text-sm">
                    {item.commodity}
                  </h5>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                    <Store className="w-3 h-3 text-gray-400" />
                    <span>{item.mandi_name}</span>
                    <span>·</span>
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>Reported {formatDate(item.reporting_date)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-sm md:text-base font-black text-gray-900">
                      {formatCurrency(item.modal_price)}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      /{item.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[11px]">
                    {isUp ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        +{item.change_percentage}%
                      </span>
                    ) : isDown ? (
                      <span className="text-rose-600 font-semibold flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" />
                        {item.change_percentage}%
                      </span>
                    ) : (
                      <span className="text-gray-500 font-medium flex items-center gap-0.5">
                        <Minus className="w-3 h-3" />
                        Stable
                      </span>
                    )}
                    <span className="text-gray-400 text-[10px]">
                      (Range: ₹{item.min_price} - ₹{item.max_price})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Market rates are published on market business days. Always verify with your local market committee before dispatching produce.
          </span>
        </div>
      </div>
    </Card>
  );
}
