"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Playfair_Display, Public_Sans } from "next/font/google";
import { AlertCircle } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== "admin@fbh.com" || password !== "password") {
      setError(true);
    } else {
      setError(false);
      // Handle successful login
      console.log("Login successful");
    }
  };

  return (
    <div
      className={`min-h-screen bg-white flex items-center justify-center p-4 md:p-8 ${publicSans.className}`}
    >
      <div className="relative min-h-screen w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="relative h-[730px] w-[638px] rounded-[16px] overflow-hidden hidden md:block">
          <Image
            src="/images/loginImage.png"
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
                  className={`w-full px-4 py-3 rounded-[8px] border ${
                    error ? "border-[#F04438]" : "border-[#D0D5DD]"
                  } focus:outline-none focus:ring-none placeholder:text-[#98A2B3] text-sm transition-all placeholder:bg-white`}
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
                  className={`w-full px-4 py-3 rounded-[8px] border ${
                    error ? "border-[#F04438]" : "border-[#D0D5DD]"
                  } focus:outline-none focus:ring-none placeholder:text-[#98A2B3] text-sm transition-all`}
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
                className="w-full bg-[#003399] text-white font-semibold py-3 rounded-[8px] hover:bg-[#002b80] transition-colors text-sm"
              >
                Login
              </button>
              {error && (
                <p className="text-[#F04438] text-xs leading-4.5 mt-1.5 text-center font-medium">
                  Incorrect email id or password.
                </p>
              )}
            </div>
          </form>

          {/* Footer Copyright */}
          <div className="absolute bottom-0 py-6 text-[#454950] text-sm font-medium leading-5.5">
            © 2026 Heartfulness | All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
