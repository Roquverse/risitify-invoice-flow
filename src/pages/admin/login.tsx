import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/logo";
import { FcGoogle } from "react-icons/fc";

const AdminLogin = () => {
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
              Admin Login
            </h1>
            <p className="mt-3 text-gray-600">Access your admin dashboard</p>
          </div>

          <form
            className="mt-12 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/admin/forgot-password"
                  className="text-purple-600 hover:text-purple-500"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900 py-4 rounded-xl text-lg font-medium transition-colors"
              >
                Sign In
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-4 rounded-xl text-lg font-medium transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </Button>

            <div className="text-center text-sm text-gray-600">
              Not an admin?{" "}
              <Link
                to="/signin"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Go to User Login
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:block lg:w-1/2 bg-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src="/4359227.png"
            alt="Authentication"
            className="w-full max-w-4xl"
          />
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

export default AdminLogin;
