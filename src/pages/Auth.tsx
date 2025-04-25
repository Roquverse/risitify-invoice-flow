import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { toast } from "@/components/ui/use-toast";

type AuthMode = "signin" | "signup" | "forgot-password";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "forgot-password") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          form.email,
          {
            redirectTo: `${window.location.origin}/reset-password`,
          }
        );
        if (resetError) throw resetError;
        toast({
          title: "Password Reset Email Sent",
          description: (
            <div className="space-y-2">
              <p>We've sent a password reset link to your email address.</p>
              <p className="text-sm text-gray-500">
                Please check your inbox and follow the instructions to reset
                your password. The link will expire in 24 hours.
              </p>
            </div>
          ),
          duration: 5000,
        });
        setMode("signin");
        return;
      }

      if (mode === "signup" && (!form.first_name || !form.last_name)) {
        setError("First and last name are required.");
        setLoading(false);
        return;
      }

      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (signInError) throw signInError;
        toast({
          title: "Welcome back!",
          description: "You've signed in successfully.",
        });
        navigate("/dashboard");
      } else {
        // Sign up flow
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
              data: {
                first_name: form.first_name,
                last_name: form.last_name,
              },
            },
          });
        if (signUpError) throw signUpError;

        // Create profile record
        if (signUpData.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: signUpData.user.id,
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
              },
            ]);

          if (profileError) {
            console.error("Error creating profile:", profileError);
            // Don't throw here, as the user is already created
          }
        }

        toast({
          title: "Account created",
          description: "Complete your onboarding to get started.",
        });

        // Redirect to onboarding
        navigate("/onboarding");
        return;
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      toast({
        title: "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Link to="/" className="inline-block">
              <Logo />
            </Link>
            <h1 className="mt-8 text-4xl font-bold text-gray-900">
              {mode === "signin"
                ? "Welcome back"
                : mode === "signup"
                ? "Create Account"
                : "Reset Password"}
            </h1>
            <p className="mt-3 text-gray-600">
              {mode === "signin"
                ? "Sign in to manage your invoices"
                : mode === "signup"
                ? "Join us and start managing your invoices with ease"
                : "Enter your email to reset your password"}
            </p>
          </div>

          <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={form.first_name}
                      onChange={handleChange}
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
                      autoComplete="family-name"
                      required
                      value={form.last_name}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="you@example.com"
                />
              </div>

              {mode !== "forgot-password" && (
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot-password")}
                        className="text-sm font-medium text-[#0A2722] hover:text-[#0A2722]/80"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="••••••••"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900 py-4 rounded-xl text-lg font-medium transition-colors"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : mode === "signin"
                ? "Sign in"
                : mode === "signup"
                ? "Create account"
                : "Send reset link"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-[#0A2722] hover:text-[#0A2722]/80 font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : mode === "signup" ? (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-[#0A2722] hover:text-[#0A2722]/80 font-medium"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="text-[#0A2722] hover:text-[#0A2722]/80 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 bg-[#0A2722] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2722] to-[#0A2722]/90"></div>
        <div className="absolute inset-0">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[#84ebdb]/5 backdrop-blur-3xl">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#84ebdb]/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#84ebdb]/10 rounded-full filter blur-3xl animate-float-delay"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="max-w-lg text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                {mode === "signin"
                  ? "Welcome back to Risitify"
                  : mode === "signup"
                  ? "Start Your Journey with Risitify"
                  : "Recover Your Account"}
              </h2>
              <p className="text-lg text-[#84ebdb]/80">
                {mode === "signin"
                  ? "Access your account to manage invoices, track payments, and grow your business."
                  : mode === "signup"
                  ? "Join thousands of businesses using Risitify to streamline their invoicing process."
                  : "Don't worry, we'll help you get back on track."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
