"use client";

import React, { useEffect, useRef } from "react";
import { queryHFNElement, getAuthParams } from "../lib/hfnauth";
import type { HFNAuthElement } from "../types/hfnauth-types";

interface HFNAuthComponentProps {
  onUserLoggedOut?: () => void;
}

export default function HFNAuthComponent({
  onUserLoggedOut,
}: HFNAuthComponentProps) {
  const hfnAuthRef = useRef<HFNAuthElement | null>(null);

  useEffect(() => {
    let mounted = true;

    // Dynamically import the hfnauth package
    import("hfnauth/main")
      .then(async () => {
        if (!mounted) return;
        console.log("HFN Auth package loaded successfully");

        const authEl = hfnAuthRef.current ?? queryHFNElement();
        if (authEl) {
          // Set up login callback FIRST (before hfn-auth processes OAuth callback)
          authEl.loginCallback = async (response: any) => {
            try {
              console.log("HFNAuthComponent: Login callback triggered!", response);
              const user = response?.data;

              if (!user?.access_token) {
                console.error("HFNAuthComponent: No access token received");
                return false;
              }

              console.log("HFNAuthComponent: Access token received, fetching profile...");

              // Use getMeProfile to fetch user profile
              const { getMeProfile } = await import("hfnauth/main");
              const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || "https://profile.srcm.net"}/`;

              const resData = await getMeProfile({
                srcmMeUrl: baseUrl,
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

              console.log("HFNAuthComponent: Profile data received:", resData);

              if (resData?.data && resData.data.user_firebase_uid) {
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

                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userProfile", JSON.stringify(userInfo));
                localStorage.setItem("authInfo", JSON.stringify({
                  ...userData,
                  tokenData: { accessToken: user.access_token },
                  apiToken: user.access_token,
                }));

                console.log("HFNAuthComponent: Authentication successful!");
                authEl.handleProfileAuthentication(true);

                // Redirect to landing page
                const landingPage = localStorage.getItem("landingPage") || "/";
                window.location.href = landingPage;
              }

              return true;
            } catch (error) {
              console.error("HFNAuthComponent: Login callback error:", error);
              authEl.handleProfileAuthentication(false);
              return false;
            }
          };

          console.log("HFNAuthComponent: Login callback attached");

          // Set up event listener for logout
          const handleUserLoggedOut = async (event: any) => {
            if (event?.detail?.loggedOut && onUserLoggedOut) {
              await onUserLoggedOut();
            }
          };

          authEl.addEventListener(
            "userLoggedOut",
            handleUserLoggedOut as EventListener
          );

          // Cleanup
          return () => {
            authEl.removeEventListener(
              "userLoggedOut",
              handleUserLoggedOut as EventListener
            );
          };
        }
      })
      .catch((error) => {
        console.error("Failed to load HFN Auth package:", error);
      });

    return () => {
      mounted = false;
    };
  }, [onUserLoggedOut]);

  // HFN Auth configuration
  const hfnAuthConfig = getAuthParams();

  return (
    <hfn-auth
      ref={hfnAuthRef as any}
      config={JSON.stringify(hfnAuthConfig)}
      showCancel="true"
      authType="on-demand"
      subPath={process.env.NEXT_PUBLIC_HFN_SUBPATH || ""}
    />
  );
}
