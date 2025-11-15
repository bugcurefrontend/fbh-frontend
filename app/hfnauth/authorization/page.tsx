"use client";

import { useEffect } from "react";
import OneAuth from "@/components/OneAuth";

export default function HFNAuthCallback() {
  useEffect(() => {
    console.log("Authorization page loaded - handling OAuth callback");
  }, []);

  return (
    <>
      <OneAuth />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003399] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Completing Authentication...
          </h2>
          <p className="text-gray-500">
            Please wait while we verify your credentials.
          </p>
        </div>
      </div>
    </>
  );
}
