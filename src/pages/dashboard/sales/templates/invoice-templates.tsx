import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TemplateProps {
  selected?: boolean;
  onSelect?: () => void;
  preview: React.ReactNode;
  name: string;
}

function Template({ selected, onSelect, preview, name }: TemplateProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-offset-2",
        selected
          ? "ring-2 ring-[#0066FF] ring-offset-2"
          : "ring-1 ring-gray-200"
      )}
      onClick={onSelect}
    >
      <div className="aspect-[8.5/11] relative">{preview}</div>
      <div className="p-3 border-t">
        <h3 className="font-medium text-sm">{name}</h3>
      </div>
    </Card>
  );
}

export function InvoiceTemplates() {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      preview: (
        <div className="p-4 h-full bg-white">
          <div className="h-8 w-24 bg-[#0066FF] mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-200" />
            <div className="h-4 w-1/2 bg-gray-100" />
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-6 bg-gray-50" />
            <div className="h-6 bg-gray-50" />
            <div className="h-6 bg-gray-50" />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100">
            <div className="h-4 w-3/4 bg-blue-200" />
          </div>
        </div>
      ),
    },
    {
      id: "classic",
      name: "Classic",
      preview: (
        <div className="p-4 h-full bg-white">
          <div className="flex justify-between mb-6">
            <div className="h-12 w-24 bg-gray-200" />
            <div className="text-right space-y-1">
              <div className="h-6 w-24 bg-[#0066FF]" />
              <div className="h-3 w-16 bg-gray-100" />
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <div className="h-6 bg-gray-50" />
            <div className="h-6 bg-gray-50" />
            <div className="h-6 bg-gray-50" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50">
              <div className="h-4 w-full bg-gray-200" />
            </div>
            <div className="p-3 bg-gray-50">
              <div className="h-4 w-full bg-gray-200" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: (
        <div className="p-4 h-full bg-white">
          <div className="border-b-2 border-black pb-4 mb-6">
            <div className="h-8 w-32 bg-black" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="space-y-1">
              <div className="h-3 w-16 bg-gray-400" />
              <div className="h-3 w-24 bg-gray-200" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-16 bg-gray-400" />
              <div className="h-3 w-24 bg-gray-200" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-50" />
            <div className="h-6 bg-gray-50" />
          </div>
          <div className="mt-4 border-t-2 border-black pt-4">
            <div className="h-4 w-1/2 bg-gray-300" />
          </div>
        </div>
      ),
    },
    {
      id: "professional",
      name: "Professional",
      preview: (
        <div className="h-full bg-white">
          <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-400 p-4">
            <div className="h-8 w-24 bg-white/20" />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="space-y-1">
                <div className="h-3 w-16 bg-gray-300" />
                <div className="h-3 w-24 bg-gray-200" />
              </div>
              <div className="space-y-1">
                <div className="h-3 w-16 bg-gray-300" />
                <div className="h-3 w-24 bg-gray-200" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-50" />
              <div className="h-6 bg-gray-50" />
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-white border border-blue-100">
              <div className="h-4 w-3/4 bg-blue-100" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Template
          key={template.id}
          name={template.name}
          preview={template.preview}
        />
      ))}
    </div>
  );
}
