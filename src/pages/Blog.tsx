import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Blog() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Blog</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Add blog posts here */}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
