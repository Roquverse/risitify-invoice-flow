import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function InvoicesPage() {
  return (
    <div className="h-full flex-1">
      <div className="flex flex-col h-full">
        <div className="flex-none p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  className="w-[200px] pl-8"
                />
              </div>
              <Link to="/dashboard/sales/invoices/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 pt-0">
          <Card className="h-full">
            <div className="relative w-full h-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>INV-001</TableCell>
                    <TableCell>Acme Corp</TableCell>
                    <TableCell>2024-03-01</TableCell>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>$1,000.00</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Paid
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
