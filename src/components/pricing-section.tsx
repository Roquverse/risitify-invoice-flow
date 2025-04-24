
import { PriceCard } from "@/components/price-card";

export function PricingSection() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span>Start Sending Your</span>
            <br />
            <span className="text-risitify-500">Invoice for Free</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-2xl">
            Choose the right plan for your business needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PriceCard
            name="Free"
            description="Perfect for freelancers and small businesses"
            price="$0"
            features={[
              "Up to 5 clients",
              "5 invoices per month",
              "Basic templates",
              "Email support",
              "Export to PDF"
            ]}
            buttonText="Get Started"
          />
          <PriceCard
            name="Pro"
            description="For growing businesses with more clients"
            price="$19"
            features={[
              "Unlimited clients",
              "Unlimited invoices",
              "Premium templates",
              "Priority email support",
              "Export to PDF & Excel",
              "Recurring invoices",
              "Expense tracking"
            ]}
            buttonText="Start 14-day Trial"
            popular
          />
          <PriceCard
            name="Business"
            description="For larger businesses with multiple users"
            price="$49"
            features={[
              "Everything in Pro",
              "Up to 5 team members",
              "Custom branding",
              "Phone support",
              "API access",
              "Advanced reporting",
              "Custom workflows"
            ]}
            buttonText="Start 14-day Trial"
          />
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            All prices are in USD and billed monthly. Annual billing available with 2 months free.
          </p>
        </div>
      </div>
    </div>
  );
}
