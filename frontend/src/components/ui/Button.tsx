import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[#15803d] text-white hover:bg-[#166534] focus:ring-[#15803d] shadow-sm",
      secondary:
        "bg-[#ecfdf5] text-[#15803d] hover:bg-[#d1fae5] focus:ring-[#15803d] border border-[#bbf7d0]",
      outline:
        "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
      ghost:
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-5 py-3 gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
