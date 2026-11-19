"use client";

import React from "react";
import {
  Layers,
  Sprout,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  Scale,
  Sun,
  Activity,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RiskSeverity } from "@/types";

interface QuickStatsProps {
  activeFieldsCount?: number;
  cropsCount?: number;
  soilMoistureAvg?: number;
  riskLevel?: RiskSeverity;
  estimatedYieldTons?: number;
}

export function QuickStats({
  activeFieldsCount = 2,
  cropsCount = 3,
  soilMoistureAvg = 68,
  riskLevel = "high",
  estimatedYieldTons = 46.8,
}: QuickStatsProps) {
  const stats = [
    {
      title: "Total Active Fields",
      value: `${activeFieldsCount} Registered`,
      subtitle: "10.5 Acres Total",
      icon: Layers,
      color: "text-emerald-700 bg-emerald-50",
    },
    {
      title: "Crops Monitored",
      value: `${cropsCount} Active`,
      subtitle: "Paddy, Tomato, Maize",
      icon: Sprout,
      color: "text-green-700 bg-green-50",
    },
    {
      title: "Soil Moisture Avg",
      value: `${soilMoistureAvg}%`,
      subtitle: "Adequate Saturation",
      icon: Droplets,
      color: "text-sky-700 bg-sky-50",
    },
    {
      title: "Weather Risk Level",
      value: riskLevel === "high" ? "High Risk" : riskLevel === "moderate" ? "Moderate" : "Low Risk",
      subtitle: "Flowering Stage Sensitive",
      icon: riskLevel === "high" ? ShieldAlert : ShieldCheck,
      color: riskLevel === "high" ? "text-rose-700 bg-rose-50" : "text-emerald-700 bg-emerald-50",
      badge: riskLevel.toUpperCase(),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="p-4 flex flex-col justify-between hoverEffect">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              {stat.badge && (
                <Badge severity={riskLevel}>{stat.badge}</Badge>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 truncate">{stat.title}</p>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mt-0.5 tracking-tight">
                {stat.value}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">{stat.subtitle}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
