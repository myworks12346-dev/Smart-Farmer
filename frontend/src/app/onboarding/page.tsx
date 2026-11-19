"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Compass,
  Calendar,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { CropGrowthStage } from "@/types";

const STAGES: CropGrowthStage[] = [
  "Sowing",
  "Germination",
  "Vegetative",
  "Flowering",
  "Fruiting / Grain formation",
  "Maturity",
  "Harvesting",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  // Farm Info
  const [farmName, setFarmName] = useState("Green Valley Fields");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Rural");
  const [village, setVillage] = useState("Doddaballapura");
  const [latitude, setLatitude] = useState("13.2984");
  const [longitude, setLongitude] = useState("77.5358");
  const [landArea, setLandArea] = useState("4.5");
  const [areaUnit, setAreaUnit] = useState("Acres");

  // Crop Info
  const [cropName, setCropName] = useState("Paddy (Rice)");
  const [variety, setVariety] = useState("BPT 5204 (Samba Mahsuri)");
  const [sowingDate, setSowingDate] = useState("2026-08-25");
  const [stage, setStage] = useState<CropGrowthStage>("Flowering");

  const [loading, setLoading] = useState(false);

  const handleUseGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(4));
          setLongitude(pos.coords.longitude.toFixed(4));
        },
        () => {
          alert("GPS permission not granted. You can continue with manual entry.");
        }
      );
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#0f4a2c] flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-[#4ade80]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0f4a2c]">
              Smart<span className="text-[#16a34a]">Farmer</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Farm & Crop Onboarding
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Step {step} of 2: {step === 1 ? "Register Agricultural Land" : "Add Initial Crop Cycle"}
          </p>

          {/* Stepper bar */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 1 ? "bg-[#15803d]" : "bg-gray-200"}`} />
            <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 2 ? "bg-[#15803d]" : "bg-gray-200"}`} />
          </div>
        </div>

        <Card className="p-6 md:p-8 shadow-sm">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-[#15803d]" />
                <h3 className="text-sm font-bold text-gray-900">Farm Location & Dimensions</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  required
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
                    <label className="text-xs font-bold text-gray-700">Latitude & Longitude</label>
                    <button
                      type="button"
                      onClick={handleUseGps}
                      className="text-[11px] text-[#15803d] font-bold hover:underline flex items-center gap-1"
                    >
                      <Compass className="w-3 h-3" /> Auto-Detect GPS
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Lat: 13.2984"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800"
                    />
                    <input
                      type="text"
                      placeholder="Lng: 77.5358"
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
                      onChange={(e) => setAreaUnit(e.target.value)}
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
          ) : (
            <form onSubmit={handleFinish} className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Sprout className="w-5 h-5 text-[#15803d]" />
                <h3 className="text-sm font-bold text-gray-900">Crop Cycle Registration</h3>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Current Growth Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as CropGrowthStage)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  >
                    {STAGES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>Why this is important:</strong> Once registered, our backend evaluates incoming rainfall, humidity, and heat against this specific growth stage to generate targeted precautions.
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {loading ? "Activating Dashboard..." : "Complete Setup & Launch"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
