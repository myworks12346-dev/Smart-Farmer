"use client";

import React, { useState } from "react";
import {
  Sprout,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  X,
  Info,
  Clock,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CropGrowthStage } from "@/types";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";

interface CropItem {
  id: string;
  name: string;
  variety: string;
  sowing_date: string;
  stage: CropGrowthStage;
  farm_name: string;
}

const STAGES: { stage: CropGrowthStage; riskSummary: string; color: string }[] = [
  { stage: "Sowing", riskSummary: "Rot vulnerability under stagnant moisture", color: "text-amber-700 bg-amber-50" },
  { stage: "Germination", riskSummary: "Crusting hazard from heavy rain", color: "text-amber-700 bg-amber-50" },
  { stage: "Vegetative", riskSummary: "Tolerant to moderate rain; watch pests", color: "text-emerald-700 bg-emerald-50" },
  { stage: "Flowering", riskSummary: "CRITICAL: Pollen wash-out & blast risk", color: "text-rose-700 bg-rose-50" },
  { stage: "Fruiting / Grain formation", riskSummary: "Moisture stress / wind lodging risk", color: "text-amber-700 bg-amber-50" },
  { stage: "Maturity", riskSummary: "Needs dry conditions for ripening", color: "text-emerald-700 bg-emerald-50" },
  { stage: "Harvesting", riskSummary: "CRITICAL: Any rain causes post-cut spoilage", color: "text-rose-700 bg-rose-50" },
];

export default function CropsPage() {
  const { accessToken } = useAuth();
  const [crops, setCrops] = useState<CropItem[]>([
    {
      id: "crop_01",
      name: "Paddy (Rice)",
      variety: "BPT 5204 (Samba Mahsuri)",
      sowing_date: "2026-08-25",
      stage: "Flowering",
      farm_name: "Green Valley Fields",
    },
    {
      id: "crop_02",
      name: "Tomato",
      variety: "Abhinav Hybrid",
      sowing_date: "2026-09-10",
      stage: "Fruiting / Grain formation",
      farm_name: "Green Valley Fields",
    },
  ]);

  const [selectedCrop, setSelectedCrop] = useState<CropItem>(crops[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [updatingStage, setUpdatingStage] = useState(false);
  const [stageUpdateMessage, setStageUpdateMessage] = useState<string | null>(null);

  // New Crop Form
  const [newCropName, setNewCropName] = useState("Maize (Corn)");
  const [newVariety, setNewVariety] = useState("DKC 9108");
  const [newSowingDate, setNewSowingDate] = useState("2026-10-01");
  const [newStage, setNewStage] = useState<CropGrowthStage>("Vegetative");

  const handleStageSelect = async (newStage: CropGrowthStage) => {
    setUpdatingStage(true);
    setStageUpdateMessage(null);

    // Optimistic Update
    setSelectedCrop((prev) => ({ ...prev, stage: newStage }));
    setCrops((prev) =>
      prev.map((c) => (c.id === selectedCrop.id ? { ...c, stage: newStage } : c))
    );

    try {
      await apiClient.updateCropStage(selectedCrop.id, newStage, accessToken || undefined);
      setStageUpdateMessage(`Stage successfully updated to "${newStage}". The backend risk engine has refreshed your weather vulnerabilities.`);
      setTimeout(() => setStageUpdateMessage(null), 5000);
    } finally {
      setUpdatingStage(false);
    }
  };

  const handleAddCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: CropItem = {
      id: `crop_${Date.now()}`,
      name: newCropName,
      variety: newVariety,
      sowing_date: newSowingDate,
      stage: newStage,
      farm_name: "Green Valley Fields",
    };

    await apiClient.createCropCycle(
      {
        farm_id: "farm_001",
        crop_name: newCropName,
        variety: newVariety,
        sowing_date: newSowingDate,
        current_stage: newStage,
      },
      accessToken || undefined
    );

    setCrops((prev) => [...prev, created]);
    setSelectedCrop(created);
    setShowAddModal(false);
  };

  const currentStageIndex = STAGES.findIndex((s) => s.stage === selectedCrop.stage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">Crop Lifecycle Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Maintain active crop cycles and update growth milestones to trigger precise weather risk evaluations
          </p>
        </div>
        <Button size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          Add Crop Cycle
        </Button>
      </div>

      {stageUpdateMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{stageUpdateMessage}</span>
        </div>
      )}

      {/* Crop Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {crops.map((crop) => (
          <button
            key={crop.id}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              crop.id === selectedCrop.id
                ? "bg-[#15803d] text-white border-[#15803d] shadow-sm"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span>🌾 {crop.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${crop.id === selectedCrop.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
              {crop.stage}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stage Progression Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-base text-gray-900 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#15803d]" />
                  <span>Interactive Growth Stage Progression</span>
                </CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">
                  Click any stage milestone to record progress. The backend updates risk alerts immediately.
                </p>
              </div>
              <Badge variant="success" className="font-bold">
                Stage {currentStageIndex + 1} of 7: {selectedCrop.stage}
              </Badge>
            </CardHeader>

            <div className="space-y-3 my-4">
              {STAGES.map((item, idx) => {
                const isCurrent = idx === currentStageIndex;
                const isCompleted = idx < currentStageIndex;

                return (
                  <button
                    key={item.stage}
                    onClick={() => handleStageSelect(item.stage)}
                    disabled={updatingStage}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isCurrent
                        ? "bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-200 shadow-2xs"
                        : isCompleted
                        ? "bg-gray-50/80 border-gray-200 hover:bg-emerald-50/40"
                        : "bg-white border-gray-200 hover:bg-gray-50 opacity-80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCurrent
                            ? "bg-emerald-700 text-white shadow-xs"
                            : isCompleted
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isCompleted ? "✓" : idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-gray-900">{item.stage}</h4>
                          {isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-600 text-white rounded-full">
                              CURRENT MILESTONE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{item.riskSummary}</p>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Active Crop Details & Agronomic Rule Card */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold text-gray-900">Crop Summary</CardTitle>
            </CardHeader>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Crop</span>
                <strong className="text-gray-900">{selectedCrop.name}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Variety / Hybrid</span>
                <strong className="text-gray-900">{selectedCrop.variety}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Sown On</span>
                <strong className="text-gray-900">{formatDate(selectedCrop.sowing_date)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Farm</span>
                <strong className="text-gray-900">{selectedCrop.farm_name}</strong>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#0f4a2c] to-[#145e38] text-white">
            <div className="flex items-center gap-2 mb-2 text-emerald-300">
              <ShieldAlert className="w-5 h-5" />
              <h4 className="font-bold text-sm">Flowering Agromet Alert</h4>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              When paddy panicles are in flowering anthesis, rain higher than 10mm can wash out pollen grains, hindering fertilization. Keep field drainage channels clear and defer chemical spraying.
            </p>
          </Card>
        </div>
      </div>

      {/* Add Crop Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-[#15803d]" />
                <h3 className="text-base font-bold text-gray-900">Add Crop Cycle</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCrop} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Variety / Hybrid</label>
                <input
                  type="text"
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Sowing Date</label>
                <input
                  type="date"
                  required
                  value={newSowingDate}
                  onChange={(e) => setNewSowingDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Initial Growth Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as CropGrowthStage)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800"
                >
                  {STAGES.map((st) => (
                    <option key={st.stage} value={st.stage}>
                      {st.stage}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                  Save Crop Cycle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
