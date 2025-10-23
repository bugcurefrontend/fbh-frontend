"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HFNAuthCallback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        // Import HFN Auth functions
        const { getSRCMProfile } = await import("hfnauth/main");
        
        // Get SRCM profile information
        const resData = await getSRCMProfile({
          srcmBaseURL: `${process.env.NEXT_PUBLIC_SRCM_BASE_URL || 'https://api.heartfulness.org'}/`,
          xClientId: process.env.NEXT_PUBLIC_SRCM_CLIENT_ID || 'your-x-client-id',
          queryParams: ['firstName', 'lastName', 'email'].join(','),
        });

        if (resData?.data?.results && resData.data.results.length > 0) {
          const userProfile = resData.data.results[0];
          
          // Store authentication data
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userProfile", JSON.stringify({
            firstName: userProfile.firstName || "User",
            lastName: userProfile.lastName || "",
            email: userProfile.email || "",
          }));

          // Trigger successful authentication
          // Notify web component of success (if present)
          const authElement = document.querySelector("hfn-auth");
          if (authElement) {
            (authElement as any).handleProfileAuthentication(true);
          }

          // Redirect to landing page or home
          const landingPage = localStorage.getItem("landingPage") || "/";
          router.push(landingPage);
        } else {
          // Handle unauthorized access as per documentation
          const authElement = document.querySelector("hfn-auth");
          if (authElement) {
            (authElement as any).handleErrorMessage(
              "You don't have necessary permissions. Please contact administrator.",
              ({ okClicked }: { okClicked: boolean }) => {
                if (okClicked) {
                  (authElement as any).handleProfileAuthentication(true);
                  const landingPage = localStorage.getItem("landingPage") || "/";
                  router.push(landingPage);
                }
              },
              {
                showOkBtn: true,
                showCancel: false,
                showRetryBtn: false,
                btnText: "Okay",
              }
            );
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        
        // Handle authentication failure with proper error handling
        const authElement = document.querySelector("hfn-auth");
        if (authElement) {
          (authElement as any).handleErrorMessage(
            "Authentication failed. Please try again.",
            ({ okClicked }: { okClicked: boolean }) => {
              if (okClicked) {
                (authElement as any).handleProfileAuthentication(false);
                const landingPage = localStorage.getItem("landingPage") || "/";
                router.push(landingPage);
              }
            },
            {
              showOkBtn: true,
              showCancel: true,
              showRetryBtn: true,
              btnText: "Retry",
            }
          );
        } else {
          setError("Authentication failed. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Reactivate login as per documentation
    const el = document.querySelector("hfn-auth");
    if (el) {
      (el as any).triggerAuth();
    }

    handleAuthentication();
  }, [router]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    const authElement = document.querySelector("hfn-auth");
    if (authElement) {
      (authElement as any).triggerAuth();
    }
  };

  const handleCancel = () => {
    const landingPage = localStorage.getItem("landingPage") || "/";
    router.push(landingPage);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Authentication Failed
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
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
  );
}
