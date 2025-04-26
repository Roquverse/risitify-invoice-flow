
import { Link } from "react-router-dom";
import { Search, Bell, Settings, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useOrganization } from "@/contexts/OrganizationContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface HeaderProps {
  collapsed: boolean;
}

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface AccountSettings {
  timezone: string | null;
  currency: string | null;
}

export function DashboardHeader({ collapsed }: HeaderProps) {
  const { user } = useAuth();
  const { organizationData } = useOrganization();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [accountSettings, setAccountSettings] =
    useState<AccountSettings | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    if (!user?.id) return;

    try {
      // Fetch profile data - using auth_user_id instead of id
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_user_id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile data:", profileError);
      } else {
        setProfileData(profileData);
      }

      // Fetch account settings
      const { data: accountData, error: accountError } = await supabase
        .from("account_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (accountError) {
        console.error("Error fetching account settings:", accountError);
      } else {
        setAccountSettings(accountData);
      }

      calculateProfileCompletion(profileData, accountData, organizationData);
    } catch (error) {
      console.error("Error in fetchProfileData:", error);
    }
  };

  const calculateProfileCompletion = (
    profile: ProfileData | null,
    settings: AccountSettings | null,
    org: { name: string | null; industry: string | null } | null
  ) => {
    let completed = 0;
    let total = 8; // Total number of fields we're checking

    // Check profile fields
    if (profile?.first_name) completed++;
    if (profile?.last_name) completed++;
    if (profile?.avatar_url) completed++;

    // Check organization fields
    if (org?.name) completed++;
    if (org?.industry) completed++;

    // Check account settings
    if (settings?.timezone) completed++;
    if (settings?.currency) completed++;

    // Check if email is verified
    if (user?.email) completed++;

    const percentage = (completed / total) * 100;
    setProfileCompletion(Math.round(percentage));
  };

  return (
    <header
      className={`fixed top-0 z-20 flex h-16 items-center border-b border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "left-20" : "left-64"
      } right-0`}
    >
      <div className="flex flex-1 items-center px-4">
        <div className="relative flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Customers ( / )"
              className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          {/* Profile Completion Progress */}
          <div className="hidden md:flex items-center space-x-2">
            <Progress value={profileCompletion} className="w-32" />
            <span className="text-sm text-gray-600">
              Profile {profileCompletion}%
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            Trial expires in 13 days
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Subscribe Now
          </Button>

          <div className="h-5 w-px bg-gray-200" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem className="text-sm">
                No new notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link to="/settings?tab=profile" className="flex w-full">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings?tab=organization" className="flex w-full">
                  Organization Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2 text-sm font-normal">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                {profileData?.first_name
                  ? `${profileData.first_name} ${profileData.last_name}`
                  : "Loading..."}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem asChild>
                <Link to="/settings?tab=profile" className="flex w-full">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings?tab=organization" className="flex w-full">
                  Organization Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-5 w-px bg-gray-200" />

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Plus className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}
