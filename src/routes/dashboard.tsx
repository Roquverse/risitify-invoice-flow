import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "../components/layouts/dashboard-layout";
import CreateInvoice from "../pages/dashboard/sales/invoices/create";

// Placeholder components
const DashboardHome = () => <div>Dashboard Home</div>;
const Customers = () => <div>Customers</div>;
const InvoicesList = () => <div>Invoices List</div>;
const Quotes = () => <div>Quotes</div>;
const Payments = () => <div>Payments</div>;
const Settings = () => <div>Settings</div>;

export function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales/invoices" element={<InvoicesList />} />
        <Route path="/sales/invoices/create" element={<CreateInvoice />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}
