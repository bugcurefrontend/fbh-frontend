"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function OneAuth() {
  const router = useRouter();
  const apiCallCount = useRef(0); // Track API call attempts

  const handleAuth = (status: boolean) => {
    const authElement = document.querySelector("hfn-auth") as any;
    if (authElement && typeof authElement.handleProfileAuthentication === "function") {
      authElement.handleProfileAuthentication(status);
    }
  };

  // Check if already authenticated
  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      router.push("/");
    }
  }, [router]);

  const getUserProfile = useCallback(
    async ({ access_token }: { access_token: string }) => {
      apiCallCount.current += 1;

      // Fail after 3 retries
      if (apiCallCount.current > 3) {
        console.error("Max retry attempts reached");
        handleAuth(false);
        return;
      }

      try {
        console.log("Fetching user profile with getMeProfile...");

        // Use the CORRECT function from hfnauth
        const { getMeProfile } = await import("hfnauth/main");

        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://profile.srcm.net"}/`;

        const resData = await getMeProfile({
          srcmMeUrl: baseUrl, // Correct parameter name
          xClientId: process.env.NEXT_PUBLIC_X_CLIENT_ID || "sNoCucDYc1ok5D8HzktKJUROtXGlD49tSGIPiXzn",
          queryParams: [
            "user_firebase_uid",
            "first_name",
            "last_name",
            "city_id",
            "state",
            "email",
            "id",
          ],
        });

        console.log("OneAuth: Profile data received:", resData);
        console.log("OneAuth: Profile data structure check:", {
          hasData: !!resData?.data,
          hasFirebaseUid: !!resData?.data?.user_firebase_uid,
          dataKeys: resData?.data ? Object.keys(resData.data) : [],
        });

        if (resData?.data && resData.data.user_firebase_uid) {
          console.log("OneAuth: ✅ Valid profile data, proceeding...");
          const userData = resData.data;

          // Store user info
          const userInfo = {
            firstName: userData.first_name || "User",
            lastName: userData.last_name || "",
            email: userData.email || "",
            userId: userData.id || "",
            firebaseUid: userData.user_firebase_uid || "",
            cityId: userData.city_id || "",
            state: userData.state || "",
          };

          // Store in localStorage
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userProfile", JSON.stringify(userInfo));
          localStorage.setItem("authInfo", JSON.stringify({
            ...userData,
            tokenData: { accessToken: access_token },
            apiToken: access_token,
          }));

          console.log("OneAuth: ✅ Authentication successful!");
          console.log("OneAuth: User info stored:", userInfo);
          handleAuth(true);

          // Redirect to landing page
          const landingPage = localStorage.getItem("landingPage") || "/";
          console.log("OneAuth: Redirecting to:", landingPage);

          // Small delay to ensure logs are visible
          setTimeout(() => {
            router.push(landingPage);
          }, 100);
        } else {
          console.error("OneAuth: ❌ Invalid profile data - missing firebase_uid");
          console.error("OneAuth: Received data:", resData);
          console.warn("OneAuth: Retrying profile fetch (attempt", apiCallCount.current, "of 3)...");
          // Retry if firebase UID is missing
          await getUserProfile({ access_token });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        handleAuth(false);
      }
    },
    [router]
  );

  // Set up the login callback - MUST happen before package processes callback
  useEffect(() => {
    const setupLoginCallback = () => {
      const authElement = document.querySelector("hfn-auth") as any;
      if (authElement) {
        console.log("OneAuth: Setting up login callback on hfn-auth element");
        console.log("OneAuth: Auth element methods:", Object.keys(authElement));
        console.log("OneAuth: Auth element current state:", {
          hasLoginCallback: !!authElement.loginCallback,
          hasTriggerAuth: !!authElement.triggerAuth,
          hasCheckAuthStatus: !!authElement.checkAuthStatus,
        });

        authElement.loginCallback = async (response: { data: any }) => {
          try {
            console.log("OneAuth: Login callback triggered!", response);
            const user = response?.data;

            if (!user?.access_token) {
              console.error("OneAuth: No access token received");
              handleAuth(false);
              return false;
            }

            console.log("OneAuth: Access token received, fetching profile...");
            apiCallCount.current = 0; // Reset retry counter
            await getUserProfile({ access_token: user.access_token });
            return true;
          } catch (error) {
            console.error("OneAuth: Login callback error:", error);
            handleAuth(false);
            return false;
          }
        };

        console.log("OneAuth: Login callback successfully attached");

        // CRITICAL: Manually trigger auth check if we're on the callback URL
        if (window.location.search.includes('code=')) {
          console.log("OneAuth: Detected OAuth callback URL, triggering auth check...");
          // Give the hfnauth package a moment to process
          setTimeout(() => {
            if (typeof authElement.checkAuthStatus === 'function') {
              authElement.checkAuthStatus();
            } else {
              console.warn("OneAuth: checkAuthStatus not available, trying alternative...");
              // Try triggering the auth element to process the callback
              authElement.triggerAuth?.();
            }
          }, 100);
        }
      } else {
        console.warn("OneAuth: hfn-auth element not found, retrying in 100ms...");
        setTimeout(setupLoginCallback, 100);
      }
    };

    // Try to set up callback immediately, even before package loads
    setupLoginCallback();

    // Also set up after package loads
    import("hfnauth/main")?.then(() => {
      console.log("OneAuth: hfnauth package loaded, setting up callback...");
      setupLoginCallback();
    });
  }, [getUserProfile]);

  return null;
}

export default OneAuth;
