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
import { HistoricalWeatherPoint } from "@/types";

interface HistoricalWeatherChartProps {
  data: HistoricalWeatherPoint[];
}

export function HistoricalWeatherChart({ data }: HistoricalWeatherChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl text-xs text-gray-400">
        Loading historical observations...
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            yAxisId="rain"
            unit=" mm"
            tick={{ fontSize: 11, fill: "#0369a1" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            yAxisId="temp"
            orientation="right"
            unit="°C"
            domain={[15, 35]}
            tick={{ fontSize: 11, fill: "#15803d" }}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as HistoricalWeatherPoint;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-lg text-xs">
                    <p className="font-bold text-gray-900 mb-1">Date: {label}</p>
                    <p className="text-sky-700 font-semibold">
                      Rainfall: {item.rainfall_mm} mm
                    </p>
                    <p className="text-emerald-700 font-semibold">
                      Avg Temp: {item.temp_avg_c}°C
                    </p>
                    <p className="text-gray-600 font-semibold">
                      Humidity: {item.humidity_avg}%
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
                {value === "rainfall_mm"
                  ? "Recorded Rain (mm)"
                  : value === "temp_avg_c"
                  ? "Avg Temp (°C)"
                  : "Avg Humidity (%)"}
              </span>
            )}
          />
          <Bar
            yAxisId="rain"
            dataKey="rainfall_mm"
            fill="#7dd3fc"
            radius={[6, 6, 0, 0]}
            maxBarSize={35}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temp_avg_c"
            stroke="#15803d"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#15803d" }}
          />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="humidity_avg"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
