import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section className="w-full py-16 bg-gray-50 m-0">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smarter Invoicing Built for Your Hustle
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you're a freelancer or running a growing business, our
            invoicing app helps you stay organized and get paid faster — with
            zero stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link to="/signup">
              <Button className="bg-[#0A2722] hover:bg-[#0A2722]/90 text-white px-8 py-6 text-lg rounded-xl">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-[#84ebdb]/10 rounded-lg mb-3 flex items-center justify-center">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Invoicing</h3>
            <p className="text-gray-600 text-sm">
              Create and send invoices in under a minute.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-[#84ebdb]/10 rounded-lg mb-3 flex items-center justify-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Reports</h3>
            <p className="text-gray-600 text-sm">
              Know what's coming in, what's due, and what's overdue.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-[#84ebdb]/10 rounded-lg mb-3 flex items-center justify-center">
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
            <h3 className="text-lg font-semibold mb-2">Multiple Currencies</h3>
            <p className="text-gray-600 text-sm">
              Invoice clients in their local currency.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-10 w-10 bg-[#84ebdb]/10 rounded-lg mb-3 flex items-center justify-center">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Auto Reminders</h3>
            <p className="text-gray-600 text-sm">Never chase payments again.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
