
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32 border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span>Improve Your</span>
              <br />
              <span className="text-risitify-500">Invoice</span>
              <span> to be Paid</span>
              <br />
              <span>More Quickly</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Professional invoicing software that helps you get paid on time. Easy to use, customizable templates, and automated reminders to help you get paid faster.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-risitify-500 hover:bg-risitify-600">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/#features">
                <Button size="lg" variant="outline">
                  See How it Works
                </Button>
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Free 14-day trial.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-risitify-500/20 to-transparent rounded-3xl transform rotate-3 scale-105" />
            <div className="relative bg-white p-4 rounded-2xl shadow-xl border">
              <img
                src="/lovable-uploads/1100e5d4-f211-4611-90ef-bc6c3e83993c.png"
                alt="Risitify Invoice App"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-risitify-500/10 w-24 h-24 rounded-full" />
            <div className="absolute -top-6 -left-6 bg-risitify-500/10 w-16 h-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
