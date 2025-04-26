import { Card } from "@/components/ui/card";
import { useOrganization } from "@/contexts/OrganizationContext";
import {
  CircleDollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const { organizationData } = useOrganization();

  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231.89",
      icon: CircleDollarSign,
      change: "+20.1%",
      changeType: "positive",
    },
    {
      name: "Active Users",
      value: "2,338",
      icon: Users,
      change: "+18.2%",
      changeType: "positive",
    },
    {
      name: "Total Orders",
      value: "1,789",
      icon: ShoppingCart,
      change: "+4.3%",
      changeType: "positive",
    },
    {
      name: "Growth Rate",
      value: "12.5%",
      icon: TrendingUp,
      change: "+2.4%",
      changeType: "positive",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {organizationData?.name}
        </h1>
        <p className="text-gray-500 mt-2">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  stat.changeType === "positive"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                from last month
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New user registration
                    </p>
                    <p className="text-sm text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Create Invoice",
              "Add Product",
              "View Reports",
              "Manage Team",
            ].map((action) => (
              <button
                key={action}
                className="p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <p className="font-medium text-gray-900">{action}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Click to get started
                </p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
