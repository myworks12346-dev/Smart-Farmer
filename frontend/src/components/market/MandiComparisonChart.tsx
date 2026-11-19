"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MarketPrice } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface MandiComparisonChartProps {
  data: MarketPrice[];
  commodityTitle?: string;
}

export function MandiComparisonChart({ data, commodityTitle }: MandiComparisonChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50/50 rounded-xl text-xs text-gray-400">
        Loading mandi price comparisons...
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.mandi_name.replace(" APMC", "").replace(" (Asia's 2nd Largest)", ""),
    fullName: item.mandi_name,
    minPrice: item.min_price,
    modalPrice: item.modal_price,
    maxPrice: item.max_price,
    commodity: item.commodity,
    unit: item.unit,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#374151" }}
            axisLine={{ stroke: "#e5e7eb" }}
            interval={0}
            angle={-10}
            textAnchor="end"
          />
          <YAxis
            domain={["dataMin - 200", "dataMax + 200"]}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(val) => `₹${val}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-lg text-xs space-y-1">
                    <p className="font-bold text-gray-900 border-b pb-1">
                      {item.fullName}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {item.commodity}
                    </p>
                    <div className="pt-1">
                      <p className="text-emerald-700 font-bold text-sm">
                        Modal: {formatCurrency(item.modalPrice)} /{item.unit}
                      </p>
                      <p className="text-gray-500 text-[11px]">
                        Min: {formatCurrency(item.minPrice)} · Max: {formatCurrency(item.maxPrice)}
                      </p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              if (value === "modalPrice") return <strong className="text-xs text-emerald-800">Modal (Prevailing) Rate</strong>;
              if (value === "minPrice") return <span className="text-xs text-sky-700">Min Rate</span>;
              return <span className="text-xs text-amber-700">Max Rate</span>;
            }}
          />
          <Bar
            dataKey="minPrice"
            fill="#7dd3fc"
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
          />
          <Bar
            dataKey="modalPrice"
            fill="#15803d"
            radius={[4, 4, 0, 0]}
            maxBarSize={35}
          />
          <Bar
            dataKey="maxPrice"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
