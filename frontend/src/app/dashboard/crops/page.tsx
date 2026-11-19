"use client";

import React from "react";
import Link from "next/link";
import { Sprout, Plus, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CropStageCard } from "@/components/dashboard/CropStageCard";
import { MOCK_DASHBOARD_RESPONSE } from "@/mock/data";

export default function CropsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Crop Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track active crop cycles and update growth milestones to receive accurate stage-specific weather risks
          </p>
        </div>
        <Button size="sm" icon={<Plus className="w-4 h-4" />}>
          Add Crop Cycle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropStageCard crop={MOCK_DASHBOARD_RESPONSE.crop} />

        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="text-base text-gray-900">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>Crop Vulnerability Guidelines</span>
              </CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs text-gray-600 leading-relaxed my-2">
              <p>
                <strong>Why crop stages matter:</strong> Crops face radically different weather sensitivities depending on their biological milestone. For instance, high rainfall during <em>Flowering</em> causes flower shedding and fungal disease, whereas during <em>Vegetative</em> growth it is generally beneficial.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Flowering Stage Caution:</strong> Keep soil well-drained. Suspend pesticide spraying during active rain windows.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
