import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-full bg-[#0A2722] text-white relative overflow-hidden m-0 p-0">
      <div className="max-w-[1400px] mx-auto px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-1.5 text-sm backdrop-blur-sm">
              <svg
                className="w-4 h-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 14L4 9L9 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 20V13C20 11.9391 19.5786 10.9217 18.8284 10.1716C18.0783 9.42143 17.0609 9 16 9H4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              INVOICE FINANCING
            </div>

            <h1 className="text-4xl md:text-6xl font-medium leading-tight">
              Send Invoices. Get Paid. Stay in Control.
            </h1>
            <p className="text-xl text-gray-300 max-w-xl">
              Create professional invoices in seconds, track payments, manage
              expenses, and grow your business — all from one smart dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-[#84ebdb] hover:bg-[#6bdccb] text-gray-900 font-medium px-8 py-6 text-lg">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-0 hover:bg-white/20 text-white font-medium px-8 py-6 text-lg"
              >
                View Demo
              </Button>
            </div>

            {/* Partner Logos */}
            <div className="pt-12">
              <p className="text-sm text-gray-400 mb-4">
                Trusted by leading companies
              </p>
              <div className="flex flex-wrap gap-6 items-center opacity-70">
                <span className="text-lg font-medium">
                  <img src="./clients/avatec.png" alt="" width={50} />
                </span>
                <span className="text-lg font-medium">
                  <img src="./clients/pace.PNG" alt="" width={50} />
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 bg-[#0A2722]/50 rounded-lg p-6 backdrop-blur-sm">
              <img
                src="/hero-illustration.png"
                alt="Invoice Dashboard"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#84ebdb]/20 to-transparent rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
