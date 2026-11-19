"use client";

import React from "react";
import { Bell, ShieldAlert, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_RISK_ALERTS } from "@/mock/data";
import { formatDate } from "@/lib/utils";

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Risk Warnings & Notifications</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time notifications sent when forecast thresholds threaten active crop stages
          </p>
        </div>
        <Button variant="outline" size="sm" icon={<Check className="w-3.5 h-3.5" />}>
          Mark All Read
        </Button>
      </div>

      <div className="space-y-3">
        {MOCK_RISK_ALERTS.map((alert) => (
          <Card key={alert.id} className="p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge severity={alert.severity}>{alert.severity.toUpperCase()}</Badge>
                  <h4 className="font-bold text-gray-900 text-sm">{alert.hazard}</h4>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alert.reason}</p>
                <p className="text-xs text-emerald-800 font-medium mt-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  💡 {alert.advisory}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                  <span>Source: {alert.source}</span>
                  <span>·</span>
                  <span>Reported {formatDate(alert.timestamp)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
