import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LayoutTemplate,
  Layout,
  Image,
  Palette,
  SquareStack,
  Plus,
  X,
} from "lucide-react";

export default function CreateInvoice() {
  const [items, setItems] = useState([
    { description: "", rate: "0.0", qty: "0", amount: "$0.00" },
  ]);

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4 space-y-4">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-50">
            <LayoutTemplate className="w-5 h-5" />
            Template
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-50">
            <Layout className="w-5 h-5" />
            Layout
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-50">
            <Image className="w-5 h-5" />
            Assets
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-50">
            <Palette className="w-5 h-5" />
            Color
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-50">
            <SquareStack className="w-5 h-5" />
            Background
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-semibold">Create Invoice</h1>
            <div className="flex gap-3">
              <Button variant="outline">Preview Invoice</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Generate Invoice
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Invoice number
                </label>
                <Input placeholder="#002121" className="max-w-[200px]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input type="date" className="max-w-[200px]" />
              </div>
            </div>

            {/* Bill From/To */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bill from
                </label>
                <Textarea
                  placeholder="Your business address"
                  className="h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bill to
                </label>
                <Textarea placeholder="Client's address" className="h-24" />
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium">Items</label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setItems([
                      ...items,
                      {
                        description: "",
                        rate: "0.0",
                        qty: "0",
                        amount: "$0.00",
                      },
                    ])
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Rate</th>
                    <th className="text-right py-2">Qty</th>
                    <th className="text-right py-2">Amount</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 pr-4">
                        <Input
                          placeholder="Item description"
                          value={item.description}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <Input
                          type="number"
                          className="text-right"
                          value={item.rate}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <Input
                          type="number"
                          className="text-right"
                          value={item.qty}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <div className="text-right">{item.amount}</div>
                      </td>
                      <td className="py-2 pl-4">
                        <button
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            const newItems = [...items];
                            newItems.splice(index, 1);
                            setItems(newItems);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax:</span>
                  <Input
                    type="number"
                    className="w-24 text-right"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount:</span>
                  <Input
                    type="number"
                    className="w-24 text-right"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Notes</label>
              <Textarea
                placeholder="Payment terms, conditions, or any additional notes..."
                className="h-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-96 border-l bg-gray-50">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Preview Invoice</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center text-gray-500">
              Invoice preview will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
