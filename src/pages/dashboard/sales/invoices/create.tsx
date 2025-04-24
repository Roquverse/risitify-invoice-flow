import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, X, Upload } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface InvoiceItem {
  id: string;
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

export default function CreateInvoice() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [date, setDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [logo, setLogo] = useState<string>();

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
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
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
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Create New Invoice</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Trust score</span>
              <div className="w-20 h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
              </div>
              <span>75%</span>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Save and Send</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label className="text-gray-500">Logo</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4">
              <div className="flex flex-col items-center gap-2">
                <input
                  type="file"
                  id="logo"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <label
                  htmlFor="logo"
                  className="flex flex-col items-center gap-2 cursor-pointer w-full"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-20 object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-600">Upload file</span>
                      <span className="text-xs text-gray-400">
                        JPG, JPEG, PNG, less than 5MB
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-gray-500">Invoice Number</Label>
            <Input className="mt-2" placeholder="#INV-001" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label className="text-gray-500">Your Company Details</Label>
            <Textarea
              className="mt-2"
              placeholder="Your company name and address"
              rows={4}
            />
          </div>
          <div>
            <Label className="text-gray-500">Bill To</Label>
            <Textarea
              className="mt-2"
              placeholder="Client's company name and address"
              rows={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <Label className="text-gray-500">Date Issued</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="text-gray-500">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label className="text-gray-500">Items</Label>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-12 gap-4 text-sm text-gray-500">
              <div className="col-span-5">Description</div>
              <div className="col-span-2">Rate</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-1"></div>
            </div>
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 items-center"
              >
                <div className="col-span-5">
                  <Input
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.rate}
                    onChange={(e) =>
                      updateItem(item.id, "rate", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.amount}
                    disabled
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-end">
            <div className="w-1/3 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <Input
                  type="number"
                  className="w-24 text-right"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount</span>
                <Input
                  type="number"
                  className="w-24 text-right"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <Input
                  type="number"
                  className="w-24 text-right"
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-between items-center pt-4 border-t font-medium">
                <span>Total</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-500">Notes</Label>
          <Textarea
            className="mt-2"
            placeholder="Payment terms, notes, or any additional information..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
