"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Compass,
  Calendar,
  Layers,
  Sparkles,
  Info,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CropGrowthStage } from "@/types";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

const STAGES: { stage: CropGrowthStage; description: string; riskHighlight: string }[] = [
  {
    stage: "Sowing",
    description: "Seed placement in prepared seedbed.",
    riskHighlight: "Excess moisture can cause seed rot; requires mild warmth.",
  },
  {
    stage: "Germination",
    description: "Seed sprouting and initial root radicle emergence.",
    riskHighlight: "Crust formation due to unexpected heavy rain blocks sprouts.",
  },
  {
    stage: "Vegetative",
    description: "Rapid tillering, stem elongation and leaf canopy development.",
    riskHighlight: "Requires adequate nitrogen and moderate moisture; tolerant to mild showers.",
  },
  {
    stage: "Flowering",
    description: "Panicle emergence, anthesis and pollination.",
    riskHighlight: "CRITICAL: High rain causes pollen wash-out; high humidity breeds blast disease.",
  },
  {
    stage: "Fruiting / Grain formation",
    description: "Milky to dough stage of grain/fruit filling.",
    riskHighlight: "Moisture stress reduces grain weight; lodging risk in high winds.",
  },
  {
    stage: "Maturity",
    description: "Ripening of grains and physiological maturity.",
    riskHighlight: "Requires dry, sunny weather for optimal ripening.",
  },
  {
    stage: "Harvesting",
    description: "Crop cutting, threshing, and field drying.",
    riskHighlight: "Any rain or thunderstorm can cause direct yield loss.",
  },
];

