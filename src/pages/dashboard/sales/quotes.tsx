import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function QuotesPage() {
  const [items, setItems] = useState([
    { description: "", rate: "", qty: "", amount: "" },
  ]);

  const addItem = () => {
    setItems([...items, { description: "", rate: "", qty: "", amount: "" }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Quote</h1>
        <Button className="bg-[#0066FF] hover:bg-blue-600">
          Generate Quote
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Quote Form */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Quote number</Label>
                <Input placeholder="#Q002121" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>From</Label>
                  <Input placeholder="Your business name" />
                </div>
                <div>
                  <Label>To</Label>
                  <Input placeholder="Client's business name" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Quote date</Label>
                  <div className="relative">
                    <Input type="date" />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label>Expiry date</Label>
                  <div className="relative">
                    <Input type="date" />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Items</h3>
                <Button variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-start"
                  >
                    <div className="col-span-6">
                      <Label>Description</Label>
                      <Input placeholder="Item description" />
                    </div>
                    <div className="col-span-2">
                      <Label>Rate</Label>
                      <Input placeholder="0.00" type="number" />
                    </div>
                    <div className="col-span-2">
                      <Label>Qty</Label>
                      <Input placeholder="1" type="number" />
                    </div>
                    <div className="col-span-1">
                      <Label>Amount</Label>
                      <Input placeholder="0.00" readOnly />
                    </div>
                    <div className="col-span-1 pt-8">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Terms & Notes</h3>
              <Textarea
                placeholder="Add terms, conditions, and any additional notes"
                className="h-24 resize-none"
              />
            </div>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div>
          <Card className="p-6">
            <Tabs defaultValue="preview">
              <TabsList className="w-full">
                <TabsTrigger value="preview" className="flex-1">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="template" className="flex-1">
                  Template
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <div className="aspect-[8.5/11] bg-white border rounded-lg p-8">
                  {/* Quote Preview will be rendered here */}
                  <div className="text-center text-gray-400">
                    Quote preview will appear here
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="template" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Template thumbnails will go here */}
                </div>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                {/* Settings form will go here */}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
