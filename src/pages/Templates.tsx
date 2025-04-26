import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function Templates() {
  const templates = [
    {
      name: "Professional Invoice",
      description: "Clean and modern design for businesses",
      image: "/templates/professional.png",
      category: "Business",
    },
    {
      name: "Freelancer Invoice",
      description: "Simple and effective for independent workers",
      image: "/templates/freelancer.png",
      category: "Freelance",
    },
    {
      name: "Creative Agency",
      description: "Stylish template for creative businesses",
      image: "/templates/creative.png",
      category: "Creative",
    },
    {
      name: "Consultant Invoice",
      description: "Detailed template for consulting services",
      image: "/templates/consultant.png",
      category: "Consulting",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Invoice Templates</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our professionally designed templates to create
              stunning invoices that match your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {/* Placeholder for template preview */}
                  <div className="flex items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-[#84ebdb] font-medium">
                    {template.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {template.description}
                  </p>
                  <Button className="w-full mt-4 bg-[#0A2722] hover:bg-[#0A2722]/90 text-white">
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
