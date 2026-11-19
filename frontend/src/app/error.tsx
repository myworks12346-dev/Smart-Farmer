"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Sprout } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f7f9f6] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-xl font-black text-gray-900 tracking-tight">
          Field Data Disruption
        </h2>

        <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
          We encountered an unexpected error while rendering your agricultural dashboard.
          Your crop milestones and farm records remain secure.
        </p>

        <Card className="p-4 bg-white border border-gray-200 text-left my-4">
          <p className="text-[11px] font-mono text-rose-700 break-words">
            {error.message || "An unexpected application error occurred."}
          </p>
        </Card>

        <div className="flex items-center justify-center gap-3">
          <Button
            size="md"
            onClick={() => reset()}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Retry Connection
          </Button>

          <Link href="/dashboard">
            <Button
              variant="outline"
              size="md"
              icon={<Home className="w-4 h-4" />}
            >
              Back to Farm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
