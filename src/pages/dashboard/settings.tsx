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

type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];
type ProfileData = NonNullable<UserSettings["profile"]>;
type OrganizationData = NonNullable<UserSettings["organization"]>;
type PaymentData = NonNullable<UserSettings["payment"]>;

export default function SettingsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    completed: false,
  });

  const [orgForm, setOrgForm] = useState<OrganizationData>({
    company_name: "",
    business_type: "",
    registration_number: "",
    tax_id: "",
    address: "",
    completed: false,
  });

  const [paymentForm, setPaymentForm] = useState<PaymentData>({
    account_holder: "",
    account_number: "",
    bank_name: "",
    swift_code: "",
    completed: false,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          const { data: settings } = await supabase
            .from("user_settings")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (settings) {
            if (settings.profile) {
              setProfileForm(settings.profile as ProfileData);
              localStorage.setItem(
                "profile_settings",
                JSON.stringify(settings.profile)
              );
            }
            if (settings.organization) {
              setOrgForm(settings.organization as OrganizationData);
              localStorage.setItem(
                "org_settings",
                JSON.stringify(settings.organization)
              );
            }
            if (settings.payment) {
              setPaymentForm(settings.payment as PaymentData);
              localStorage.setItem(
                "payment_settings",
                JSON.stringify(settings.payment)
              );
            }
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
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

      // Check if all sections are completed
      const allCompleted = [
        section === "profile" ? true : profileForm.completed,
        section === "organization" ? true : orgForm.completed,
        section === "payment" ? true : paymentForm.completed,
      ].every(Boolean);

      if (allCompleted) {
        toast({
          title: "Setup Complete!",
          description: "Redirecting to dashboard...",
        });
        setTimeout(() => navigate("/dashboard"), 1500);
      }

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
      await saveToDatabase("profile", profileForm);
      localStorage.setItem(
        "profile_settings",
        JSON.stringify({ ...profileForm, completed: true })
      );
      setProfileForm((prev) => ({ ...prev, completed: true }));

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
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
      await saveToDatabase("organization", orgForm);
      localStorage.setItem(
        "org_settings",
        JSON.stringify({ ...orgForm, completed: true })
      );
      setOrgForm((prev) => ({ ...prev, completed: true }));

      toast({
        title: "Organization Updated",
        description:
          "Your organization details have been updated successfully.",
      });
    } catch (error) {
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
      localStorage.setItem(
        "payment_settings",
        JSON.stringify({ ...paymentForm, completed: true })
      );
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

  const defaultTab = searchParams.get("tab") || "profile";

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
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
              value="payment"
              className="py-4 px-2 text-sm font-medium data-[state=active]:text-[#0A2722] data-[state=active]:border-b-2 data-[state=active]:border-[#0A2722] rounded-none"
            >
              Payment Gateway {paymentForm.completed && "✓"}
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
                      }))
                    }
                    placeholder="Your Company Ltd."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type</Label>
                  <Input
                    id="business_type"
                    value={orgForm.business_type}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        business_type: e.target.value,
                      }))
                    }
                    placeholder="Corporation"
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
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={orgForm.address}
                    onChange={(e) =>
                      setOrgForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="123 Business Street, City, Country"
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

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Gateway Settings
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Configure your payment gateway and banking information.
                </p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="account_holder">Account Holder Name</Label>
                  <Input
                    id="account_holder"
                    value={paymentForm.account_holder}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        account_holder: e.target.value,
                      }))
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account_number">Account Number</Label>
                  <Input
                    id="account_number"
                    value={paymentForm.account_number}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        account_number: e.target.value,
                      }))
                    }
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input
                    id="bank_name"
                    value={paymentForm.bank_name}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        bank_name: e.target.value,
                      }))
                    }
                    placeholder="Your Bank Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="swift_code">SWIFT/BIC Code</Label>
                  <Input
                    id="swift_code"
                    value={paymentForm.swift_code}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        swift_code: e.target.value,
                      }))
                    }
                    placeholder="SWIFT12345"
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
