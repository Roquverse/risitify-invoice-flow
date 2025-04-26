import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/types/supabase";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";
import { useOrganization } from "@/contexts/OrganizationContext";

type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];
type ProfileData = NonNullable<UserSettings["profile"]>;
interface OrganizationData {
  name: string;
  industry: string;
  company_name: string;
  business_type: string;
  registration_number: string;
  tax_id: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  completed?: boolean;
}
type PaymentData = NonNullable<UserSettings["payment"]>;

interface AccountSettings {
  timezone: string;
  currency: string;
}

export default function SettingsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const {
    organizationData,
    updateOrganizationData,
    isLoading,
    syncWithSupabase,
  } = useOrganization();

  const [profileForm, setProfileForm] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    completed: false,
  });

  const [orgForm, setOrgForm] = useState<OrganizationData>({
    name: "",
    industry: "",
    company_name: "",
    business_type: "",
    registration_number: "",
    tax_id: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    completed: false,
  });

  const [paymentForm, setPaymentForm] = useState<PaymentData>({
    account_holder: "",
    account_number: "",
    bank_name: "",
    swift_code: "",
    completed: false,
  });

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    timezone: "",
    currency: "",
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(
    organizationData?.logo || null
  );

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);

        // Load profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, email, phone")
          .eq("auth_user_id", user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast({
            title: "Error",
            description: "Failed to load profile data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (profileData) {
          setProfileForm((prev) => ({
            ...prev,
            first_name: profileData.first_name || "",
            last_name: profileData.last_name || "",
            email: profileData.email || user.email || "",
            phone: profileData.phone || "",
            completed: true,
          }));
        }

        // Load organization data
        const { data: orgData, error: orgError } = await supabase
          .from("organizations")
          .select("*")
          .eq("owner_id", user.id)
          .single();

        if (orgError && orgError.code !== "PGRST116") {
          console.error("Error fetching organization:", orgError);
          toast({
            title: "Error",
            description: "Failed to load organization data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (orgData) {
          setOrgForm((prev) => ({
            ...prev,
            name: orgData.name || "",
            industry: orgData.industry || "",
            company_name: orgData.name || "",
            business_type: orgData.industry || "",
            registration_number: orgData.registration_number || "",
            tax_id: orgData.tax_id || "",
            address: orgData.address || "",
            email: orgData.email || "",
            phone: orgData.phone || "",
            website: orgData.website || "",
            completed: true,
          }));

          if (orgData.logo) {
            setLogoPreview(orgData.logo);
          }
        }

        // Load account settings
        try {
          const { data: accountData, error: accountError } = await supabase
            .from("account_settings")
            .select("timezone, currency")
            .eq("user_id", user.id)
            .single();

          if (accountError) {
            if (accountError.code === "PGRST116") {
              // No settings found, create default settings
              const { error: insertError } = await supabase
                .from("account_settings")
                .insert([
                  {
                    user_id: user.id,
                    timezone: "UTC",
                    currency: "USD",
                  },
                ])
                .single();

              if (insertError) {
                console.error("Error creating account settings:", insertError);
              }

              setAccountSettings({
                timezone: "UTC",
                currency: "USD",
              });
            } else {
              console.error("Error fetching account settings:", accountError);
              toast({
                title: "Error",
                description:
                  "Failed to load account settings. Please try again.",
                variant: "destructive",
              });
            }
            return;
          }

          if (accountData) {
            setAccountSettings({
              timezone: accountData.timezone || "UTC",
              currency: accountData.currency || "USD",
            });
          }
        } catch (error) {
          console.error("Error handling account settings:", error);
          toast({
            title: "Error",
            description: "Failed to handle account settings. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error",
          description: "Failed to load settings data. Please try again.",
          variant: "destructive",
        });
      }
    };

    loadAllData();
  }, []);

  const saveToDatabase = async (
    section: "profile" | "organization" | "payment",
    data: ProfileData | OrganizationData | PaymentData
  ) => {
    if (!userId) return;

    try {
      const { data: existingSettings, error: fetchError } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      const updateData = {
        [section]: { ...data, completed: true },
        user_id: userId,
      };

      if (existingSettings) {
        const { error } = await supabase
          .from("user_settings")
          .update(updateData)
          .eq("user_id", userId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_settings")
          .insert([updateData]);
        if (error) throw error;
      }

      if (section === "organization") {
        const orgData = data as OrganizationData;
        await updateOrganizationData({
          name: orgData.name,
          industry: orgData.business_type,
          registration_number: orgData.registration_number,
          tax_id: orgData.tax_id,
          address: orgData.address,
          email: orgData.email,
          phone: orgData.phone,
          website: orgData.website,
        });
      }

      await syncWithSupabase();

      return true;
    } catch (error) {
      console.error("Error saving to database:", error);
      throw error;
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userId) throw new Error("User not found");

      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: profileForm.first_name,
          last_name: profileForm.last_name,
          email: profileForm.email,
          phone: profileForm.phone,
          updated_at: new Date().toISOString(),
        })
        .eq("auth_user_id", userId);

      if (profileError) throw profileError;

      // Update organization context with relevant data
      await updateOrganizationData({
        name: `${profileForm.first_name} ${profileForm.last_name}`,
        email: profileForm.email,
        phone: profileForm.phone,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userId) throw new Error("User not found");

      // Update organizations table
      const { error: orgError } = await supabase
        .from("organizations")
        .update({
          name: orgForm.name,
          industry: orgForm.industry,
          registration_number: orgForm.registration_number,
          tax_id: orgForm.tax_id,
          address: orgForm.address,
          email: orgForm.email,
          phone: orgForm.phone,
          website: orgForm.website,
          updated_at: new Date().toISOString(),
        })
        .eq("owner_id", userId);

      if (orgError) throw orgError;

      // Update organization context
      await updateOrganizationData({
        name: orgForm.company_name,
        industry: orgForm.business_type,
        registration_number: orgForm.registration_number,
        tax_id: orgForm.tax_id,
        address: orgForm.address,
        email: orgForm.email,
        phone: orgForm.phone,
        website: orgForm.website,
      });

      toast({
        title: "Organization Updated",
        description:
          "Your organization details have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating organization:", error);
      toast({
        title: "Error",
        description: "Failed to update organization details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveToDatabase("payment", paymentForm);
      setPaymentForm((prev) => ({ ...prev, completed: true }));
      toast({
        title: "Payment Settings Updated",
        description: "Your payment settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update payment settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setLogoPreview(base64String);
        try {
          await updateOrganizationData({ logo: base64String });
          toast({
            title: "Logo updated",
            description: "Your company logo has been updated successfully.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update logo. Please try again.",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = async () => {
    setLogoPreview(null);
    try {
      await updateOrganizationData({ logo: null });
      toast({
        title: "Logo removed",
        description: "Your company logo has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove logo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userId) throw new Error("User not found");

      const { error } = await supabase
        .from("account_settings")
        .upsert({
          user_id: userId,
          timezone: accountSettings.timezone,
          currency: accountSettings.currency,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Account Settings Updated",
        description: "Your account settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating account settings:", error);
      toast({
        title: "Error",
        description: "Failed to update account settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs
        defaultValue={searchParams.get("tab") || "profile"}
        className="space-y-6"
      >
        <TabsList className="bg-white border-b border-gray-200 w-full justify-start rounded-none p-0 h-auto">
          <div className="container mx-auto flex gap-6">
            <TabsTrigger
              value="profile"
              className="py-4 px-2 text-sm font-medium data-[state=active]:text-[#0A2722] data-[state=active]:border-b-2 data-[state=active]:border-[#0A2722] rounded-none"
            >
              Profile {profileForm.completed && "✓"}
            </TabsTrigger>
            <TabsTrigger
              value="organization"
              className="py-4 px-2 text-sm font-medium data-[state=active]:text-[#0A2722] data-[state=active]:border-b-2 data-[state=active]:border-[#0A2722] rounded-none"
            >
              Organization {orgForm.completed && "✓"}
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="py-4 px-2 text-sm font-medium data-[state=active]:text-[#0A2722] data-[state=active]:border-b-2 data-[state=active]:border-[#0A2722] rounded-none"
            >
              Account Settings
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your personal details and contact information.
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={profileForm.first_name}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        first_name: e.target.value,
                      }))
                    }
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={profileForm.last_name}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        last_name: e.target.value,
                      }))
                    }
                    placeholder="Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <form onSubmit={handleOrgSubmit} className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Organization Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your organization's information and business details.
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={orgForm.company_name}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        company_name: e.target.value,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Your Company Ltd."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={orgForm.industry}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        industry: e.target.value,
                        business_type: e.target.value,
                      }))
                    }
                    placeholder="Technology"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_number">
                    Registration Number
                  </Label>
                  <Input
                    id="registration_number"
                    value={orgForm.registration_number}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        registration_number: e.target.value,
                      }))
                    }
                    placeholder="123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input
                    id="tax_id"
                    value={orgForm.tax_id}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        tax_id: e.target.value,
                      }))
                    }
                    placeholder="TAX-123456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={orgForm.email}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Business Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={orgForm.phone}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={orgForm.website}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="https://www.company.com"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={orgForm.address}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="123 Business Street, City, Country"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="col-span-2">
                  <Label>Company Logo</Label>
                  <div className="mt-2 flex items-start gap-6">
                    <div className="flex-shrink-0">
                      {logoPreview ? (
                        <div className="relative w-32 h-32">
                          <img
                            src={logoPreview}
                            alt="Company logo"
                            className="w-full h-full object-contain rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={removeLogo}
                            className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow space-y-3">
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("logo-upload")?.click()
                          }
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </Button>
                        <input
                          id="logo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleLogoUpload}
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Recommended: Square image, at least 400x400px. Maximum
                        size: 5MB. Supported formats: PNG, JPG, GIF
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <form onSubmit={handleAccountSubmit} className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Settings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Configure your account preferences and settings.
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={accountSettings.timezone}
                    onChange={(e) =>
                      setAccountSettings((prev) => ({
                        ...prev,
                        timezone: e.target.value,
                      }))
                    }
                    placeholder="UTC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={accountSettings.currency}
                    onChange={(e) =>
                      setAccountSettings((prev) => ({
                        ...prev,
                        currency: e.target.value,
                      }))
                    }
                    placeholder="USD"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
