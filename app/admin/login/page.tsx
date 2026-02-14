"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Playfair_Display, Public_Sans } from "next/font/google";
import { AlertCircle } from "lucide-react";
import { fetchGlobal } from "@/services/global";
import { adminLogin, storeAdminAuth } from "@/services/admin-auth";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginImage, setLoginImage] = useState("/images/loginImage.png");

  useEffect(() => {
    fetchGlobal().then((data) => {
      if (data?.admin_login_image?.url) {
        setLoginImage(data.admin_login_image.url);
      }
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Call Strapi login API
      const response = await adminLogin(email, password);

      console.log("👤 User role:", response.user.role);

      // Check if user is confirmed and not blocked
      if (!response.user.confirmed) {
        setError("Account not confirmed. Please check your email.");
        setIsLoading(false);
        return;
      }

      if (response.user.blocked) {
        setError("Account is blocked. Please contact administrator.");
        setIsLoading(false);
        return;
      }

      // Store authentication data
      storeAdminAuth(response.jwt, response.user);

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (err: any) {
      setError("Incorrect email id or password.");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-white flex items-center justify-center p-4 md:p-8 ${publicSans.className}`}
    >
      <div className="relative w-full max-w-7xl mx-auto md:grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="relative h-[730px] w-[638px] rounded-[16px] overflow-hidden hidden md:block">
          <Image
            src={loginImage}
            alt="Login Image"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col items-center justify-center w-full max-w-[375px] mx-auto space-y-8">
          {/* Logo Section */}
          <Image
            src="/images/footer-logo.png"
            alt="Heartfulness Logo"
            width={216}
            height={63.4}
            className="mb-16 invert object-contain h-auto"
          />

          <h1
            className={`${playfair.className} text-2xl font-semibold text-[#232D26]`}
          >
            Admin Portal
          </h1>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#454950] block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-[8px] border ${
                    error ? "border-[#F04438]" : "border-[#D0D5DD]"
                  } focus:outline-none focus:ring-none placeholder:text-[#98A2B3] text-sm transition-all placeholder:bg-white disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {error && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-[#F04438]" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#454950] block">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-[8px] border ${
                    error ? "border-[#F04438]" : "border-[#D0D5DD]"
                  } focus:outline-none focus:ring-none placeholder:text-[#98A2B3] text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                {error && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-[#F04438]" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#003399] text-white font-semibold py-3 rounded-[8px] hover:bg-[#002b80] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              {error && (
                <p className="text-[#F04438] text-xs leading-4.5 mt-1.5 text-center font-medium">
                  {error}
                </p>
              )}
            </div>
          </form>

          {/* Footer Copyright */}
          <div className="md:absolute bottom-0 py-6 text-[#454950] text-sm font-medium leading-5.5">
            © 2026 Heartfulness | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