const POPULAR_CROPS = [
  { name: "Paddy (Rice)", icon: "🌾", defaultVariety: "BPT 5204 (Samba Mahsuri)" },
  { name: "Wheat", icon: "🌾", defaultVariety: "PBW 550" },
  { name: "Maize (Corn)", icon: "🌽", defaultVariety: "DKC 9108" },
  { name: "Tomato", icon: "🍅", defaultVariety: "Abhinav Hybrid" },
  { name: "Cotton", icon: "🌿", defaultVariety: "Bt Cotton RCH-2" },
  { name: "Sugarcane", icon: "🎋", defaultVariety: "Co 86032" },
  { name: "Soybean", icon: "🫘", defaultVariety: "JS 335" },
  { name: "Potato", icon: "🥔", defaultVariety: "Kufri Jyoti" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Farm Info
  const [farmName, setFarmName] = useState("Green Valley Fields");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Rural");
  const [village, setVillage] = useState("Doddaballapura");
  const [latitude, setLatitude] = useState("13.2984");
  const [longitude, setLongitude] = useState("77.5358");
  const [landArea, setLandArea] = useState("4.5");
  const [areaUnit, setAreaUnit] = useState<"Acres" | "Hectares" | "Bigha" | "Guntha">("Acres");

  // Crop Info
  const [cropName, setCropName] = useState("Paddy (Rice)");
  const [variety, setVariety] = useState("BPT 5204 (Samba Mahsuri)");
  const [sowingDate, setSowingDate] = useState("2026-08-25");
  const [selectedStage, setSelectedStage] = useState<CropGrowthStage>("Flowering");

  const [loading, setLoading] = useState(false);
  const [gpsDetecting, setGpsDetecting] = useState(false);

  const handleUseGps = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toFixed(4));
        setLongitude(pos.coords.longitude.toFixed(4));
        setGpsDetecting(false);
      },
      () => {
        alert("GPS location permission not granted. You can proceed with manual coordinate entry.");
        setGpsDetecting(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSelectCropSuggestion = (crop: typeof POPULAR_CROPS[0]) => {
    setCropName(crop.name);
    setVariety(crop.defaultVariety);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Farm via Centralized API Client
      const farmRes = await apiClient.createFarm(
        {
          name: farmName,
          state,
          district,
          village,
          latitude: parseFloat(latitude) || 13.2984,
          longitude: parseFloat(longitude) || 77.5358,
          land_area: parseFloat(landArea) || 1,
          area_unit: areaUnit,
          is_primary: true,
        },
        accessToken || undefined
      );

      // 2. Create Initial Crop Cycle
      await apiClient.createCropCycle(
        {
          farm_id: farmRes.data.id,
          crop_name: cropName,
          variety,
          sowing_date: sowingDate,
          current_stage: selectedStage,
        },
        accessToken || undefined
      );

      // Redirect to main farmer dashboard
      router.push("/dashboard");
    } catch {
      // Fallback redirect even on network error
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#0f4a2c] flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-[#4ade80]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0f4a2c]">
              Smart<span className="text-[#16a34a]">Farmer</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Farmer Onboarding Setup
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Step {step} of 3:{" "}
            {step === 1
              ? "Register Farm Location & Dimensions"
              : step === 2
              ? "Register Initial Crop & Growth Stage"
              : "Review & Activate Weather Intelligence"}
          </p>

          {/* Stepper indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`h-1.5 w-14 rounded-full transition-colors ${step >= 1 ? "bg-[#15803d]" : "bg-gray-200"}`} />
            <div className={`h-1.5 w-14 rounded-full transition-colors ${step >= 2 ? "bg-[#15803d]" : "bg-gray-200"}`} />
            <div className={`h-1.5 w-14 rounded-full transition-colors ${step >= 3 ? "bg-[#15803d]" : "bg-gray-200"}`} />
          </div>
        </div>

        <Card className="p-6 md:p-8 shadow-sm">
          {/* STEP 1: FARM REGISTRATION */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-[#15803d]" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Step 1: Farm Location & Boundary</h3>
                  <p className="text-[11px] text-gray-500">Accurate coordinates ensure hyper-local IMD weather data</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Farm / Field Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Green Valley Fields"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Village / Taluk</label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-gray-700">Coordinates</label>
                    <button
                      type="button"
                      onClick={handleUseGps}
                      disabled={gpsDetecting}
                      className="text-[11px] text-[#15803d] font-bold hover:underline flex items-center gap-1"
                    >
                      <Compass className={`w-3 h-3 ${gpsDetecting ? "animate-spin" : ""}`} />
                      {gpsDetecting ? "Detecting..." : "Auto-Detect GPS"}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Lat: 13.2984"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800"
                    />
                    <input
                      type="text"
                      placeholder="Lng: 77.5358"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Land Area</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value as any)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800"
                    >
                      <option value="Acres">Acres</option>
                      <option value="Hectares">Hectares</option>
                      <option value="Bigha">Bigha</option>
                      <option value="Guntha">Guntha</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" icon={<ArrowRight className="w-4 h-4" />}>
                  Continue to Crop Setup
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: CROP REGISTRATION */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Sprout className="w-5 h-5 text-[#15803d]" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Step 2: Crop Cycle & Growth Stage</h3>
                  <p className="text-[11px] text-gray-500">Associate crop with {farmName}</p>
                </div>
              </div>

              {/* Popular Crop quick select pills */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Popular Crops (Click to auto-fill)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_CROPS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleSelectCropSuggestion(c)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                        cropName === c.name
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Variety / Hybrid</label>
                  <input
                    type="text"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Sowing Date</label>
                <input
                  type="date"
                  required
                  value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              {/* Growth Stage Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Current Growth Stage
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {STAGES.map((item, idx) => {
                    const isSelected = selectedStage === item.stage;
                    return (
                      <button
                        key={item.stage}
                        type="button"
                        onClick={() => setSelectedStage(item.stage)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-2xs"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-gray-900">
                            {idx + 1}. {item.stage}
                          </span>
                          {isSelected && <Badge variant="success">Active</Badge>}
                        </div>
                        <p className="text-[11px] text-gray-500">{item.description}</p>
                        <p className="text-[10px] text-emerald-800 font-semibold mt-1">
                          ⚠️ {item.riskHighlight}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button type="submit" icon={<ArrowRight className="w-4 h-4" />}>
                  Review & Activate
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: REVIEW & ACTIVATE */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-[#15803d]" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Step 3: Review Registration</h3>
                  <p className="text-[11px] text-gray-500">Confirm your details before activating weather risk tracking</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Farm Summary Box */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                    Registered Farm
                  </span>
                  <p className="font-bold text-gray-900 text-sm">{farmName}</p>
                  <p className="text-gray-600">
                    {village ? `${village}, ` : ""}{district}, {state}
                  </p>
                  <p className="text-gray-500">
                    Area: <strong>{landArea} {areaUnit}</strong>
                  </p>
                  <p className="text-gray-500">
                    GPS: <code>{latitude}°N, {longitude}°E</code>
                  </p>
                </div>

                {/* Crop Summary Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">
                    Active Crop Cycle
                  </span>
                  <p className="font-bold text-emerald-950 text-sm">{cropName}</p>
                  <p className="text-emerald-800">
                    Variety: <strong>{variety || "Standard"}</strong>
                  </p>
                  <p className="text-emerald-800">
                    Sowing Date: <strong>{sowingDate}</strong>
                  </p>
                  <div className="pt-1">
                    <Badge variant="success" className="font-bold">
                      Current Stage: {selectedStage}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Explanatory Banner */}
              <div className="p-3.5 bg-emerald-900 text-white rounded-2xl text-xs flex items-start gap-3 shadow-xs">
                <Sparkles className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <div className="leading-relaxed text-emerald-100">
                  <strong className="text-white block mb-0.5">Automated Agro-Meteorology Connection:</strong>
                  Your teammate&apos;s FastAPI backend will associate this farm with local IMD station data and evaluate incoming rainfall against the <em>{selectedStage}</em> milestone.
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)} icon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button type="submit" disabled={loading} icon={<CheckCircle2 className="w-4 h-4" />}>
                  {loading ? "Registering with Backend..." : "Complete Setup & Launch Dashboard"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
