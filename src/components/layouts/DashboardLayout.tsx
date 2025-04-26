import { useState } from "react";
import { DashboardHeader } from "@/pages/dashboard/components/header";
import { SidebarNav } from "@/pages/dashboard/components/sidebar-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <DashboardHeader collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto pt-16">
          <div className="mx-auto p-4 md:p-6 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
