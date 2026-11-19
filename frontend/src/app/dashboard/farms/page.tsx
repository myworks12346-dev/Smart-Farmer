"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Plus,
  ArrowRight,
  ShieldCheck,
  Compass,
  X,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Farm } from "@/types";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";
import { MOCK_FARMS } from "@/mock/data";

export default function FarmsPage() {
  const { accessToken } = useAuth();
  const [farms, setFarms] = useState<Farm[]>(MOCK_FARMS);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [state, setState] = useState("Karnataka");
  const [district, setDistrict] = useState("Bengaluru Rural");
  const [village, setVillage] = useState("");
  const [latitude, setLatitude] = useState("13.2984");
  const [longitude, setLongitude] = useState("77.5358");
  const [landArea, setLandArea] = useState("3.0");
  const [areaUnit, setAreaUnit] = useState<"Acres" | "Hectares" | "Bigha" | "Guntha">("Acres");

  const loadFarms = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getFarms(accessToken || undefined);
      setFarms(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFarms();
  }, []);

  const handleAddFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFarmData: Omit<Farm, "id"> = {
      name,
      state,
      district,
      village,
      latitude: parseFloat(latitude) || 13.0,
      longitude: parseFloat(longitude) || 77.0,
      land_area: parseFloat(landArea) || 1.0,
      area_unit: areaUnit,
      is_primary: farms.length === 0,
    };

    const res = await apiClient.createFarm(newFarmData, accessToken || undefined);
    setFarms((prev) => [...prev, res.data]);
    setShowAddModal(false);
    setName("");
  };

  const handleGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(4));
          setLongitude(pos.coords.longitude.toFixed(4));
        },
        () => alert("GPS permission not granted. Use manual entry.")
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">My Farms & Agricultural Parcels</h1>
          <p className="text-xs text-gray-500 mt-1">
            Registered land units monitored for stage-specific agro-meteorological risks
          </p>
        </div>
        <Button size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          Register New Farm
        </Button>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {farms.map((farm) => (
          <Card key={farm.id} className="hoverEffect flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-gray-900">{farm.name}</CardTitle>
                    <p className="text-[11px] text-gray-500">
                      {farm.village ? `${farm.village}, ` : ""}{farm.district}, {farm.state}
                    </p>
                  </div>
                </div>
                {farm.is_primary && <Badge variant="success">Primary Farm</Badge>}
              </CardHeader>

              <div className="grid grid-cols-3 gap-2 text-xs py-2 bg-gray-50/80 rounded-xl p-3 my-2 border border-gray-100">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Land Area</span>
                  <strong className="text-gray-800 text-sm">{farm.land_area} {farm.area_unit}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Coordinates</span>
                  <strong className="text-gray-800 text-xs">
                    {farm.latitude.toFixed(2)}°N, {farm.longitude.toFixed(2)}°E
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Status</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" /> Monitored
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
              <span className="text-[11px] text-gray-400">ID: {farm.id}</span>
              <Link
                href="/dashboard"
                className="text-xs font-semibold text-[#15803d] hover:underline flex items-center gap-1"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Farm Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#15803d]" />
                <h3 className="text-base font-bold text-gray-900">Register New Farm Parcel</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFarm} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cauvery Riverside Block B"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Village / Taluk (Optional)</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-gray-700">GPS Coordinates</label>
                    <button
                      type="button"
                      onClick={handleGps}
                      className="text-[10px] text-[#15803d] font-bold hover:underline"
                    >
                      Detect
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      type="text"
                      placeholder="Lat"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Lng"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Land Area</label>
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-xs"
                    />
                    <select
                      value={areaUnit}
                      onChange={(e) => setAreaUnit(e.target.value as any)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-xs"
                    >
                      <option value="Acres">Acres</option>
                      <option value="Hectares">Hectares</option>
                      <option value="Bigha">Bigha</option>
                      <option value="Guntha">Guntha</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                  Save Farm
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
