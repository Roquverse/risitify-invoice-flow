
import { FeatureCard } from "@/components/feature-card";
import { FileText, CreditCard, Users, Bell } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="bg-background py-16 sm:py-24" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-3">
            Powerful <span className="text-risitify-500">Invoicing Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
            for Growing Businesses
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Create Professional Invoices"
            description="Create beautiful, customizable invoices in seconds with our easy-to-use templates."
          />
          <FeatureCard
            icon={<CreditCard className="h-6 w-6" />}
            title="Get Paid Faster"
            description="Accept online payments directly from your invoices and get paid up to 2x faster."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Client Management"
            description="Keep track of all your clients, their payment history, and outstanding invoices."
          />
          <FeatureCard
            icon={<Bell className="h-6 w-6" />}
            title="Automated Reminders"
            description="Send automatic payment reminders to clients with overdue invoices."
          />
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-risitify-100/50 p-1 rounded-full inline-flex text-risitify-600 text-xs font-medium mb-4 px-3">
                ANALYTICS DASHBOARD
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Run Your <span className="text-risitify-500">Business</span> on Your Terms Now
              </h2>
              <p className="text-muted-foreground mb-8">
                Track your business performance with real-time analytics. Monitor your sales, revenue, and outstanding invoices all in one place. Make informed decisions to grow your business.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="bg-risitify-100 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-risitify-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-sm">Revenue tracking</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-risitify-100 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-risitify-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-sm">Financial reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-risitify-100 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-risitify-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-sm">Client insights</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-risitify-100 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-risitify-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <p className="text-sm">Payment tracking</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl border p-4">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=512&h=512&q=80"
                  alt="Dashboard Analytics" 
                  className="w-full rounded-md" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
