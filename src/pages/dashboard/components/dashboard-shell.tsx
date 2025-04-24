
import { useState } from "react";
import { SidebarNav } from "./sidebar-nav";
import { DashboardHeader } from "./header";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardShellProps {
  children?: React.ReactNode;
  className?: string;
}

export function DashboardShell({
  children,
  className,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNav collapsed={collapsed} setCollapsed={setCollapsed} />
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          !isMobile && (collapsed ? "md:ml-20" : "md:ml-64")
        )}
      >
        <DashboardHeader collapsed={collapsed} />
        <main className="flex-1 overflow-y-auto pt-16">
          <div 
            className={cn(
              "mx-auto p-4 md:p-6 w-full", 
              className
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
