import { DashboardShell } from "../components/dashboard-shell";
import { InvoiceForm } from "@/components/invoice/invoice-form";

export default function NewInvoice() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">New Invoice</h1>
        <InvoiceForm />
      </div>
    </DashboardShell>
  );
}
