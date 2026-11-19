"use client";

import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { WeatherForecastDay } from "@/types";

interface RainfallForecastChartProps {
  data: WeatherForecastDay[];
}

export function RainfallForecastChart({ data }: RainfallForecastChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl text-xs text-gray-400">
        Loading rainfall predictions...
      </div>
    );
  }

  const chartData = data.map((d) => ({
    name: d.day_name,
    rainfall_mm: d.rainfall_expected_mm,
    probability: d.rainfall_probability,
    condition: d.condition,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            yAxisId="left"
            unit=" mm"
            tick={{ fontSize: 11, fill: "#0369a1" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            unit="%"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "#15803d" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-lg text-xs">
                    <p className="font-bold text-gray-900 mb-1">{label}</p>
                    <p className="text-sky-700 font-semibold">
                      Rain Expected: {item.rainfall_mm} mm
                    </p>
                    <p className="text-emerald-700 font-semibold">
                      Rain Probability: {item.probability}%
                    </p>
                    <p className="text-gray-500 text-[10px] mt-1 italic">
                      {item.condition}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-xs text-gray-600 font-medium">
                {value === "rainfall_mm" ? "Expected Rain (mm)" : "Rain Probability (%)"}
              </span>
            )}
          />
          <Bar
            yAxisId="left"
            dataKey="rainfall_mm"
            fill="#38bdf8"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="probability"
            stroke="#15803d"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#15803d" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
