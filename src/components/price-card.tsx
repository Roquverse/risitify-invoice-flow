
import { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceCardProps extends ButtonHTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  popular?: boolean;
  className?: string;
  buttonText?: string;
}

export function PriceCard({
  name,
  description,
  price,
  period = "month",
  features,
  popular,
  className,
  buttonText = "Get Started",
  ...props
}: PriceCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card p-6 shadow-sm",
        popular && "border-risitify-500 shadow-md",
        className
      )}
      {...props}
    >
      {popular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <div className="bg-risitify-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </div>
        </div>
      )}
      <div>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold">{price}</span>
        {period && (
          <span className="ml-1 text-sm text-muted-foreground">/{period}</span>
        )}
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex text-sm">
            <Check className="mr-2 h-5 w-5 text-risitify-500 shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={cn("mt-6 w-full", popular ? "bg-risitify-500 hover:bg-risitify-600" : "")}
        variant={popular ? "default" : "outline"}
      >
        {buttonText}
      </Button>
    </div>
  );
}
