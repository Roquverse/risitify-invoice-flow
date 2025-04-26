import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="about" className="w-full py-20 bg-[#0A2722] text-white">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">About Risitify</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                Founded in 2024, Risitify is revolutionizing how businesses
                handle their invoicing and financial management. Our mission is
                to simplify financial operations for businesses of all sizes.
              </p>
              <p className="text-gray-300">
                We believe that managing invoices shouldn't be a hassle. That's
                why we've built a platform that combines powerful features with
                an intuitive interface, making it easier than ever to stay on
                top of your finances.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#84ebdb]">10K+</h3>
                  <p className="text-gray-300">Happy Customers</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#84ebdb]">$1B+</h3>
                  <p className="text-gray-300">Processed Annually</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="bg-[#84ebdb] hover:bg-[#6bdccb] text-gray-900 font-medium px-8 py-6 text-lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#84ebdb]/30 to-transparent rounded-full filter blur-3xl"></div>

            {/* Team/Office Image Placeholder */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-[#84ebdb]/20 h-32 rounded-lg"></div>
                    <div className="bg-[#84ebdb]/10 h-48 rounded-lg"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-[#84ebdb]/10 h-48 rounded-lg"></div>
                    <div className="bg-[#84ebdb]/20 h-32 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
