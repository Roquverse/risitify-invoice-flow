import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  FileCheck,
  CreditCard,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Crown,
  Building2,
  Plus,
  UserPlus,
  FileUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  // This would come from your auth/organization context in a real app
  const [organization] = useState({
    name: "Acme Corp",
    logo: null, // Set to null to show the fallback icon
    email: "admin@acmecorp.com",
  });

  // This would come from your admin settings in a real app
  const [adContent] = useState({
    title: "Upgrade to Pro",
    description: "Get access to advanced features and priority support",
    ctaText: "Upgrade Now",
    ctaLink: "/dashboard/billing/upgrade",
  });

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Customers",
      path: "/dashboard/customers",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Invoices",
      path: "/dashboard/sales/invoices",
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      label: "Quotes",
      path: "/dashboard/quotes",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: "Payments",
      path: "/dashboard/payments",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r flex flex-col transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && (
            <img src="/logo.png" alt="Risitify" className="h-8" />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "p-1 hover:bg-gray-100 rounded-lg text-gray-500",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className={cn("p-4 border-b", isCollapsed && "hidden")}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Quotes ( / )"
              className="w-full bg-gray-50 border rounded-md pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
                isCollapsed && "justify-center",
                isActive(item.path)
                  ? "bg-[#0A2722] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon}
              {!isCollapsed && item.label}
            </Link>
          ))}
        </nav>

        {/* Ad Section */}
        {!isCollapsed && (
          <div className="p-4 border-t bg-gradient-to-br from-[#0A2722] to-[#124842] text-white">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <h3 className="font-medium text-sm">{adContent.title}</h3>
            </div>
            <p className="text-xs text-gray-200 mb-3">
              {adContent.description}
            </p>
            <Link
              to={adContent.ctaLink}
              className="block text-center bg-white text-[#0A2722] text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {adContent.ctaText}
            </Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium">
              Trial expires in 27 days
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Button
              variant="default"
              className="bg-[#0A2722] hover:bg-[#0A2722]/90 text-white"
            >
              Subscribe Now
            </Button>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard/sales/invoices/create"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Create Invoice</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard/customers/new"
                      className="flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>New Client</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard/quotes/create"
                      className="flex items-center gap-2"
                    >
                      <FileUp className="w-4 h-4" />
                      <span>Create Quote</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 border-l pl-4">
                {organization.logo ? (
                  <img
                    src={organization.logo}
                    alt={organization.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#0A2722] text-white flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {organization.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {organization.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
