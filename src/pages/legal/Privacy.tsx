import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose max-w-none">
            {/* Add privacy policy content here */}
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
