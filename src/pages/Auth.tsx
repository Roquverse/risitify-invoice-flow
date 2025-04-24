import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          navigate("/", { replace: true });
        }
      }
    );

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        navigate("/", { replace: true });
      }
    });
    return () => {
      listener.subscription.unsubscribe();
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
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
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
        toast({
          title: "Account created",
          description: "Complete your onboarding to get started.",
        });
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md mx-auto rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center gap-2">
          <Logo size="lg" />
          <h2 className="text-2xl font-bold tracking-tight mt-4 text-center">
            {mode === "signin"
              ? "Sign In"
              : mode === "signup"
              ? "Create your account"
              : "Reset Password"}
          </h2>
          <p className="text-sm text-center text-gray-500">
            {mode === "signin"
              ? "Welcome back to Risitify."
              : mode === "signup"
              ? "Start your journey with fast, flexible invoicing."
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="John"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Doe"
                />
              </div>
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="you@example.com"
            />
          </div>
          {mode !== "forgot-password" && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="••••••••"
              />
            </div>
          )}
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button
            type="submit"
            className="w-full bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900 py-3 rounded-xl text-base font-medium transition-colors"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : mode === "signin"
              ? "Sign In"
              : mode === "signup"
              ? "Sign Up"
              : "Send Reset Link"}
          </Button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          {mode === "signin" ? (
            <>
              Don't have an account?{" "}
              <button
                className="text-purple-600 hover:text-purple-500 font-medium"
                onClick={() => setMode("signup")}
                disabled={loading}
              >
                Sign Up
              </button>
              <div className="mt-2">
                <button
                  className="text-purple-600 hover:text-purple-500 font-medium"
                  onClick={() => setMode("forgot-password")}
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                className="text-purple-600 hover:text-purple-500 font-medium"
                onClick={() => setMode("signin")}
                disabled={loading}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Remember your password?{" "}
              <button
                className="text-purple-600 hover:text-purple-500 font-medium"
                onClick={() => setMode("signin")}
                disabled={loading}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
