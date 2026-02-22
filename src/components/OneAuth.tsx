"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { actions } from "@/store/userStore";
import { queryHFNElement } from "@/lib/hfnauth";
import type { AuthCallbackResponse } from "@/types/hfnauth-types";
import { logger } from "@/lib/logger";

function OneAuth() {
  const router = useRouter();
  const apiCallCount = useRef(0);
  const callbackProcessed = useRef(false);

  const handleAuth = (status: boolean) => {
    const authElement = queryHFNElement();
    if (authElement && typeof authElement.handleProfileAuthentication === "function") {
      authElement.handleProfileAuthentication(status);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      router.push("/");
    }
  }, [router]);

  const getUserProfile = useCallback(
    async ({ access_token }: { access_token: string }) => {
      apiCallCount.current += 1;

      if (apiCallCount.current > 3) {
        handleAuth(false);
        return;
      }

      try {
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
            "abhyas_stage",
            "name",
            "photo_url",
            "postal_code",
            "street",
            "street2",
            "mobile",
            "city",
            "country",
            "citizen_of_country",
            "identity",
            "ref",
          ],
        });

        const getString = (value: unknown, fallback = ""): string =>
          typeof value === "string" ? value : fallback;

        if (resData?.data && resData.data.user_firebase_uid) {
          const userData = resData.data;

          const userInfo = {
            ...userData,
            firstName: getString(userData.first_name, "User"),
            lastName: getString(userData.last_name),
            email: getString(userData.email),
            userId: getString(userData.id),
            firebaseUid: getString(userData.user_firebase_uid),
            keycloak_user_id: getString(userData.user_firebase_uid),
            cityId: getString(userData.city_id),
            city: userData.city_id || {},
            state: getString(userData.state),
            picture: getString(userData.photo_url),
            tokenData: { accessToken: access_token },
            apiToken: access_token,
          };

          await actions.setUser(userInfo);
          window.dispatchEvent(new Event('storage')); // Trigger auth-context refresh
          handleAuth(true);

          const landingPage = localStorage.getItem("landingPage") || "/";
          setTimeout(() => {
            router.push(landingPage);
          }, 100);
        } else {
          await getUserProfile({ access_token });
        }
      } catch (error) {
        logger.error("Failed to fetch OneAuth user profile", error);
        handleAuth(false);
      }
    },
    [router]
  );

  useEffect(() => {
    const setupLoginCallback = () => {
      const authElement = queryHFNElement();
      if (authElement) {
        authElement.loginCallback = async (response: AuthCallbackResponse) => {
          try {
            const user = response?.data;

            if (!user?.access_token) {
              callbackProcessed.current = false;  // Reset on failure
              handleAuth(false);
              return false;
            }

            apiCallCount.current = 0;
            await getUserProfile({ access_token: user.access_token });
            return true;
          } catch (error) {
            logger.error("OneAuth login callback failed", error);
            callbackProcessed.current = false;
            handleAuth(false);
            return false;
          }
        };

        if (window.location.search.includes('code=')) {
          setTimeout(() => {
            // Check and set flag BEFORE calling checkAuthStatus to prevent race condition
            if (!callbackProcessed.current) {
              callbackProcessed.current = true;  // Set immediately to block duplicate calls
              if (typeof authElement.checkAuthStatus === 'function') {
                authElement.checkAuthStatus();
              } else {
                authElement.triggerAuth?.();
              }
            }
          }, 100);
        }
      } else {
        setTimeout(setupLoginCallback, 100);
      }
    };

    setupLoginCallback();

    import("hfnauth/main")?.then(() => {
      setupLoginCallback();
    });
  }, [getUserProfile]);

  return null;
}

export default OneAuth;
