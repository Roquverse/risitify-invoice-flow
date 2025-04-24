import { DashboardShell } from "../components/dashboard-shell";
import { InvoiceList } from "@/components/invoice/invoice-list";

export default function Invoices() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <InvoiceList />
      </div>
    </DashboardShell>
  );
}
