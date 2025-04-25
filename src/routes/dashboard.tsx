
import { Routes, Route } from "react-router-dom";
import { DashboardShell } from "../pages/dashboard/components/dashboard-shell";
import DashboardOverview from "../pages/dashboard/index";
import Settings from "../pages/dashboard/settings";
import InvoicesPage from "../pages/dashboard/sales/invoices";

export function DashboardRoutes() {
  return (
    <DashboardShell>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="settings" element={<Settings />} />
        <Route path="sales/invoices" element={<InvoicesPage />} />
      </Routes>
    </DashboardShell>
  );
}
