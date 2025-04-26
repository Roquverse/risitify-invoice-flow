import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingCart,
  CreditCard,
  Clock,
  Users,
  FileText,
  Settings,
  ChevronRight,
  BarChart2,
  Files,
  List,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/components/logo";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  children?: NavItem[];
}

interface SidebarNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
    badge: 2,
  },
  {
    title: "Sales",
    href: "/sales",
    icon: ShoppingCart,
    children: [
      {
        title: "Invoices",
        href: "/sales/invoices",
        icon: FileText,
      },
      {
        title: "Customers",
        href: "/sales/customers",
        icon: Users,
      },
    ],
  },
  {
    title: "Purchases",
    href: "/dashboard/purchases",
    icon: ShoppingCart,
    children: [
      {
        title: "Bills",
        href: "/dashboard/purchases/bills",
        icon: FileText,
      },
      {
        title: "Vendors",
        href: "/dashboard/purchases/vendors",
        icon: Users,
      },
    ],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart2,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: Files,
  },
];

export function SidebarNav({ collapsed, setCollapsed }: SidebarNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === item.href ? null : item.href);
    } else {
      navigate(item.href);
    }
  };

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
          {!collapsed && <Logo size="sm" className="text-[#153f32]" />}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-gray-500 hover:text-[#153f32] hover:bg-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronRight />}
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2 mb-24">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.href ||
                item.children?.some(
                  (child) => location.pathname === child.href
                );

              return (
                <div key={item.href} className="relative">
                  <button
                    onClick={(e) => handleItemClick(item, e)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                      isActive
                        ? "bg-[#153f32] text-white"
                        : "text-gray-700 hover:bg-gray-100",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                            {item.badge}
                          </span>
                        )}
                        {item.children && (
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              activeDropdown === item.href && "rotate-90"
                            )}
                          />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed &&
                    item.children &&
                    activeDropdown === item.href && (
                      <div className="mt-1 ml-4 pl-4 border-l-2 border-[#153f32]/20">
                        {item.children.map((child) => (
                          <button
                            key={child.href}
                            onClick={() => navigate(child.href)}
                            className={cn(
                              "flex items-center py-2 px-3 text-sm rounded-lg transition-colors w-full",
                              location.pathname === child.href
                                ? "text-[#153f32] font-medium"
                                : "text-gray-600 hover:text-[#153f32]"
                            )}
                          >
                            <child.icon className="h-4 w-4 mr-2" />
                            <span>{child.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
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
              {navItems.find((item) => item.href === activeDropdown)?.title}
            </h3>
          </div>
          <div className="p-2">
            {navItems
              .find((item) => item.href === activeDropdown)
              ?.children?.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "flex items-center py-2 px-3 text-sm rounded-lg transition-colors",
                    location.pathname === child.href
                      ? "text-[#153f32] font-medium"
                      : "text-gray-600 hover:text-[#153f32] hover:bg-gray-50"
                  )}
                >
                  <child.icon className="h-4 w-4" />
                  <span>{child.title}</span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
