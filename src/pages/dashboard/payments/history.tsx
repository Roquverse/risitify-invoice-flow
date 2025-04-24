import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

export default function PaymentHistory() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment History
        </h1>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-6 gap-4 p-4 border-b text-sm font-medium text-gray-500">
          <div>Transaction ID</div>
          <div>Date</div>
          <div>Description</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        <div className="p-4 text-sm text-gray-500 text-center">
          No payment history available.
        </div>
      </div>
    </div>
  );
}
