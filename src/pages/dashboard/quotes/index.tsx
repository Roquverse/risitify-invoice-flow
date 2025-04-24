
import { DashboardShell } from "../components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Quotes() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quotes</h1>
          <Button className="bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900">
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search quotes..."
            className="pl-10 max-w-md"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">No quotes found. Create your first quote!</p>
        </div>
      </div>
    </DashboardShell>
  );
}
