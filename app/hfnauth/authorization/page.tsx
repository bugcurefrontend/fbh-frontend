"use client";

import OneAuth from "@/components/OneAuth";

export default function HFNAuthCallback() {
  return (
    <>
      <OneAuth />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003399] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Completing Authentication...
          </h2>
          <p className="text-gray-500 text-sm">
            Please wait while we verify your credentials.
          </p>
          <p className="text-gray-400 text-xs mt-4">
            Do not refresh or close this page.
          </p>
        </div>
      </div>
    </>
  );
}
