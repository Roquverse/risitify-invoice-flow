import { useState } from "react";
import { DashboardShell } from "@/pages/dashboard/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Plus,
  X,
  Image,
  Layout,
  Palette,
  Sun,
  Square,
  FileImage,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoiceItem {
  description: string;
  rate: number;
  qty: number;
  amount: number;
}

interface Tool {
  name: string;
  icon: any;
  panel: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
}

export default function CreateInvoice() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", rate: 0, qty: 0, amount: 0 },
  ]);

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern");
  const [selectedColor, setSelectedColor] = useState<string>("#1E40AF");
  const [selectedBackground, setSelectedBackground] = useState<string>("white");
  const [selectedLayout, setSelectedLayout] = useState<string>("standard");

  const tools: Tool[] = [
    { name: "Template", icon: Layout, panel: "template" },
    { name: "Layout", icon: Image, panel: "layout" },
    { name: "Assets", icon: FileImage, panel: "assets" },
    { name: "Color", icon: Palette, panel: "color" },
    { name: "Background", icon: Sun, panel: "background" },
    { name: "Shapes", icon: Square, panel: "shapes" },
    { name: "Photos", icon: Image, panel: "photos" },
  ];

  const templates: Template[] = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and contemporary design",
      preview: (
        <div className="bg-white p-3 rounded-lg border text-xs">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="w-16 h-8 bg-blue-600 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-4 bg-gray-800 rounded mb-1"></div>
              <div className="w-12 h-2 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex gap-8 mb-4">
            <div className="flex-1">
              <div className="w-12 h-2 bg-gray-400 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-8 h-2 bg-gray-400 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-b py-2 mb-3">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-20 h-6 bg-blue-600 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional and professional",
      preview: (
        <div className="bg-white p-3 rounded-lg border text-xs">
          <div className="text-center mb-4">
            <div className="w-32 h-6 bg-gray-800 mx-auto rounded mb-2"></div>
            <div className="w-24 h-2 bg-gray-400 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="w-12 h-2 bg-gray-400 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div>
              <div className="w-8 h-2 bg-gray-400 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-b py-2 mb-3">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-20 h-6 bg-gray-800 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant",
      preview: (
        <div className="bg-white p-3 rounded-lg border text-xs">
          <div className="mb-4">
            <div className="w-24 h-6 bg-black rounded-sm mb-4"></div>
            <div className="flex gap-8">
              <div>
                <div className="w-12 h-2 bg-gray-400 rounded-sm mb-2"></div>
                <div className="space-y-1">
                  <div className="w-20 h-2 bg-gray-200 rounded-sm"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
              <div>
                <div className="w-8 h-2 bg-gray-400 rounded-sm mb-2"></div>
                <div className="space-y-1">
                  <div className="w-16 h-2 bg-gray-200 rounded-sm"></div>
                  <div className="w-20 h-2 bg-gray-200 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 h-2 bg-gray-200 rounded-sm"></div>
              <div className="h-2 bg-gray-200 rounded-sm"></div>
              <div className="h-2 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-20 h-6 bg-black rounded-sm"></div>
          </div>
        </div>
      ),
    },
    {
      id: "professional",
      name: "Professional",
      description: "Corporate and detailed",
      preview: (
        <div className="bg-white p-3 rounded-lg border text-xs">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
            <div className="text-right">
              <div className="w-24 h-6 bg-gray-800 rounded mb-1"></div>
              <div className="w-16 h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="w-12 h-2 bg-gray-800 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div>
              <div className="w-8 h-2 bg-gray-800 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="w-16 h-2 bg-gray-200 rounded"></div>
                <div className="w-20 h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-2 mb-3">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded"></div>
              <div className="h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-24 h-7 bg-gray-800 rounded"></div>
          </div>
        </div>
      ),
    },
  ];

  const layouts = [
    { id: "standard", name: "Standard" },
    { id: "compact", name: "Compact" },
    { id: "detailed", name: "Detailed" },
  ];

  const colors = [
    "#1E40AF", // Blue
    "#047857", // Green
    "#7C3AED", // Purple
    "#DC2626", // Red
    "#000000", // Black
  ];

  const backgrounds = [
    { id: "white", name: "White" },
    { id: "light", name: "Light Gray" },
    { id: "pattern", name: "Pattern" },
  ];

  const addItem = () => {
    setItems([...items, { description: "", rate: 0, qty: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case "template":
        return (
          <div className="p-4">
            <h3 className="text-sm font-medium mb-4">Choose Template</h3>
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "p-3 rounded-lg text-left transition-all",
                    selectedTemplate === template.id
                      ? "ring-2 ring-blue-600 bg-blue-50"
                      : "hover:bg-gray-50 border"
                  )}
                >
                  <div className="aspect-[1.4] mb-3">{template.preview}</div>
                  <div className="px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-sm">
                        {template.name}
                      </span>
                      {selectedTemplate === template.id && (
                        <Check className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {template.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case "layout":
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-medium">Select Layout</h3>
            <div className="grid grid-cols-1 gap-3">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={cn(
                    "p-3 border rounded-lg text-left transition-colors",
                    selectedLayout === layout.id
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{layout.name}</span>
                    {selectedLayout === layout.id && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case "color":
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-medium">Choose Color</h3>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full",
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-blue-600"
                      : ""
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        );

      case "background":
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-medium">Choose Background</h3>
            <div className="grid grid-cols-1 gap-3">
              {backgrounds.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setSelectedBackground(bg.id)}
                  className={cn(
                    "p-3 border rounded-lg text-left transition-colors",
                    selectedBackground === bg.id
                      ? "border-blue-600 bg-blue-50"
                      : "hover:border-gray-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{bg.name}</span>
                    {selectedBackground === bg.id && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Left Sidebar - Tools */}
      <div className="w-16 border-r border-gray-200 bg-white shrink-0">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() =>
              setActivePanel(activePanel === tool.panel ? null : tool.panel)
            }
            className={cn(
              "flex flex-col items-center justify-center w-full py-2 transition-colors",
              activePanel === tool.panel
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50 text-gray-600"
            )}
          >
            <tool.icon className="h-4 w-4 mb-1" />
            <span className="text-[10px]">{tool.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content - Invoice Form */}
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="border-b border-gray-200">
          <div className="px-6 py-3 flex justify-between items-center">
            <h2 className="text-lg font-medium">Create Invoice</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Generate Invoice
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <Label className="text-sm">Invoice number</Label>
                <Input placeholder="#002121" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Date</Label>
                <div className="relative mt-1">
                  <Input type="date" placeholder="dd/mm/yyyy" />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <Label className="text-sm">Bill from</Label>
                <Textarea
                  placeholder="Your business address"
                  className="mt-1 min-h-[80px] resize-none"
                />
              </div>
              <div>
                <Label className="text-sm">Bill to</Label>
                <Textarea
                  placeholder="Client's address"
                  className="mt-1 min-h-[80px] resize-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium">Items</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addItem}
                  className="h-8"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-2 text-xs font-medium text-gray-600">
                        Description
                      </th>
                      <th className="text-left p-2 text-xs font-medium text-gray-600 w-[150px]">
                        Rate
                      </th>
                      <th className="text-left p-2 text-xs font-medium text-gray-600 w-[100px]">
                        Qty
                      </th>
                      <th className="text-left p-2 text-xs font-medium text-gray-600 w-[150px]">
                        Amount
                      </th>
                      <th className="w-[40px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="p-2">
                          <Input
                            placeholder="Item description"
                            className="border-0 bg-transparent h-8 text-sm w-full"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={item.rate || ""}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].rate = Number(e.target.value);
                              newItems[index].amount =
                                newItems[index].rate * newItems[index].qty;
                              setItems(newItems);
                            }}
                            className="border-0 bg-transparent h-8 text-sm w-full"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            placeholder="0"
                            value={item.qty || ""}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[index].qty = Number(e.target.value);
                              newItems[index].amount =
                                newItems[index].rate * newItems[index].qty;
                              setItems(newItems);
                            }}
                            className="border-0 bg-transparent h-8 text-sm w-full"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            value={item.amount.toFixed(2)}
                            readOnly
                            className="border-0 bg-transparent h-8 text-sm w-full"
                          />
                        </td>
                        <td className="p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(index)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col items-end space-y-2 pt-3">
                <div className="flex items-center gap-4 w-[300px]">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="ml-auto text-sm">
                    $
                    {items
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-4 w-[300px]">
                  <span className="text-sm text-gray-600">Tax:</span>
                  <Input
                    className="ml-auto w-[120px] h-8 text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-center gap-4 w-[300px]">
                  <span className="text-sm text-gray-600">Discount:</span>
                  <Input
                    className="ml-auto w-[120px] h-8 text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-center gap-4 w-[300px] font-medium">
                  <span className="text-sm">Total:</span>
                  <span className="ml-auto text-sm">
                    $
                    {items
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm">Notes</Label>
              <Textarea
                placeholder="Payment terms, conditions, or any additional notes"
                className="mt-1 min-h-[80px] resize-none w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Panel - Tool Options or Preview */}
      <div className="w-[400px] border-l border-gray-200 bg-gray-50 shrink-0">
        {activePanel ? (
          renderPanelContent()
        ) : (
          <div className="p-4">
            <h3 className="text-sm font-medium mb-3">Preview Invoice</h3>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-4">
                <h2
                  className="text-xl font-bold"
                  style={{ color: selectedColor }}
                >
                  INVOICE
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">From</p>
                    <p className="text-sm text-gray-600">Your Company Name</p>
                    <p className="text-sm text-gray-600">Your Address</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">To</p>
                    <p className="text-sm text-gray-600">Client Name</p>
                    <p className="text-sm text-gray-600">Client Address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
