import { Route, Routes } from "react-router-dom";
import DashboardOverview from "@/pages/dashboard/index";
import { DashboardShell } from "@/pages/dashboard/components/dashboard-shell";
import CustomerList from "@/pages/dashboard/customers/list";
import InvoicesPage from "@/pages/dashboard/sales/invoices/index";
import CreateInvoice from "@/pages/dashboard/sales/invoices/create";
import QuotesPage from "@/pages/dashboard/sales/quotes";
import PaymentsReceived from "@/pages/dashboard/payments/received";
import PaymentHistory from "@/pages/dashboard/payments/history";

import NewCustomer from "@/pages/dashboard/customers/new";
import SettingsPage from "@/pages/dashboard/settings";

// Creating simple components for each route
const Dashboard = () => (
  <DashboardShell>
    <DashboardOverview />
  </DashboardShell>
);

const Reports = () => (
  <DashboardShell>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Reports content will go here.</p>
      </div>
    </div>
  </DashboardShell>
);

const Documents = () => (
  <DashboardShell>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Documents</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Documents content will go here.</p>
      </div>
    </div>
  </DashboardShell>
);

const Settings = () => (
  <DashboardShell>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Settings content will go here.</p>
      </div>
    </div>
  </DashboardShell>
);

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      {/* Customer Routes */}
      <Route path="customers">
        <Route
          index
          element={
            <DashboardShell>
              <CustomerList />
            </DashboardShell>
          }
        />
        <Route
          path="list"
          element={
            <DashboardShell>
              <CustomerList />
            </DashboardShell>
          }
        />
        <Route
          path="new"
          element={
            <DashboardShell>
              <NewCustomer />
            </DashboardShell>
          }
        />
      </Route>

      {/* Sales Routes */}
      <Route path="sales">
        <Route
          path="invoices"
          element={
            <DashboardShell>
              <InvoicesPage />
            </DashboardShell>
          }
        />
        <Route
          path="invoices/create"
          element={
            <DashboardShell>
              <CreateInvoice />
            </DashboardShell>
          }
        />
        <Route
          path="quotes"
          element={
            <DashboardShell>
              <QuotesPage />
            </DashboardShell>
          }
        />
      </Route>

      {/* Payments Routes */}
      <Route path="payments">
        <Route
          path="received"
          element={
            <DashboardShell>
              <PaymentsReceived />
            </DashboardShell>
          }
        />
        <Route
          path="history"
          element={
            <DashboardShell>
              <PaymentHistory />
            </DashboardShell>
          }
        />
      </Route>

      {/* Additional Routes */}
      <Route path="reports" element={<Reports />} />
      <Route path="documents" element={<Documents />} />
      <Route
        path="settings"
        element={
          <DashboardShell>
            <SettingsPage />
          </DashboardShell>
        }
      />
    </Routes>
  );
}
