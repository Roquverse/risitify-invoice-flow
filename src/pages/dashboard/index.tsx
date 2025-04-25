import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  FileText,
  ShoppingCart,
  CheckCircle2,
  CircleDot,
  Info,
  Bell,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/types/supabase";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"] & {
  banking?: {
    completed: boolean;
  };
};

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("getting-started");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [onboardingSteps, setOnboardingSteps] = useState([
    {
      id: "org-details",
      title: "Add organization details",
      description:
        "Add your organization's address and tax details to auto-populate them when you create transactions.",
      action: {
        text: "Add Tax Details",
        href: "/dashboard/settings?tab=organization",
      },
      secondaryAction: {
        text: "Add Address",
        href: "/dashboard/settings?tab=organization",
      },
    },
    {
      id: "first-invoice",
      title: "Create your first invoice",
      description: "Start billing your customers and get paid faster.",
      action: {
        text: "Create Invoice",
        href: "/dashboard/sales/invoices/new",
      },
    },
    {
      id: "first-bill",
      title: "Create your first bill and expense",
      description: "Record your purchases and expenses to track your spending.",
      action: {
        text: "Create Bill",
        href: "/dashboard/purchases/bills/new",
      },
    },
  ]);

  // Recent updates data
  const recentUpdates = [
    {
      id: 1,
      title: "New Invoice Template Added",
      date: "2 hours ago",
      type: "feature",
      description:
        "A new professional invoice template is now available for all users.",
    },
    {
      id: 2,
      title: "System Maintenance Complete",
      date: "1 day ago",
      type: "maintenance",
      description:
        "Successfully completed system updates to improve performance.",
    },
    {
      id: 3,
      title: "Mobile App Beta Release",
      date: "3 days ago",
      type: "release",
      description: "Our mobile app beta version is now available for testing.",
    },
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: settings } = await supabase
            .from("user_settings")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (settings?.profile?.first_name) {
            setUserName(settings.profile.first_name);
          }

          // Update completion status from database
          if (settings) {
            const completed = [];
            if (settings.organization?.completed) completed.push("org-details");
            if (settings.payment?.completed) completed.push("first-invoice");
            if (settings.profile?.completed) completed.push("first-bill");
            setCompletedSteps(completed);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    // Check localStorage for completion status
    const updateCompletionStatus = () => {
      const updatedSteps = onboardingSteps.map((step) => {
        const savedData = localStorage.getItem(step.id);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          return { ...step, completed: parsedData.completed };
        }
        return step;
      });
      setOnboardingSteps(updatedSteps);
    };

    // Initial check
    updateCompletionStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateCompletionStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleMarkAllComplete = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const updateData = {
        profile: { ...onboardingSteps[3], completed: true },
        organization: { ...onboardingSteps[0], completed: true },
        payment: { ...onboardingSteps[1], completed: true },
        user_id: user.id,
      };

      const { error } = await supabase.from("user_settings").upsert(updateData);

      if (error) throw error;

      const updatedSteps = onboardingSteps.map((step) => ({
        ...step,
        completed: true,
      }));

      setOnboardingSteps(updatedSteps);

      // Update localStorage
      updatedSteps.forEach((step) => {
        localStorage.setItem(step.id, JSON.stringify({ completed: true }));
      });

      toast({
        title: "All steps marked as complete",
        description: "Your onboarding process has been completed.",
      });
    } catch (error) {
      console.error("Error marking all complete:", error);
      toast({
        title: "Error",
        description: "Failed to mark all steps as complete. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const completionPercentage =
    (completedSteps.length / onboardingSteps.length) * 100;

  // Stats data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Customers",
      value: "2,350",
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

  // Announcements data
  const announcements = [
    {
      id: 1,
      title: "New Features Released",
      date: "April 24, 2024",
      description:
        "We've added new invoice templates and improved the payment processing system.",
      link: "#",
    },
    {
      id: 2,
      title: "Important Tax Updates",
      date: "April 22, 2024",
      description:
        "Updated tax calculations for the new fiscal year. Please review your tax settings.",
      link: "#",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {userName ? `Hello, ${userName}!` : "Welcome to Risitify"}
          </h1>
          <p className="text-gray-600">
            The easy-to-use accounting software that you can set up in no time!
          </p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Info className="h-4 w-4" />
          <span>Overview of Risitify</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-200 w-full justify-start space-x-8 bg-transparent h-12">
          <TabsTrigger
            value="dashboard"
            className="border-b-2 border-transparent px-0 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="getting-started"
            className="border-b-2 border-transparent px-0 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Getting Started
          </TabsTrigger>
          <TabsTrigger
            value="announcements"
            className="border-b-2 border-transparent px-0 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent relative"
          >
            Announcements
            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
              {announcements.length}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="recent-updates"
            className="border-b-2 border-transparent px-0 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Recent Updates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-blue-50 p-2">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </span>
                  <span
                    className={`flex items-center text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="ml-1 h-4 w-4" />
                    )}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </h3>
                  <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-6">
          <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      <Bell className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{announcement.title}</h3>
                        <span className="text-sm text-gray-500">
                          {announcement.date}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">
                        {announcement.description}
                      </p>
                    </div>
                  </div>
                  <Link to={announcement.link}>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent-updates" className="mt-6">
          <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-200">
            {recentUpdates.map((update) => (
              <div key={update.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{update.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {update.description}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {update.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="getting-started" className="mt-6">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Let's get you up and running
                </h2>
                <Button variant="outline" onClick={handleMarkAllComplete}>
                  Mark as Completed
                </Button>
              </div>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-green-500 transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {completionPercentage}% Completed
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {onboardingSteps.map((step) => (
                <div key={step.id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {isStepCompleted(step.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {step.description}
                      </p>
                      <div className="mt-3 flex items-center space-x-3">
                        <Button
                          variant="default"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Link to={step.action.href}>{step.action.text}</Link>
                        </Button>
                        {step.secondaryAction && (
                          <Button variant="outline">
                            <Link to={step.secondaryAction.href}>
                              {step.secondaryAction.text}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
