"use client";
import React, { useState } from "react";
import { RefreshCw, ArrowRightCircle } from "lucide-react";
import Image from "next/image";

type PaymentStatus = "success" | "failed";

const PaymentStatusUI: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>("success");

  const handleDashboard = () => {
    console.log("Navigate to dashboard");
  };

  const handleTryAgain = () => {
    console.log("Try payment again");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">
        {/* Toggle buttons for demo */}
        <div className="flex gap-2 mb-12 justify-center">
          <button
            onClick={() => setStatus("success")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === "success"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Show Success
          </button>
          <button
            onClick={() => setStatus("failed")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === "failed"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Show Failed
          </button>
        </div>

        {/* Payment Status Card */}
        <div className="text-center">
          {status === "success" ? (
            <>
              {/* Success State */}
              <div className="inline-flex items-center justify-center w-25 h-25 animate-bounce">
                <Image
                  src="/images/success.png"
                  alt="success"
                  width={100}
                  height={100}
                />
              </div>

              <h1 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] mb-6 md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
                Payment Successful!
              </h1>

              <p className="text-[#454950] font-semibold md:text-2xl md:leading-9">
                Your tree is now planted for a greener tomorrow. <br />
                Thank you for making a difference!
              </p>

              <button
                onClick={handleDashboard}
                className="mt-6 inline-flex items-center gap-2 bg-[#003399] hover:bg-blue-800 text-white font-semibold px-5 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Go to Dashboard
                <ArrowRightCircle className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              {/* Failed State */}
              <div className="inline-flex items-center justify-center w-20 h-20 animate-bounce">
                <Image
                  src="/images/failed.png"
                  alt="success"
                  width={80}
                  height={80}
                />
              </div>

              <h1 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] mb-4 md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
                Payment Failed! <br />
                Donation did not succeed
              </h1>

              <p className="text-[#F04438] font-medium md:text-2xl md:leading-9 mb-4">
                Please check you bank/card account. If money is debited,
                <br />
                it will get refunded back to your/card account
              </p>

              <p className="text-sm text-gray-500 italic mb-8">
                Note: Please don't hit browser back button, <br />
                Use the below button to navigate to home
              </p>

              <button
                onClick={handleTryAgain}
                className="inline-flex items-center gap-2  text-[#003399] font-semibold"
              >
                <RefreshCw className="w-5 h-5" />
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusUI;
