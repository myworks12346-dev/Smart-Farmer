"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CropRiskAlert } from "@/types";
import { formatDate } from "@/lib/utils";

interface RiskAlertCardProps {
  risks: CropRiskAlert[];
}

export function RiskAlertCard({ risks }: RiskAlertCardProps) {
  if (!risks || risks.length === 0) {
    return (
      <Card className="flex flex-col justify-center items-center text-center p-8 bg-emerald-50/50 border-emerald-200">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-gray-900 text-base">All Clear: Low Risk</h4>
        <p className="text-xs text-gray-600 max-w-sm mt-1">
          No critical weather hazards detected for your current crop growth stage. Normal agricultural practices advised.
        </p>
      </Card>
    );
  }

  const primaryRisk = risks[0];

  return (
    <Card className="border-l-4 border-l-rose-500">
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="text-base text-gray-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Active Crop Weather Vulnerability Alert</span>
          </CardTitle>
          <p className="text-xs text-gray-500 mt-0.5">
            Calculated by backend risk engine matching weather forecasts against current crop milestone
          </p>
        </div>
        <Badge severity={primaryRisk.severity} className="uppercase font-bold tracking-wider">
          {primaryRisk.severity} Priority
        </Badge>
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

        {/* Advisory Action Item */}
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <p className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            Recommended Precaution & Advisory
          </p>
          <p className="text-xs text-emerald-900 mt-1.5 leading-relaxed font-medium">
            {primaryRisk.advisory}
          </p>
        </div>

        {/* Source Citation & Link to full alerts */}
        <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500">
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
