import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardOverview() {
  // Mock data - replace with real API calls
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Clients",
      value: "2350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Pending Invoices",
      value: "12",
      change: "-2.1%",
      trend: "down",
      icon: FileText,
    },
    {
      title: "New Orders",
      value: "573",
      change: "+23.1%",
      trend: "up",
      icon: ShoppingCart,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "invoice",
      description: "New invoice #INV-2024-001 created",
      time: "2 minutes ago",
      amount: "$1,234.00",
    },
    {
      id: 2,
      type: "payment",
      description: "Payment received from Acme Corp",
      time: "1 hour ago",
      amount: "$5,678.00",
    },
    {
      id: 3,
      type: "order",
      description: "New order #ORD-2024-002 placed",
      time: "3 hours ago",
      amount: "$890.00",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button className="bg-[#153f32] hover:bg-[#1B4D3E]">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
                <div className="font-medium">{activity.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button variant="outline" className="h-24">
          <div className="flex flex-col items-center gap-2">
            <FileText className="h-6 w-6" />
            <span>Create Invoice</span>
          </div>
        </Button>
        <Button variant="outline" className="h-24">
          <div className="flex flex-col items-center gap-2">
            <Users className="h-6 w-6" />
            <span>Add Client</span>
          </div>
        </Button>
        <Button variant="outline" className="h-24">
          <div className="flex flex-col items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <span>New Order</span>
          </div>
        </Button>
        <Button variant="outline" className="h-24">
          <div className="flex flex-col items-center gap-2">
            <DollarSign className="h-6 w-6" />
            <span>Record Payment</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
