"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sprout, CheckCircle2, ChevronRight, Calendar, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CropGrowthStage } from "@/types";
import { formatDate } from "@/lib/utils";

interface CropStageCardProps {
  crop: {
    name: string;
    variety?: string;
    stage: CropGrowthStage;
    sowing_date?: string;
  };
  onStageChange?: (newStage: CropGrowthStage) => void;
}

const STAGES: CropGrowthStage[] = [
  "Sowing",
  "Germination",
  "Vegetative",
  "Flowering",
  "Fruiting / Grain formation",
  "Maturity",
  "Harvesting",
];

export function CropStageCard({ crop, onStageChange }: CropStageCardProps) {
  const [currentStage, setCurrentStage] = useState<CropGrowthStage>(crop.stage);
  const [isUpdating, setIsUpdating] = useState(false);

  const currentStageIndex = STAGES.indexOf(currentStage);

  const handleStageSelect = (stage: CropGrowthStage) => {
    setCurrentStage(stage);
    if (onStageChange) {
      onStageChange(stage);
    }
  };

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="pb-2">
          <div>
            <CardTitle className="text-base text-gray-900">
              <Sprout className="w-5 h-5 text-[#15803d]" />
              <span>Monitored Crop & Growth Stage</span>
            </CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              Crop sensitivity to weather forecasts is evaluated at each stage
            </p>
          </div>
          <Link
            href="/dashboard/crops"
            className="text-xs font-semibold text-[#15803d] hover:underline flex items-center gap-1"
          >
            <span>Manage Crops</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </CardHeader>

        {/* Crop Profile Header */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f7f9f6] border border-[#e5e9e4] my-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center font-bold text-lg">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 text-sm md:text-base">
                  {crop.name}
                </h4>
                {crop.variety && (
                  <span className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 rounded-md text-gray-600">
                    {crop.variety}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Sown on: {crop.sowing_date ? formatDate(crop.sowing_date) : "25 Aug 2026"}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block uppercase font-bold">
              Current Stage
            </span>
            <Badge variant="success" className="font-bold text-xs mt-0.5">
              {currentStage}
            </Badge>
          </div>
        </div>

        {/* Growth Stage Progress Flow */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-700">Growth Stage Timeline</span>
            <span className="text-xs font-semibold text-emerald-700">
              Stage {currentStageIndex + 1} of {STAGES.length}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-1.5 my-2">
            {STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <button
                  key={stage}
                  onClick={() => handleStageSelect(stage)}
                  title={`Set stage to ${stage}`}
                  className={`group flex flex-col items-center text-center p-1.5 rounded-lg border transition-all ${
                    isCurrent
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-200"
                      : isPast
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                  <span className="text-[9px] font-medium truncate w-full mt-0.5 hidden md:block">
                    {stage.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-gray-500 italic mt-2">
            Tip: Click a stage number to update the current crop milestone. The backend recalculates weather vulnerabilities immediately.
          </p>
        </div>
      </div>
    </Card>
  );
}
