import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PlusCircle, FileText, Download, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: "Paid" | "Pending";
  dueDate: string;
}

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.getValue("amount"));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            status === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      return new Date(row.getValue("dueDate")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button variant="ghost" size="sm">
            View
          </Button>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </div>
      );
    },
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "1",
      invoiceNumber: "INV-001",
      client: "Acme Corp",
      amount: 1500.0,
      status: "Paid",
      dueDate: "2024-04-15",
    },
    {
      id: "2",
      invoiceNumber: "INV-002",
      client: "Wayne Enterprises",
      amount: 2300.0,
      status: "Pending",
      dueDate: "2024-04-20",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <p className="text-gray-600">
            Manage your invoices and track payments
          </p>
        </div>
        <Link to="/sales/invoices/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Invoices
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Amount
            </CardTitle>
            <Download className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,300.00</div>
            <p className="text-xs text-gray-500">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <Send className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,500.00</div>
            <p className="text-xs text-gray-500">+22.4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>A list of your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={invoices}
            searchKey="invoiceNumber"
          />
        </CardContent>
      </Card>
    </div>
  );
}
