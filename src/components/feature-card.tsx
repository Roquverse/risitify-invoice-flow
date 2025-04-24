
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("p-6 rounded-lg border bg-card text-card-foreground flex flex-col items-start", className)}>
      <div className="bg-risitify-100 p-3 rounded-lg mb-4">
        <div className="text-risitify-600">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
