
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrganization } from "@/contexts/OrganizationContext";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User } from "lucide-react";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
}

interface AccountSettings {
  timezone: string | null;
  currency: string | null;
}

interface OrganizationData {
  name: string | null;
  industry: string | null;
}

export default function Navbar() {
  const { user, signOut } = useAuth();
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
    org: OrganizationData | null
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
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              Risitify
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <Progress value={profileCompletion} className="w-32" />
                <span className="text-sm text-gray-600">
                  Profile {profileCompletion}%
                </span>
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={profileData?.avatar_url || ""}
                      alt={profileData?.first_name || ""}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profileData?.first_name} {profileData?.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=profile" className="w-full">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings?tab=organization" className="w-full">
                    Organization Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={() => signOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
