"use client";

import React, { useEffect, useRef } from "react";
import { queryHFNElement, getAuthParams } from "../lib/hfnauth";
import type { HFNAuthElement } from "../types/hfnauth-types";
import { actions } from "@/store/userStore";

interface HFNAuthComponentProps {
  onUserLoggedOut?: () => void;
}

export default function HFNAuthComponent({
  onUserLoggedOut,
}: HFNAuthComponentProps) {
  const hfnAuthRef = useRef<HFNAuthElement | null>(null);

  useEffect(() => {
    let mounted = true;

    import("hfnauth/main")
      .then(async () => {
        if (!mounted) return;

        await new Promise(resolve => setTimeout(resolve, 100));

        const authEl = hfnAuthRef.current ?? queryHFNElement();

        if (authEl) {
          authEl.loginCallback = async (response: any) => {
            try {
              const user = response?.data;

              if (!user?.access_token) {
                return false;
              }

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

              if (resData?.data && resData.data.user_firebase_uid) {
                const userData = resData.data;

                const userInfo = {
                  ...userData,
                  firstName: userData.first_name || "User",
                  lastName: userData.last_name || "",
                  email: userData.email || "",
                  userId: userData.id || "",
                  firebaseUid: userData.user_firebase_uid || "",
                  keycloak_user_id: userData.user_firebase_uid || "",
                  cityId: userData.city_id || "",
                  city: userData.city_id || {},
                  state: userData.state || "",
                  tokenData: { accessToken: user.access_token },
                  apiToken: user.access_token,
                };

                await actions.setUser(userInfo);
                authEl.handleProfileAuthentication(true);

                const landingPage = localStorage.getItem("landingPage") || "/";
                setTimeout(() => {
                  window.location.href = landingPage;
                }, 100);
              } else {
                authEl.handleProfileAuthentication(false);
              }

              return true;
            } catch (error) {
              authEl.handleProfileAuthentication(false);
              return false;
            }
          };

          const handleUserLoggedOut = async (event: any) => {
            if (event?.detail?.loggedOut && onUserLoggedOut) {
              await onUserLoggedOut();
            }
          };

          authEl.addEventListener(
            "userLoggedOut",
            handleUserLoggedOut as EventListener
          );

          return () => {
            authEl.removeEventListener(
              "userLoggedOut",
              handleUserLoggedOut as EventListener
            );
          };
        }
      })
      .catch((error) => {
        // Silent error handling
      });

    return () => {
      mounted = false;
    };
  }, [onUserLoggedOut]);

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
