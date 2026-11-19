"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Plus, ArrowRight, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_FARMS } from "@/mock/data";

export default function FarmsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#0f4a2c]">My Farms & Parcels</h1>
          <p className="text-xs text-gray-500 mt-1">
            Registered agricultural land units with coordinates and soil parameters
          </p>
        </div>
        <Link href="/onboarding">
          <Button size="sm" icon={<Plus className="w-4 h-4" />}>
            Register New Farm
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_FARMS.map((farm) => (
          <Card key={farm.id} className="hoverEffect">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold text-gray-900">{farm.name}</CardTitle>
                  <p className="text-[11px] text-gray-500">{farm.village}, {farm.district}, {farm.state}</p>
                </div>
              </div>
              {farm.is_primary && (
                <Badge variant="success">Primary Farm</Badge>
              )}
            </CardHeader>
            <div className="grid grid-cols-3 gap-2 text-xs py-2 bg-gray-50/80 rounded-xl p-3 my-2">
              <div>
                <span className="text-[10px] text-gray-400 block">Area</span>
                <strong className="text-gray-800">{farm.land_area} {farm.area_unit}</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Coordinates</span>
                <strong className="text-gray-800">{farm.latitude.toFixed(2)}°N, {farm.longitude.toFixed(2)}°E</strong>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Status</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Link href="/dashboard" className="text-xs font-semibold text-[#15803d] hover:underline flex items-center gap-1">
                View Farm Weather & Crops <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
