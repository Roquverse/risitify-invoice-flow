import { DashboardShell } from "@/pages/dashboard/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dueDate: string;
}

const columns = [
  {
    accessorKey: "number",
    header: "Invoice #",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }: any) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "paid"
              ? "bg-green-100 text-green-800"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    client: "Acme Corp",
    amount: 1500.0,
    status: "paid",
    date: "2024-03-01",
    dueDate: "2024-03-15",
  },
  {
    id: "2",
    number: "INV-002",
    client: "Globex Inc",
    amount: 2750.0,
    status: "pending",
    date: "2024-03-05",
    dueDate: "2024-03-20",
  },
  {
    id: "3",
    number: "INV-003",
    client: "Initech",
    amount: 980.0,
    status: "overdue",
    date: "2024-02-20",
    dueDate: "2024-03-05",
  },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: {
      paid: true,
      pending: true,
      overdue: true,
    },
  });

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = invoice.client
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status[invoice.status];
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track your invoices
          </p>
        </div>
        <Link to="/dashboard/sales/invoices/create">
          <Button className="bg-[#153f32] hover:bg-[#1B4D3E]">
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <div className="p-2">
              <div className="space-y-2">
                <div className="font-medium">Status</div>
                {Object.keys(filters.status).map((status) => (
                  <DropdownMenuItem key={status} className="flex items-center">
                    <label className="flex items-center space-x-2 flex-1">
                      <input
                        type="checkbox"
                        checked={filters.status[status]}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            status: {
                              ...filters.status,
                              [status]: !filters.status[status],
                            },
                          })
                        }
                        className="form-checkbox h-4 w-4"
                      />
                      <span className="capitalize">{status}</span>
                    </label>
                  </DropdownMenuItem>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <DataTable columns={columns} data={filteredInvoices} />
      </div>
    </div>
  );
}
