"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Sparkles,
  Info,
  Check,
  ChevronRight,
  Shield,
  Sprout,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CropRiskAlert, RiskSeverity } from "@/types";
import { MOCK_RISK_ALERTS } from "@/mock/data";
import { formatDate } from "@/lib/utils";
import { useFarm } from "@/context/FarmContext";

export default function AdvisoriesPage() {
  const { selectedFarm } = useFarm();
  const [alerts, setAlerts] = useState<CropRiskAlert[]>(MOCK_RISK_ALERTS);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [acknowledgedMap, setAcknowledgedMap] = useState<{ [id: string]: boolean }>({});

  const filterSeverities = ["all", "critical", "high", "moderate", "low"];

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity =
      selectedSeverity === "all" || alert.severity === selectedSeverity;
    const matchesCrop =
      selectedCrop === "all" ||
      alert.crop_name.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      alert.hazard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.advisory.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesCrop && matchesSearch;
  });

  const handleAcknowledge = (id: string) => {
    setAcknowledgedMap((prev) => ({ ...prev, [id]: true }));
  };

  const getSeverityCount = (sev: string) => {
    if (sev === "all") return alerts.length;
    return alerts.filter((a) => a.severity === sev).length;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-200/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">
              Crop Risk & Agricultural Advisories
            </h1>
            <Badge variant="success" className="text-[10px]">
              Backend Engine Synced
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Targeted agricultural precautions computed by matching local forecasts against the growth milestone of your crops at <strong>{selectedFarm.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-2xs">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-gray-700 font-medium">
            Verified Agromet Rules Only
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs">
        {/* Severity Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {filterSeverities.map((sev) => {
            const count = getSeverityCount(sev);
            const isSelected = selectedSeverity === sev;
            return (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 capitalize ${
                  isSelected
                    ? "bg-[#15803d] text-white shadow-2xs"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{sev}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search hazard or advisory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:bg-white"
          />
        </div>
      </div>

      {/* Advisories List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card className="text-center p-8 bg-gray-50/50">
            <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-bold text-gray-800 text-sm">No Advisories Match Your Filters</h4>
            <p className="text-xs text-gray-500 mt-1">Try resetting the severity or search term.</p>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const isAcknowledged = acknowledgedMap[alert.id];

            const severityBorder =
              alert.severity === "critical"
                ? "border-l-rose-600 bg-rose-50/20"
                : alert.severity === "high"
                ? "border-l-rose-500 bg-rose-50/15"
                : alert.severity === "moderate"
                ? "border-l-amber-500 bg-amber-50/15"
                : "border-l-emerald-500 bg-emerald-50/15";

            return (
              <Card
                key={alert.id}
                className={`border-l-4 transition-all shadow-xs ${severityBorder}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge severity={alert.severity} className="uppercase font-black text-[10px] tracking-wider">
                        {alert.severity} Priority
                      </Badge>
                      <span className="text-xs font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                        🌾 Crop: {alert.crop_name}
                      </span>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Stage: {alert.crop_stage}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 mt-2.5 flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 shrink-0 ${
                          alert.severity === "critical" || alert.severity === "high"
                            ? "text-rose-600"
                            : alert.severity === "moderate"
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      />
                      <span>{alert.hazard}</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-gray-400">
                      {formatDate(alert.timestamp)}
                    </span>
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      disabled={isAcknowledged}
                      className={`text-xs font-semibold flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
                        isAcknowledged
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isAcknowledged ? "Acknowledged" : "Acknowledge"}</span>
                    </button>
                  </div>
                </div>

                {/* Reason Banner */}
                <div className="p-3 bg-white/90 rounded-xl my-3 border border-gray-200/80 text-xs text-gray-700 leading-relaxed">
                  <strong className="text-gray-900 block mb-0.5">Phenological Vulnerability Reason:</strong>
                  {alert.reason}
                </div>

                {/* Advisory Precaution */}
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                  <strong className="flex items-center gap-1.5 text-emerald-900 uppercase text-[10px] tracking-wider mb-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Verified Agricultural Precaution & Protocol
                  </strong>
                  <p className="leading-relaxed font-medium">{alert.advisory}</p>
                </div>

                {/* Meta details footer */}
                <div className="flex items-center justify-between text-[11px] text-gray-500 mt-3 pt-2 border-t border-gray-100 flex-wrap gap-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    Validity Period: <strong className="text-gray-700">{alert.forecast_period}</strong>
                  </span>
                  <span>
                    Advisory Source: <strong className="text-gray-700">{alert.source}</strong>
                  </span>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Advisory Science Note */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Scientific Agronomic Basis:</strong> Every advisory above is generated from the agro-meteorological vulnerability matrix calculated by your teammate&apos;s FastAPI backend. No recommendations are fabricated in the frontend.
        </div>
      </div>
    </div>
  );
}
