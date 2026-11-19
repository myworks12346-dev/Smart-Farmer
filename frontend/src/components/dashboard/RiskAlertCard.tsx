"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CropRiskAlert } from "@/types";
import { formatDate } from "@/lib/utils";

interface RiskAlertCardProps {
  risks: CropRiskAlert[];
  onDismissAlert?: (id: string) => void;
}

export function RiskAlertCard({ risks, onDismissAlert }: RiskAlertCardProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    drainage: true,
    spray_postpone: false,
    disease_inspection: false,
  });

  if (!risks || risks.length === 0 || acknowledged) {
    return (
      <Card className="flex flex-col justify-center items-center text-center p-6 bg-emerald-50/50 border-emerald-200">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h4 className="font-bold text-gray-900 text-sm">All Clear: Low Risk</h4>
        <p className="text-xs text-gray-600 max-w-sm mt-0.5">
          No severe weather hazards detected for your active crop stage. Recommended farming operations proceed as normal.
        </p>
      </Card>
    );
  }

  const primaryRisk = risks[0];

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    if (onDismissAlert) {
      onDismissAlert(primaryRisk.id);
    }
  };

  return (
    <Card className="border-l-4 border-l-rose-500 shadow-xs">
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="text-base text-gray-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Active Crop Weather Vulnerability Alert</span>
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            Calculated by backend risk engine matching forecasts against current crop milestone
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge severity={primaryRisk.severity} className="uppercase font-bold tracking-wider text-[10px]">
            {primaryRisk.severity} Risk
          </Badge>
          <button
            onClick={handleAcknowledge}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 hover:bg-white"
            title="Mark as Acknowledged"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Acknowledge</span>
          </button>
        </div>
      </CardHeader>

      <div className="space-y-3 mt-3">
        {/* Hazard Banner */}
        <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-rose-900">
                  {primaryRisk.hazard}
                </span>
                <span className="text-xs text-rose-700 font-semibold">
                  · Crop: {primaryRisk.crop_name} ({primaryRisk.crop_stage} Stage)
                </span>
              </div>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                {primaryRisk.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Advisory Action Item & Interactive Checklist */}
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Recommended Precaution & Actionable Advisory
          </p>
          <p className="text-xs text-emerald-900 leading-relaxed font-medium mb-3">
            {primaryRisk.advisory}
          </p>

          {/* Farmer Precaution Checklist */}
          <div className="space-y-1.5 pt-2 border-t border-emerald-200/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Farmer Action Checklist:
            </span>
            <label className="flex items-center gap-2 text-xs text-emerald-950 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.drainage}
                onChange={() => toggleCheck("drainage")}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span className={checklist.drainage ? "line-through text-emerald-700/70" : ""}>
                Check field drainage outlets to prevent water stagnation in flowering basins
              </span>
            </label>
            <label className="flex items-center gap-2 text-xs text-emerald-950 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.spray_postpone}
                onChange={() => toggleCheck("spray_postpone")}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span className={checklist.spray_postpone ? "line-through text-emerald-700/70" : ""}>
                Postpone foliar nutrient sprays and chemical pesticide applications
              </span>
            </label>
            <label className="flex items-center gap-2 text-xs text-emerald-950 cursor-pointer">
              <input
                type="checkbox"
                checked={checklist.disease_inspection}
                onChange={() => toggleCheck("disease_inspection")}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span className={checklist.disease_inspection ? "line-through text-emerald-700/70" : ""}>
                Monitor lower leaf collars for early water-soaked blast lesions
              </span>
            </label>
          </div>
        </div>

        {/* Source Citation & Link to full alerts */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            Advisory Source: <strong className="text-gray-700">{primaryRisk.source}</strong>
          </span>
          <Link
            href="/dashboard/advisories"
            className="font-semibold text-[#15803d] hover:underline flex items-center gap-1"
          >
            <span>View All Advisories ({risks.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
