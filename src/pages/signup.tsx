import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/logo";

const SignUp = () => {
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
              Create Account
            </h1>
            <p className="mt-3 text-gray-600">
              Join us and start managing your invoices with ease
            </p>
          </div>

          <form
            className="mt-12 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Full name"
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Create password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-purple-600 hover:text-purple-500"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-purple-600 hover:text-purple-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900 py-4 rounded-xl text-lg font-medium transition-colors"
              >
                Create Account
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 bg-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {/* Right Content - Feature Preview */}
          <div className="relative w-full max-w-4xl">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Invoice Dashboard</h3>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Total Invoiced",
                      value: "$24,500",
                      change: "+12.5%",
                      color: "text-green-500",
                    },
                    {
                      label: "Pending Payments",
                      value: "$4,250",
                      change: "-8.1%",
                      color: "text-yellow-500",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <p className="text-sm text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className={`text-sm ${stat.color}`}>
                          {stat.change}
                        </span>
                      </div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#84ebdb]/10 rounded-tl-3xl"></div>
                    </div>
                  ))}
                </div>

                {/* Activity Chart */}
                <div className="h-32 flex items-end space-x-2">
                  {[40, 70, 35, 50, 90, 30, 65, 60, 45, 80].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#84ebdb]/20 rounded-t-lg"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  {[
                    {
                      title: "Invoice #1234 Paid",
                      amount: "+$1,200",
                      time: "2h ago",
                    },
                    {
                      title: "New Invoice Created",
                      amount: "$850",
                      time: "5h ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      <span className="font-semibold">{activity.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10">
          <div className="w-40 h-40 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-10 left-10">
          <div className="w-64 h-64 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
