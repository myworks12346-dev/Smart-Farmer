"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sprout,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await signIn(email, password);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setErrorMsg("An unexpected error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    signInDemo();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
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

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-6 md:p-8 shadow-sm">
          {/* Hackathon Quick Demo Banner */}
          <div className="mb-5 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-950 font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demo Farmer Mode</span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs font-bold text-[#15803d] hover:underline"
            >
              Enter Demo Account →
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
