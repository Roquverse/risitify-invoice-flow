import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Risitify's services, you agree to be
                bound by these Terms of Service and all applicable laws and
                regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Description of Service
              </h2>
              <p>
                Risitify provides invoice management and financial services
                through its web-based platform. The service includes invoice
                creation, payment processing, and financial reporting tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                3. User Obligations
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain accurate account information</li>
                <li>Protect account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use the service responsibly and ethically</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
              <p>
                Users agree to pay all applicable fees as described in our
                pricing plans. Subscription fees are billed in advance on a
                recurring basis.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
