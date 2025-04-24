import { DashboardShell } from "@/pages/dashboard/components/dashboard-shell";

export default function SalesOverview() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Sales Overview</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Sales overview content will go here.</p>
        </div>
      </div>
    </DashboardShell>
  );
}
