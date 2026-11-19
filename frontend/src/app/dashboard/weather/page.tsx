"use client";

import React from "react";
import { CloudSun, CloudRain, Wind, Droplets, Thermometer, Clock, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { WeatherSummaryCard } from "@/components/dashboard/WeatherSummaryCard";
import { MOCK_DASHBOARD_RESPONSE, MOCK_HISTORICAL_WEATHER } from "@/mock/data";

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Weather Intelligence</h1>
          <p className="text-xs text-gray-500 mt-1">
            Current conditions, 5-day forecasts, and historical agro-meteorological patterns
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-xl border border-gray-200">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>Source: <strong>IMD Agromet Service</strong></span>
        </div>
      </div>

      <WeatherSummaryCard
        weather={MOCK_DASHBOARD_RESPONSE.weather}
        forecast={MOCK_DASHBOARD_RESPONSE.upcoming_forecast}
      />

      {/* Historical Weather Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-900">
            <Clock className="w-5 h-5 text-emerald-700" />
            <span>Past 7 Days Weather Observations</span>
          </CardTitle>
          <span className="text-xs text-gray-400">Bengaluru Rural Station</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Avg Temperature</th>
                <th className="py-2.5 px-3">Rainfall (mm)</th>
                <th className="py-2.5 px-3">Relative Humidity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {MOCK_HISTORICAL_WEATHER.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-semibold text-gray-900">{row.date}</td>
                  <td className="py-2.5 px-3">{row.temp_avg_c}°C</td>
                  <td className="py-2.5 px-3">
                    <span className={row.rainfall_mm > 10 ? "text-rose-600 font-bold" : "text-gray-700"}>
                      {row.rainfall_mm} mm
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{row.humidity_avg}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
