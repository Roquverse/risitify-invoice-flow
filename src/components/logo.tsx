import { FC } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

const Logo: FC<LogoProps> = ({ className, size = "md", variant = "dark" }) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  const variantClasses = {
    light: "text-white",
    dark: "text-gray-900",
  };

  return (
    <div className={cn("font-bold flex items-center gap-2", className)}>
      <img
        src="/lovable-uploads/39b36c02-3251-478f-94b4-580a32242016.png"
        alt="Risitify Logo"
        className={cn(sizeClasses[size])}
      />
    </div>
  );
};

export default Logo;
