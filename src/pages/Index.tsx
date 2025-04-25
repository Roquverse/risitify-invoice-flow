
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Features from "@/components/Features";
import FlexiblePayment from "@/components/FlexiblePayment";
import Support from "@/components/Support";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <div id="home" className="w-full bg-[#0A2722] text-white relative overflow-hidden m-0 p-0">
          <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6 text-center lg:text-left mx-auto lg:mx-0">
                {/* Badge */}
                <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm">
                  INVOICE FINANCING
                </div>

                <h1 className="text-4xl md:text-6xl font-medium leading-tight">
                  Send Invoices. Get Paid. Stay in Control.
                </h1>
                <p className="text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
                  Create professional invoices in seconds, track payments,
                  manage expenses, and grow your business — all from one smart
                  dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                  <Link to="/signup">
                    <Button className="bg-[#84ebdb] hover:bg-[#6bdccb] text-gray-900 font-medium px-8 py-6 text-lg w-full sm:w-auto">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="#features">
                    <Button
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/20 text-white font-medium px-8 py-6 text-lg w-full sm:w-auto"
                    >
                      See How it Works
                    </Button>
                  </Link>
                </div>

                {/* Partner Logos */}
                <div className="pt-12 text-center lg:text-left">
                  <p className="text-sm text-gray-400 mb-4">
                    Trusted by leading companies
                  </p>
                  <div className="flex flex-wrap gap-8 items-center opacity-70 justify-center lg:justify-start">
                    {[
                      "HubSpot",
                      "Dropbox",
                      "Square",
                      "Stripe",
                      "Atlassian",
                    ].map((partner) => (
                      <div key={partner} className="text-lg font-medium">
                        {partner}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative hidden lg:block">
                {/* Background Gradient Effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#84ebdb]/30 to-transparent rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#84ebdb]/20 rounded-full blur-3xl"></div>

                {/* Floating Elements */}
                <div className="absolute -top-10 right-20 w-24 h-24 bg-[#84ebdb]/20 rounded-full animate-float"></div>
                <div className="absolute top-40 -right-8 w-16 h-16 bg-[#84ebdb]/30 rounded-full animate-float-delay"></div>
                <div className="absolute bottom-20 -left-12 w-20 h-20 bg-[#84ebdb]/25 rounded-full animate-float"></div>

                {/* Main Dashboard */}
                <div className="relative z-10">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            Invoice Dashboard
                          </h3>
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
                            className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 relative overflow-hidden hover:bg-gray-50/90 transition-colors"
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
                      <div className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-xl">
                        <div className="h-32 flex items-end space-x-2">
                          {[40, 70, 35, 50, 90, 30, 65, 60, 45, 80].map(
                            (height, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-[#84ebdb] rounded-t-lg transition-all duration-300 hover:bg-[#6bdccb] relative group"
                                style={{ height: `${height}%` }}
                              >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                  {height}%
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="space-y-3">
                        {[
                          {
                            title: "Invoice #1234 Paid",
                            amount: "+$1,200",
                            time: "2h ago",
                            status: "success",
                          },
                          {
                            title: "New Invoice Created",
                            amount: "$850",
                            time: "5h ago",
                            status: "pending",
                          },
                        ].map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50/80 backdrop-blur-sm rounded-lg hover:bg-gray-50/90 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  activity.status === "success"
                                    ? "bg-green-400"
                                    : "bg-yellow-400"
                                }`}
                              ></div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {activity.title}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {activity.time}
                                </p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900">
                              {activity.amount}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -right-8 bottom-20 bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-xl animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#84ebdb] rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#0A2722]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Today's Revenue
                      </p>
                      <p className="text-lg font-bold text-white">$2,450</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-8 top-20 bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-xl animate-float-delay">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Payment Received
                      </p>
                      <p className="text-xs text-gray-300">Invoice #1234</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features">
          <Features />
        </div>

        {/* How It Works Section */}
        <div id="how-it-works">
          <FlexiblePayment />
        </div>

        {/* Stats Section */}
        <section id="pricing" className="w-full bg-white py-20 m-0">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">2M+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">10B+</h3>
                <p className="text-gray-600">Transactions</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">99.9%</h3>
                <p className="text-gray-600">Uptime</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">24/7</h3>
                <p className="text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <div id="contact">
          <Support />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
