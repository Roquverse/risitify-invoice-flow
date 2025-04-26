import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Cookies() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
          <div className="prose max-w-none space-y-6">
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences and login status.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                How We Use Cookies
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Authentication: To keep you signed in and secure your account
                </li>
                <li>Preferences: To remember your settings and preferences</li>
                <li>Analytics: To understand how visitors use our website</li>
                <li>Performance: To optimize our website's performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p>
                You can control and/or delete cookies as you wish. You can
                delete all cookies that are already on your computer and you can
                set most browsers to prevent them from being placed.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
