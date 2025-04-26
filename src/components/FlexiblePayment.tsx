import { Button } from "./ui/button";

const FlexiblePayment = () => {
  return (
    <section className="w-full py-16 bg-white m-0">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-[#84ebdb]/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-[#84ebdb] rounded-xl flex items-center justify-center text-[#0A2722] font-bold text-xl">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Sign Up & Set Up Your Business
                </h3>
                <p className="text-gray-600 text-lg">
                  Customize your invoice layout, taxes, currency, and more.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img src="./1.png" alt="" width={500} />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2">
              <img src="./2.png" alt="" width={500} />
            </div>
            <div className="order-1">
              <div className="bg-[#84ebdb]/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-[#84ebdb] rounded-xl flex items-center justify-center text-[#0A2722] font-bold text-xl">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Create Your First Invoice
                </h3>
                <p className="text-gray-600 text-lg">
                  Use ready-made templates or build your own.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-[#84ebdb]/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-[#84ebdb] rounded-xl flex items-center justify-center text-[#0A2722] font-bold text-xl">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Send & Track Payments
                </h3>
                <p className="text-gray-600 text-lg">
                  Clients pay online, and you get notified instantly.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img src="./4.png" alt="" width={500} />
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2">
              <img src="./3.png" alt="" width={500} />
            </div>
            <div className="order-1">
              <div className="bg-[#84ebdb]/10 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-[#84ebdb] rounded-xl flex items-center justify-center text-[#0A2722] font-bold text-xl">
                    4
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  Manage Everything From One Place
                </h3>
                <p className="text-gray-600 text-lg">
                  From quotes and clients to taxes and reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexiblePayment;
