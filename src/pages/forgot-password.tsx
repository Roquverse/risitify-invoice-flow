import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/logo";

const ForgotPassword = () => {
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
              Reset Password
            </h1>
            <p className="mt-3 text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <form
            className="mt-12 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[#84ebdb] hover:bg-[#84ebdb]/90 text-gray-900 py-4 rounded-xl text-lg font-medium transition-colors"
              >
                Send Reset Link
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/signin"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Sign In
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

export default ForgotPassword;
