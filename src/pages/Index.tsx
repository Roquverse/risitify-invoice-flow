
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black text-white py-24">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Power Your Product with Built-In Invoice Financing
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Build your products and services for growth. Get paid faster with invoice financing.
              </p>
              <div className="flex gap-4">
                <Button className="bg-emerald-400 hover:bg-emerald-500 text-black" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/lovable-uploads/0058fdc2-965d-4f93-9431-69fe0dd3ed53.png"
                alt="Hero"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['HubSpot', 'Dropbox', 'Square', 'Stripe', 'Atlassian'].map((partner) => (
                <div key={partner} className="text-lg font-semibold">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-lg mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                The Easiest Way to Move Money
              </h2>
              <p className="text-gray-600">
                Simple, fast, and secure payments for your business
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Unlock Your Potential</h3>
                <p className="text-gray-600 text-sm">Get paid immediately on your invoices, no matter when they're due.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Simplify Your Workflow</h3>
                <p className="text-gray-600 text-sm">Manage your invoices and payments all in one place.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Support That Grows With You</h3>
                <p className="text-gray-600 text-sm">Our team is here to help you every step of the way.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">
              Unlock growth with seamless,<br />flexible payments.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black text-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Instant Payments with Invoice Financing</h3>
                <p className="text-gray-300">Get paid immediately on your invoices, regardless of payment terms.</p>
              </div>
              <div className="bg-black text-white p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Flexible Payment Terms for Buyers</h3>
                <p className="text-gray-300">Offer extended payment terms to your customers without affecting your cash flow.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-16">
              Powering Growth with<br />Real Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-bold mb-2">10k+</div>
                <p className="text-gray-600">Active businesses using our platform</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">$50M+</div>
                <p className="text-gray-600">Total payment volume processed</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">92%</div>
                <p className="text-gray-600">Customer satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Click. Pay. Done.</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start getting paid faster with our simple, secure payment solution.
            </p>
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-black" size="lg">
              Get Started
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
