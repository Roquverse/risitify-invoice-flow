import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateInvoice() {
  const [items, setItems] = useState([
    { description: "", rate: "0.0", qty: "0", amount: "$0.00" },
  ]);

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-white">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Template
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            Layout
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Assets
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            Color
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            Background
          </div>
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
                  + Add Item
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
                          ×
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <Input
                    type="number"
                    className="w-24 text-right"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <Input
                    type="number"
                    className="w-24 text-right"
                    placeholder="0.00"
                  />
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
            {/* Preview content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
