"use client";

import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_RISK_ALERTS } from "@/mock/data";
import { formatDate } from "@/lib/utils";

export default function AdvisoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Crop Risk & Agricultural Advisories</h1>
        <p className="text-xs text-gray-500 mt-1">
          Targeted agricultural precautions computed by matching local forecasts with your crop&apos;s growth stage
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_RISK_ALERTS.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 ${
              alert.severity === "high"
                ? "border-l-rose-500"
                : alert.severity === "moderate"
                ? "border-l-amber-500"
                : "border-l-emerald-500"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge severity={alert.severity} className="uppercase font-bold text-[10px]">
                    {alert.severity} Risk
                  </Badge>
                  <span className="text-xs font-semibold text-gray-600">
                    Crop: {alert.crop_name} · Stage: {alert.crop_stage}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mt-2 flex items-center gap-2">
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      alert.severity === "high"
                        ? "text-rose-600"
                        : alert.severity === "moderate"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  />
                  {alert.hazard}
                </h3>
              </div>
              <span className="text-[11px] text-gray-400">
                {formatDate(alert.timestamp)}
              </span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl my-3 border border-gray-100 text-xs text-gray-700 leading-relaxed">
              <strong>Vulnerability Reason: </strong> {alert.reason}
            </div>

            <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950">
              <strong className="flex items-center gap-1.5 text-emerald-800 uppercase text-[10px] tracking-wider mb-1">
                <CheckCircle className="w-3.5 h-3.5" /> Recommended Agricultural Precaution
              </strong>
              {alert.advisory}
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
              <span>Source: <strong>{alert.source}</strong></span>
              <span>Window: <strong>{alert.forecast_period}</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
