"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { WeatherForecastDay } from "@/types";

interface TemperatureForecastChartProps {
  data: WeatherForecastDay[];
}

export function TemperatureForecastChart({ data }: TemperatureForecastChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl text-xs text-gray-400">
        Loading temperature trends...
      </div>
    );
  }

  const chartData = data.map((d) => ({
    name: d.day_name,
    date: d.date,
    MaxTemp: d.temp_max_c,
    MinTemp: d.temp_min_c,
    condition: d.condition,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="maxTempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#15803d" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#15803d" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="minTempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            unit="°C"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-lg text-xs">
                    <p className="font-bold text-gray-900 mb-1">{label} ({item.date})</p>
                    <p className="text-emerald-700 font-semibold">
                      Max: {item.MaxTemp}°C
                    </p>
                    <p className="text-sky-700 font-semibold">
                      Min: {item.MinTemp}°C
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
                {value === "MaxTemp" ? "Max Temp (°C)" : "Min Temp (°C)"}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="MaxTemp"
            stroke="#15803d"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#maxTempGrad)"
          />
          <Area
            type="monotone"
            dataKey="MinTemp"
            stroke="#0284c7"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#minTempGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
