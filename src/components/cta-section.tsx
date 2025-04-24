
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <div className="bg-risitify-500 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to streamline your invoicing?
        </h2>
        <p className="mt-4 text-lg text-white/80 mx-auto max-w-2xl">
          Join thousands of businesses who use Risitify to get paid faster and manage their finances more efficiently.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Start For Free
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              Contact Sales
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/70">
          No credit card required. 14-day free trial.
        </p>
      </div>
    </div>
  );
}
