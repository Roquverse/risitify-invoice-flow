import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Settings,
  ChevronRight,
  LogOut,
  ChevronLeft,
  Receipt,
  FileBox,
  CreditCard,
  PieChart,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/logo";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: {
    href: string;
    label: string;
  }[];
}

interface SidebarNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function SidebarNav({ collapsed, setCollapsed }: SidebarNavProps) {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems: NavItem[] = [
    {
      href: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      href: "/dashboard/customers",
      label: "Customers",
      icon: Users,
      subItems: [
        { href: "/dashboard/customers/list", label: "Customer List" },
        { href: "/dashboard/customers/new", label: "Add New Customer" },
      ],
    },
    {
      href: "/dashboard/sales/invoices",
      label: "Invoices",
      icon: Receipt,
      subItems: [
        { href: "/dashboard/sales/invoices", label: "All Invoices" },
        {
          href: "/dashboard/sales/invoices/create",
          label: "Create Invoice",
        },
      ],
    },
    {
      href: "/dashboard/sales/quotes",
      label: "Quotes",
      icon: FileBox,
      subItems: [
        { href: "/dashboard/sales/quotes", label: "All Quotes" },
        { href: "/dashboard/sales/new", label: "Create Quote" },
      ],
    },
    {
      href: "/dashboard/payments",
      label: "Payments",
      icon: CreditCard,
      subItems: [
        { href: "/dashboard/payments/received", label: "Payments Received" },
        { href: "/dashboard/payments/history", label: "Payment History" },
      ],
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      icon: PieChart,
    },
    {
      href: "/dashboard/documents",
      label: "Documents",
      icon: FolderOpen,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 ease-in-out z-30",
          collapsed ? "w-20" : "w-64"
        )}
        style={{ marginRight: 0 }}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <Logo size="sm" variant="dark" className="text-[#153f32]" />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-gray-500 hover:text-[#153f32] hover:bg-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2 mb-24">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  to={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                    isActive(item.href) || activeDropdown === item.href
                      ? "bg-[#153f32] text-white"
                      : "text-gray-700 hover:bg-gray-100",
                    collapsed && "justify-center px-2"
                  )}
                  onClick={(e) => {
                    if (item.subItems) {
                      e.preventDefault();
                      setActiveDropdown(
                        activeDropdown === item.href ? null : item.href
                      );
                    }
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.subItems && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            activeDropdown === item.href && "rotate-90"
                          )}
                        />
                      )}
                    </>
                  )}
                </Link>
                {item.subItems &&
                  activeDropdown === item.href &&
                  !collapsed && (
                    <div className="mt-1 ml-4 pl-4 border-l-2 border-[#153f32]/20">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={cn(
                            "flex items-center py-2 px-3 text-sm rounded-lg transition-colors",
                            isActive(subItem.href)
                              ? "text-[#153f32] font-medium"
                              : "text-gray-600 hover:text-[#153f32]"
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div
          className={cn(
            "fixed bottom-0 left-0 border-t bg-white p-4 z-10",
            collapsed ? "w-20" : "w-64"
          )}
        >
          <div
            className={cn(
              "flex items-center",
              collapsed ? "justify-center" : "gap-3"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-[#153f32] text-white flex items-center justify-center text-sm font-medium">
              AI
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">
                  admin@example.com
                </p>
              </div>
            )}
            {!collapsed && (
              <Link to="/login" className="ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-[#153f32]"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Collapsed state dropdown overlay */}
      {collapsed && activeDropdown && (
        <div
          className="fixed left-16 top-0 h-screen w-56 bg-white border-r shadow-lg z-20"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#153f32]">
              {navItems.find((item) => item.href === activeDropdown)?.label}
            </h3>
          </div>
          <div className="p-2">
            {navItems
              .find((item) => item.href === activeDropdown)
              ?.subItems?.map((subItem) => (
                <Link
                  key={subItem.href}
                  to={subItem.href}
                  className={cn(
                    "flex items-center py-2 px-3 text-sm rounded-lg transition-colors",
                    isActive(subItem.href)
                      ? "text-[#153f32] font-medium bg-gray-50"
                      : "text-gray-600 hover:text-[#153f32] hover:bg-gray-50"
                  )}
                >
                  {subItem.label}
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
