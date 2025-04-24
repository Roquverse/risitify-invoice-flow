
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// Three steps: 0 = Profile, 1 = Organization, 2 = Account Setup
const steps = ["User Profile", "Organization Details", "Account Setup"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ first_name: "", last_name: "" });
  const [org, setOrg] = useState({ name: "", industry: "" });
  const [account, setAccount] = useState({ timezone: "", currency: "" });
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Pre-fill profile if user already exists
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user?.id;
      setUserId(uid ?? null);

      // Fetch profile data if present
      if (uid) {
        supabase
          .from("profiles")
          .select("first_name,last_name")
          .eq("id", uid)
          .maybeSingle()
          .then(({ data: prof, error }) => {
            if (prof) setProfile({ first_name: prof.first_name || "", last_name: prof.last_name || "" });
          });
      }
    });
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({ title: "Error", description: "User not found. Please sign in again." });
      return;
    }
    setLoading(true);
    // Update profile info
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
      })
      .eq("id", userId);

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      setStep(1);
    }
  };

  const handleOrgSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({ title: "Error", description: "User not found. Please sign in again." });
      return;
    }
    setLoading(true);
    // Upsert org (single org per user)
    const { error } = await supabase
      .from("organizations")
      .upsert(
        {
          user_id: userId,
          name: org.name,
          industry: org.industry,
        },
        { onConflict: "user_id" }
      );
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      setStep(2);
    }
  };

  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      toast({ title: "Error", description: "User not found. Please sign in again." });
      return;
    }
    setLoading(true);
    // Upsert settings (single settings per user)
    const { error } = await supabase
      .from("account_settings")
      .upsert(
        {
          user_id: userId,
          timezone: account.timezone,
          currency: account.currency,
        },
        { onConflict: "user_id" }
      );
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      toast({ title: "Onboarding Complete", description: "Redirecting you to your dashboard." });
      navigate("/dashboard", { replace: true });
    }
  };

  // Handlers for form inputs
  const handleInput = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="w-full max-w-lg mx-auto p-6 rounded-xl border shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome! Let's get started</h1>
        <div className="flex justify-center gap-1 mb-6">
          {steps.map((s, idx) => (
            <span
              key={s}
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                idx === step
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
        {step === 0 && (
          <form className="space-y-5" onSubmit={handleProfileSave}>
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                required
                value={profile.first_name}
                onChange={handleInput(setProfile)}
                className="mt-1"
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                required
                value={profile.last_name}
                onChange={handleInput(setProfile)}
                className="mt-1"
                placeholder="Doe"
              />
            </div>
            <Button type="submit" className="w-full bg-[#84ebdb] hover:bg-[#84ebdb]/90" disabled={loading}>
              {loading ? "Saving..." : "Next: Organization"}
            </Button>
          </form>
        )}
        {step === 1 && (
          <form className="space-y-5" onSubmit={handleOrgSave}>
            <div>
              <Label htmlFor="org_name">Organization Name</Label>
              <Input
                id="org_name"
                name="name"
                type="text"
                required
                value={org.name}
                onChange={handleInput(setOrg)}
                className="mt-1"
                placeholder="My Company LLC"
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                type="text"
                required
                value={org.industry}
                onChange={handleInput(setOrg)}
                className="mt-1"
                placeholder="E.g. Consulting, Tech"
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button type="submit" className="bg-[#84ebdb] hover:bg-[#84ebdb]/90" disabled={loading}>
                {loading ? "Saving..." : "Next: Account Setup"}
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="space-y-5" onSubmit={handleAccountSave}>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                name="timezone"
                type="text"
                required
                value={account.timezone}
                onChange={handleInput(setAccount)}
                className="mt-1"
                placeholder="E.g. UTC, PST, EST"
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                name="currency"
                type="text"
                required
                value={account.currency}
                onChange={handleInput(setAccount)}
                className="mt-1"
                placeholder="E.g. USD, EUR"
              />
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" className="bg-[#84ebdb] hover:bg-[#84ebdb]/90" disabled={loading}>
                {loading ? "Saving..." : "Finish & Go to Dashboard"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
