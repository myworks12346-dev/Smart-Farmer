"use client";

import React from "react";
import Link from "next/link";
import {
  CloudRain,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudLightning,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CurrentWeather, WeatherForecastDay } from "@/types";
import { formatDate } from "@/lib/utils";

interface WeatherSummaryCardProps {
  weather: CurrentWeather;
  forecast?: WeatherForecastDay[];
}

export function WeatherSummaryCard({ weather, forecast }: WeatherSummaryCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="pb-2">
          <div>
            <CardTitle className="text-base text-gray-900">
              <CloudRain className="w-5 h-5 text-[#15803d]" />
              <span>Farm Weather Intelligence</span>
            </CardTitle>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>
                Source: <strong className="text-gray-700">{weather.source}</strong> · Synced {formatDate(weather.updated_at)}
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/weather"
            className="text-xs font-semibold text-[#15803d] hover:underline flex items-center gap-1"
          >
            <span>Historical & 5-Day</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </CardHeader>

        {/* Live Weather Highlight Hero Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0f4a2c] via-[#145e38] to-[#166534] text-white my-3 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                Live Field Atmospheric
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl md:text-5xl font-black tracking-tight">
                  {weather.temperature_c}°C
                </span>
                <span className="text-xs text-emerald-200">
                  H: {weather.temp_max_c ?? 29}° · L: {weather.temp_min_c ?? 19}°
                </span>
              </div>
              <p className="text-sm font-semibold text-emerald-100 mt-1">
                {weather.condition}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <CloudLightning className="w-10 h-10 text-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* 4-Metric Weather Grid */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15 text-center text-xs">
            <div>
              <span className="text-emerald-200 block text-[10px]">Humidity</span>
              <strong className="text-sm text-white">{weather.humidity}%</strong>
            </div>
            <div>
              <span className="text-emerald-200 block text-[10px]">Rainfall</span>
              <strong className="text-sm text-white">{weather.rainfall_mm} mm</strong>
            </div>
            <div>
              <span className="text-emerald-200 block text-[10px]">Rain Chance</span>
              <strong className="text-sm text-white">{weather.rain_probability ?? 75}%</strong>
            </div>
            <div>
              <span className="text-emerald-200 block text-[10px]">Wind Speed</span>
              <strong className="text-sm text-white">{weather.wind_speed_kmh ?? 12} km/h</strong>
            </div>
          </div>
        </div>

        {/* 3-day micro forecast strip */}
        {forecast && forecast.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Next 3 Days Forecast
              </p>
              <span className="text-[11px] text-gray-400">Risk Assessment</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {forecast.slice(0, 3).map((day, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 flex flex-col items-center text-center text-xs transition-colors hover:bg-gray-100/70"
                >
                  <span className="font-bold text-gray-800">{day.day_name}</span>
                  <span className="text-sm font-bold text-gray-900 my-1">
                    {day.temp_max_c}° / {day.temp_min_c}°
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-sky-700">
                    <CloudRain className="w-3 h-3" />
                    <span>{day.rainfall_probability}%</span>
                  </div>
                  <div className="mt-1.5">
                    <Badge severity={day.risk_level} className="text-[9px] px-1.5 py-0 uppercase">
                      {day.risk_level}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
