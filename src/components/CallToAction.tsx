import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-br from-[#84ebdb]/20 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#84ebdb]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#84ebdb]/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-[#84ebdb]/20 rounded-full">
              <svg
                className="w-5 h-5 text-[#0A2722] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-sm font-semibold text-[#0A2722]">
                Get Started in Minutes
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Transform Your
              <br />
              <span className="text-[#0A2722] relative">
                Invoice Management
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                >
                  <path
                    d="M1 5.5Q50 3 100 5.5T199 5.5"
                    stroke="#84ebdb"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of businesses who've simplified their invoicing,
              accelerated their payments, and grown their business with
              Risitify.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to="/signup">
                <Button className="bg-[#0A2722] hover:bg-[#0A2722]/90 text-white px-8 py-6 text-lg rounded-xl">
                  Start Free Trial
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-[#84ebdb]/20 flex items-center justify-center"
                    >
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Join 10,000+ businesses</p>
                  <div className="flex items-center text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {[
                {
                  title: "Quick Setup",
                  description: "Get started in less than 5 minutes",
                },
                {
                  title: "14-Day Trial",
                  description: "No credit card required",
                },
                {
                  title: "24/7 Support",
                  description: "Always here to help you",
                },
              ].map((feature, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
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

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#84ebdb]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#84ebdb]/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
