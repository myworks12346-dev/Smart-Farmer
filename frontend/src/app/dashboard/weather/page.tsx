"use client";

import React, { useState } from "react";
import {
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Clock,
  ShieldAlert,
  Sun,
  Compass,
  RefreshCw,
  Info,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WeatherSummaryCard } from "@/components/dashboard/WeatherSummaryCard";
import { TemperatureForecastChart } from "@/components/weather/TemperatureForecastChart";
import { RainfallForecastChart } from "@/components/weather/RainfallForecastChart";
import { HistoricalWeatherChart } from "@/components/weather/HistoricalWeatherChart";
import { useFarm } from "@/context/FarmContext";
import {
  MOCK_DASHBOARD_RESPONSE,
  MOCK_UPCOMING_FORECAST,
  MOCK_HISTORICAL_WEATHER,
} from "@/mock/data";
import { formatDate } from "@/lib/utils";

export default function WeatherPage() {
  const { selectedFarm } = useFarm();
  const [activeTab, setActiveTab] = useState<"forecast" | "rainfall" | "historical">("forecast");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Source Citation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">
              Weather Intelligence & Agro-Meteorology
            </h1>
            <Badge variant="success" className="text-[10px]">
              IMD Station Active
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
            <span className="font-semibold text-gray-800">
              {selectedFarm.name} ({selectedFarm.district}, {selectedFarm.state})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              Source: <strong>IMD Agromet Advisory Service</strong>
            </span>
            <span>•</span>
            <span className="text-[11px] text-gray-400">Synced Today at 10:00 AM</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          icon={<RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />}
        >
          <span>Refresh Observations</span>
        </Button>
      </div>

      {/* Atmospheric Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-3 text-center bg-white hoverEffect">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-1.5">
            <Thermometer className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">Temperature</p>
          <h4 className="text-lg font-black text-gray-900 mt-0.5">26°C</h4>
          <span className="text-[10px] text-gray-400">H: 29° · L: 19°</span>
        </Card>

        <Card className="p-3 text-center bg-white hoverEffect">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-1.5">
            <Droplets className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">Humidity</p>
          <h4 className="text-lg font-black text-gray-900 mt-0.5">75%</h4>
          <span className="text-[10px] text-emerald-700 font-semibold">Elevated</span>
        </Card>

        <Card className="p-3 text-center bg-white hoverEffect">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-1.5">
            <CloudRain className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">Rainfall</p>
          <h4 className="text-lg font-black text-gray-900 mt-0.5">14 mm</h4>
          <span className="text-[10px] text-rose-600 font-semibold">Heavy Window</span>
        </Card>

        <Card className="p-3 text-center bg-white hoverEffect">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-1.5">
            <CloudSun className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">Rain Chance</p>
          <h4 className="text-lg font-black text-gray-900 mt-0.5">75%</h4>
          <span className="text-[10px] text-gray-400">Thunderstorms</span>
        </Card>

        <Card className="p-3 text-center bg-white hoverEffect">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-1.5">
            <Wind className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">Wind Speed</p>
          <h4 className="text-lg font-black text-gray-900 mt-0.5">12 km/h</h4>
          <span className="text-[10px] text-gray-400">SSE Breeze</span>
        </Card>

        <Card className="p-3 text-center bg-white hoverEffect">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-1.5">
            <Sun className="w-4 h-4" />
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">Sunlight</p>
          <h4 className="text-lg font-black text-gray-900 mt-0.5">8.4 hrs</h4>
          <span className="text-[10px] text-gray-400">Moderate Solar</span>
        </Card>
      </div>

      {/* Chart Navigation Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("forecast")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === "forecast"
              ? "bg-[#15803d] text-white shadow-2xs"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
        >
          📈 5-Day Temperature Forecast
        </button>
        <button
          onClick={() => setActiveTab("rainfall")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === "rainfall"
              ? "bg-[#15803d] text-white shadow-2xs"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
        >
          🌧️ Rainfall & Precipitation Chances
        </button>
        <button
          onClick={() => setActiveTab("historical")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${activeTab === "historical"
              ? "bg-[#15803d] text-white shadow-2xs"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
        >
          📊 Past 7 Days Historical Trend
        </button>
      </div>

      {/* Active Chart Display */}
      <Card className="p-5">
        <CardHeader className="pb-2">
          <div>
            <CardTitle className="text-base text-gray-900">
              {activeTab === "forecast" && "5-Day High / Low Temperature Forecast (°C)"}
              {activeTab === "rainfall" && "Expected Rainfall Volume (mm) vs. Probability (%)"}
              {activeTab === "historical" && "Past 7-Day Atmospheric Observations & Precipitation"}
            </CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeTab === "forecast" && "Forecast models project temperatures stabilizing into the weekend with clearing skies"}
              {activeTab === "rainfall" && "Peak precipitation window concentrated in the next 24 to 36 hours"}
              {activeTab === "historical" && "Cumulative rain over the past week totaled 68.2 mm"}
            </p>
          </div>
          <span className="text-[11px] text-gray-400">IMD Gridded Dataset</span>
        </CardHeader>

        <div className="mt-3">
          {activeTab === "forecast" && <TemperatureForecastChart data={MOCK_UPCOMING_FORECAST} />}
          {activeTab === "rainfall" && <RainfallForecastChart data={MOCK_UPCOMING_FORECAST} />}
          {activeTab === "historical" && <HistoricalWeatherChart data={MOCK_HISTORICAL_WEATHER} />}
        </div>
      </Card>

      {/* 5-Day Day-by-Day Forecast Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-gray-900">
            <Calendar className="w-5 h-5 text-[#15803d]" />
            <span>5-Day Phenological Risk Breakdown</span>
          </CardTitle>
          <span className="text-xs text-gray-400">Evaluated against Flowering Paddy</span>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3">Day / Date</th>
                <th className="py-2.5 px-3">Condition</th>
                <th className="py-2.5 px-3">Temp (Max / Min)</th>
                <th className="py-2.5 px-3">Expected Rain</th>
                <th className="py-2.5 px-3">Rain Chance</th>
                <th className="py-2.5 px-3">Crop Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {MOCK_UPCOMING_FORECAST.map((day, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-3">
                    <strong className="text-gray-900 block">{day.day_name}</strong>
                    <span className="text-[10px] text-gray-400">{day.date}</span>
                  </td>
                  <td className="py-3 px-3 font-medium">{day.condition}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    {day.temp_max_c}°C / {day.temp_min_c}°C
                  </td>
                  <td className="py-3 px-3">
                    <span className={day.rainfall_expected_mm > 10 ? "text-rose-600 font-bold" : "text-gray-700"}>
                      {day.rainfall_expected_mm} mm
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-sky-700">
                    {day.rainfall_probability}%
                  </td>
                  <td className="py-3 px-3">
                    <Badge severity={day.risk_level} className="uppercase font-bold text-[10px]">
                      {day.risk_level}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Official Agromet Notice */}
      <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Agromet Advisory Disclaimer:</strong> Weather forecasts are generated via the India Meteorological Department (IMD) Agromet Advisory Service and national numerical weather models. Always calibrate field irrigation and spraying with local ground moisture.
        </div>
      </div>
    </div>
  );
}
