"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  CloudLightning,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles,
  Layers,
  Thermometer,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f9f6] text-[#19261f] flex flex-col">
      {/* Top Navigation */}
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#e5e9e4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0f4a2c] flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-6 h-6 text-[#4ade80]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#0f4a2c]">
                Smart<span className="text-[#16a34a]">Farmer</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#7b8d83]">
                Agri-Intelligence
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#features" className="hover:text-[#0f4a2c] transition-colors">
              Platform
            </a>
            <a href="#intelligence" className="hover:text-[#0f4a2c] transition-colors">
              Crop-Stage Risk
            </a>
            <a href="#market" className="hover:text-[#0f4a2c] transition-colors">
              Mandi Prices
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                Farmer Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-[#0f4a2c] text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Next-Gen Agricultural Intelligence · Hackathon Edition</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f4a2c] tracking-tight leading-[1.1] mb-6">
              Weather Intelligence Built Around Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500 underline decoration-emerald-200 decoration-wavy">
                Crop&apos;s Growth Stage
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              General weather forecasts don&apos;t tell you if tomorrow&apos;s rain is a blessing or a blight.
              Smart Farmer translates agro-meteorology into stage-specific risk alerts, verified precautions, and local mandi prices.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-3.5 font-bold shadow-md">
                  Explore Farmer Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/onboarding" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 py-3.5 font-bold">
                  Register My Farm
                </Button>
              </Link>
            </div>
          </div>

          {/* Interactive Comparison Preview Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#e5e9e4] shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100 flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Live Difference
                </span>
                <h3 className="text-lg font-black text-gray-900">
                  Generic Weather vs. Crop-Stage Intelligence
                </h3>
              </div>
              <Badge variant="success" className="text-xs">
                Location: Bengaluru Rural · Crop: Paddy (Rice)
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conventional Weather App */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Standard Weather Apps
                  </span>
                  <div className="flex items-center gap-3 my-3">
                    <CloudLightning className="w-8 h-8 text-sky-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-800">26°C · Showers</p>
                      <p className="text-xs text-gray-500">14 mm Rainfall Expected</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-xs text-gray-600 border border-gray-200">
                    ❌ <em>&quot;Scattered thunderstorms today. Carry an umbrella.&quot;</em>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-4 italic">
                  Leaves the farmer guessing how rainfall affects flowering paddy panicles.
                </p>
              </div>

              {/* Smart Farmer Intelligent Advisory */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Smart Farmer Agri-Intelligence
                    </span>
                    <Badge severity="high">High Risk</Badge>
                  </div>
                  <div className="flex items-center gap-3 my-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        Vulnerability: Flowering Stage Sensitive
                      </p>
                      <p className="text-xs text-gray-600">Pollen wash-out and blast risk detected</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl text-xs text-emerald-950 font-medium border border-emerald-200 shadow-xs">
                    ✅ <strong>Agromet Precaution: </strong> Open field drainage outlets immediately. Postpone chemical spray until showers cease.
                  </div>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mt-4">
                  Translates weather data into concrete farmer action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section id="features" className="py-16 bg-white border-t border-[#e5e9e4] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f4a2c] tracking-tight">
              Designed For Real Agricultural Decisions
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Built in synergy with our FastAPI backend engine and Supabase data layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hoverEffect p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                1. Growth Stage Tracking
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                From Sowing and Germination through Flowering to Harvest. Vulnerabilities automatically adapt as your crop advances through its life cycle.
              </p>
            </Card>

            <Card className="hoverEffect p-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                2. Agromet Weather Alerts
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct integration with IMD and Agromet advisories. Rain thresholds, humidity windows, and dry spells evaluated against crop health.
              </p>
            </Card>

            <Card className="hoverEffect p-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
                3. Daily Mandi Rates
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Transparent daily APMC market price bulletins. Compare prices across nearby mandis before harvesting and transport.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-[#0f4a2c] text-white/80 text-xs px-4 md:px-8 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm">Smart Farmer</span>
            <span className="text-emerald-300">· Hackathon 2-Member Team Project</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span>Frontend: Next.js + Tailwind</span>
            <span>·</span>
            <span>Backend: FastAPI + Supabase</span>
          </div>
          <p className="text-emerald-400/80 text-[11px]">
            Agromet intelligence platform for Indian agriculture.
          </p>
        </div>
      </footer>
    </div>
  );
}
