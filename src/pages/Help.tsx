import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Help() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Help Center</h1>
          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              {/* Add FAQ content here */}
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
              {/* Add getting started guides */}
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
