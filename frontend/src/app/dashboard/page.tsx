"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { WeatherSummaryCard } from "@/components/dashboard/WeatherSummaryCard";
import { CropStageCard } from "@/components/dashboard/CropStageCard";
import { RiskAlertCard } from "@/components/dashboard/RiskAlertCard";
import { MarketPriceSummaryCard } from "@/components/dashboard/MarketPriceSummaryCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { apiClient } from "@/lib/api/client";
import { DashboardResponse, CropGrowthStage } from "@/types";
import { MOCK_DASHBOARD_RESPONSE } from "@/mock/data";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { farmerMetadata, accessToken, isDemoMode } = useAuth();
  const [data, setData] = useState<DashboardResponse>(MOCK_DASHBOARD_RESPONSE);
  const [isMock, setIsMock] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");
  const [currentDateStr, setCurrentDateStr] = useState<string>("");

  const farmerFirstName = farmerMetadata?.full_name?.split(" ")[0] || "Farmer";

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getDashboard(data.farm.id, accessToken || undefined);
      setData(res.data);
      setIsMock(res.isMock);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } finally {
      setLoading(false);
    }
  };

  const handleStageChange = async (newStage: CropGrowthStage) => {
    // Optimistic UI update
    setData((prev) => ({
      ...prev,
      crop: { ...prev.crop, stage: newStage },
    }));

    await apiClient.updateCropStage("crop_001", newStage, accessToken || undefined);
  };

  useEffect(() => {
    setCurrentDateStr(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Context Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0f4a2c] tracking-tight">
              Namaste, {farmerFirstName} 👋
            </h1>
            {isMock ? (
              <Badge variant="neutral" className="text-[10px] bg-amber-50 text-amber-800 border-amber-200">
                Dev Preview (FastAPI Mock)
              </Badge>
            ) : (
              <Badge variant="success" className="text-[10px]">
                Live Backend Connected
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
            <span className="flex items-center gap-1 font-medium text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-[#15803d]" />
              {data.farm.name} · {data.farm.district}, {data.farm.state}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {currentDateStr || "Today"}
            </span>
            <span>•</span>
            <span className="text-[11px] text-gray-400">Synced {lastRefreshed}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={loadDashboardData}
            disabled={loading}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}
          >
            <span>Refresh</span>
          </Button>

          <Link href="/dashboard/crops">
            <Button
              variant="secondary"
              size="sm"
              icon={<PlusCircle className="w-3.5 h-3.5" />}
            >
              <span>Add Crop</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 Key Metric Stat Cards */}
      <QuickStats
        activeFieldsCount={2}
        cropsCount={1}
        soilMoistureAvg={data.weather.humidity}
        riskLevel={data.risks[0]?.severity ?? "low"}
        estimatedYieldTons={46.8}
      />

      {/* Primary Crop Risk & Advisory Banner */}
      <RiskAlertCard risks={data.risks} />

      {/* 2-Column Responsive Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Farm Weather Intelligence */}
        <div className="space-y-6">
          <WeatherSummaryCard
            weather={data.weather}
            forecast={data.upcoming_forecast}
          />
        </div>

        {/* Right Column: Crop Stage Progress & Nearby Mandi Market Prices */}
        <div className="space-y-6">
          <CropStageCard
            crop={data.crop}
            onStageChange={handleStageChange}
          />

          <MarketPriceSummaryCard prices={data.market_prices} />
        </div>
      </div>
    </div>
  );
}
