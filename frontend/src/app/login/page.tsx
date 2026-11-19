"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, Lock, Phone, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In Phase 1 shell, redirect directly to dashboard; Phase 2 attaches Supabase Auth
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#0f4a2c] flex items-center justify-center text-white shadow-sm">
            <Sprout className="w-6 h-6 text-[#4ade80]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#0f4a2c]">
            Smart<span className="text-[#16a34a]">Farmer</span>
          </span>
        </Link>
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
          Sign In to Your Farm Dashboard
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Access your farm weather risks, growth stage alerts, and mandi prices
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="p-6 md:p-8 shadow-md">
          {/* Demo shortcut banner for hackathon review */}
          <div className="mb-6 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Hackathon Quick Preview</span>
            </div>
            <button
              onClick={handleDemoLogin}
              className="text-xs font-bold text-[#15803d] hover:underline"
            >
              Demo Access →
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number or Email
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or farmer@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="md"
              disabled={loading}
              className="w-full mt-2 font-bold"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? "Signing in..." : "Sign In to Farm"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#15803d] hover:underline">
              Register here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
