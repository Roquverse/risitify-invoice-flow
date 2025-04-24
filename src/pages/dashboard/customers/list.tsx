
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomerList() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <Button 
          className="bg-[#153f32] hover:bg-[#1B4D3E]"
          asChild
        >
          <Link to="/dashboard/customers/new">
            <Plus className="h-4 w-4 mr-2" />
            New Customer
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search customers..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-6 gap-4 p-4 border-b text-sm font-medium text-gray-500">
          <div>Name</div>
          <div>Company</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Outstanding</div>
          <div>Actions</div>
        </div>
        <div className="p-4 text-sm text-gray-500 text-center">
          No customers found. Create your first customer to get started.
        </div>
      </div>
    </div>
  );
}
