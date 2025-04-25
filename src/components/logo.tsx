import { FC } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.png" alt="logo" className="w-30 h-10" />
    </div>
  );
}
