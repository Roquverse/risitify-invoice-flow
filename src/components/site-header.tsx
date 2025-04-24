
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Link } from "react-router-dom";

const mainNavItems = [
  { label: "Products", href: "/#products" },
  { label: "Features", href: "/#features" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Support", href: "/#support" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-emerald-400 hover:bg-emerald-500">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
