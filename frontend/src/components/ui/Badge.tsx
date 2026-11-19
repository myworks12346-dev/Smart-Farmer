import React from "react";
import { cn } from "@/lib/utils";
import { RiskSeverity } from "@/types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "neutral";
  severity?: RiskSeverity;
}

export function Badge({
  className,
  variant = "default",
  severity,
  children,
  ...props
}: BadgeProps) {
  // If severity is provided, map automatically to corresponding risk theme
  let computedVariant = variant;
  if (severity) {
    if (severity === "low") computedVariant = "success";
    if (severity === "moderate") computedVariant = "warning";
    if (severity === "high" || severity === "critical") computedVariant = "danger";
  }

  const variantClasses = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    neutral: "bg-stone-100 text-stone-700 border-stone-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    info: "bg-sky-50 text-sky-700 border-sky-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variantClasses[computedVariant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
