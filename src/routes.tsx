import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardPage from "@/pages/dashboard";
import Index from "@/pages/Index";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import InvoicesPage from "@/pages/dashboard/sales/invoices";
import CreateInvoice from "@/pages/dashboard/sales/invoices/create";
import SettingsPage from "@/pages/dashboard/settings";

// Placeholder components for routes
const SalesOverview = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Sales Overview</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Sales overview content will go here.</p>
    </div>
  </div>
);

const Customers = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Customers</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Customers list will go here.</p>
    </div>
  </div>
);

const Purchases = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Purchases</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Purchases overview will go here.</p>
    </div>
  </div>
);

const Bills = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Bills</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Bills list will go here.</p>
    </div>
  </div>
);

const Vendors = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Vendors</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Vendors list will go here.</p>
    </div>
  </div>
);

const Reports = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Reports</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Reports dashboard will go here.</p>
    </div>
  </div>
);

const Documents = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Documents</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Documents library will go here.</p>
    </div>
  </div>
);

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route
        path="/auth"
        element={user ? <Navigate to="/dashboard" replace /> : <Index />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Settings Routes */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/profile"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/organization"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/account"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Sales Routes */}
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <SalesOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales/invoices"
        element={
          <ProtectedRoute>
            <InvoicesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales/invoices/create"
        element={
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />

      {/* Purchases Routes */}
      <Route
        path="/purchases"
        element={
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        }
      />
      <Route
        path="/purchases/bills"
        element={
          <ProtectedRoute>
            <Bills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/purchases/vendors"
        element={
          <ProtectedRoute>
            <Vendors />
          </ProtectedRoute>
        }
      />

      {/* Other Routes */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/auth"} replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
