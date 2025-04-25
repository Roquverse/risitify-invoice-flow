import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Upload, Calendar } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState<File | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [companyDetails, setCompanyDetails] = useState("");
  const [billTo, setBillTo] = useState("");
  const [dateIssued, setDateIssued] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [notes, setNotes] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [trustScore, setTrustScore] = useState(75); // Example trust score

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: "",
      rate: 0,
      quantity: 1,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    calculateTotals();
  };

  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "rate" || field === "quantity") {
            updatedItem.amount =
              Number(updatedItem.rate) * Number(updatedItem.quantity);
          }
          return updatedItem;
        }
        return item;
      })
    );
    calculateTotals();
  };

  const calculateTotals = () => {
    const newSubtotal = items.reduce((sum, item) => sum + item.amount, 0);
    setSubtotal(newSubtotal);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving invoice...");
  };

  const handleSaveAndSend = () => {
    // TODO: Implement save and send functionality
    console.log("Saving and sending invoice...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1200px] mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create Invoice</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Trust score
              <span className="ml-2 text-orange-500 font-medium">
                {trustScore}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div>
            <div className="mb-6">
              <Label>Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="cursor-pointer text-center p-4"
                  >
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload file</span>
                    <span className="block text-xs text-gray-400">
                      JPG, JPEG, PNG, less than 5MB
                    </span>
                  </label>
                </div>
                {logo && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLogo(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Label>Your company details</Label>
              <Textarea
                value={companyDetails}
                onChange={(e) => setCompanyDetails(e.target.value)}
                placeholder="Enter your company name and address"
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="mb-6">
              <Label>Date issued</Label>
              <DatePicker
                date={dateIssued}
                setDate={setDateIssued}
                className="mt-2"
              />
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-6">
              <Label>Invoice number</Label>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="#000121"
                className="mt-2"
              />
            </div>

            <div className="mb-6">
              <Label>Bill to</Label>
              <Textarea
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                placeholder="Enter client billing address"
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="mb-6">
              <Label>Due date</Label>
              <DatePicker
                date={dueDate}
                setDate={setDueDate}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-right py-2 w-32">Rate</th>
                <th className="text-right py-2 w-24">Qty</th>
                <th className="text-right py-2 w-32">Amount</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                      placeholder="Item description"
                    />
                  </td>
                  <td className="py-2">
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(item.id, "rate", parseFloat(e.target.value))
                      }
                      className="text-right"
                    />
                  </td>
                  <td className="py-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          item.id,
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                      className="text-right"
                    />
                  </td>
                  <td className="py-2 text-right">${item.amount.toFixed(2)}</td>
                  <td className="py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            variant="outline"
            size="sm"
            onClick={addItem}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <Label>Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes"
            className="mt-2"
            rows={3}
          />
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-72">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax</span>
              <Input
                type="number"
                value={tax}
                onChange={(e) => setTax(parseFloat(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <div className="flex justify-between py-2">
              <span>Discount</span>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping fee</span>
              <Input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(parseFloat(e.target.value))}
                className="w-24 text-right"
              />
            </div>
            <div className="flex justify-between py-2 border-t mt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ${(subtotal + tax - discount + shippingFee).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleSaveAndSend}>Save and Send</Button>
        </div>
      </div>
    </div>
  );
}
