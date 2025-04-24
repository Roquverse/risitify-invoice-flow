import React from "react";
import { DashboardShell } from "./components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, DollarSign, FileText, Users, Clock } from "lucide-react";

export default function Overview() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      title: "Active Invoices",
      value: "24",
      change: "+3",
      icon: FileText,
    },
    {
      title: "Total Clients",
      value: "48",
      change: "+5",
      icon: Users,
    },
    {
      title: "Average Payment Time",
      value: "7 days",
      change: "-2 days",
      icon: Clock,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "invoice",
      description: "Invoice #1234 was paid by John Doe",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "client",
      description: "New client added: Jane Smith",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "invoice",
      description: "Invoice #1235 was sent to Acme Corp",
      time: "1 day ago",
    },
  ];

  return (
    <DashboardShell>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <Button className="bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900">
            Create New Invoice
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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
                    <div>
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Invoice #1236 - Acme Corp
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due in 3 days
                    </p>
                  </div>
                  <p className="text-sm font-medium">$2,500</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Invoice #1237 - XYZ Inc
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due in 5 days
                    </p>
                  </div>
                  <p className="text-sm font-medium">$1,800</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
