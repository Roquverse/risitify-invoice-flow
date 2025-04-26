import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

            <div className="grid gap-8">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-600">support@risitify.com</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">
                  Send us a message
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#84ebdb] focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#84ebdb] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#84ebdb] focus:border-transparent"
                      rows={6}
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button className="w-full bg-[#0A2722] hover:bg-[#0A2722]/90 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
