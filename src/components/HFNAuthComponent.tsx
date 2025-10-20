"use client";

import React, { useEffect, useRef } from "react";
import { queryHFNElement, getAuthParams } from "../lib/hfnauth";
import type { HFNAuthElement } from "../types/hfnauth-types";

interface HFNAuthComponentProps {
  onUserLoggedOut?: () => void;
}

export default function HFNAuthComponent({ onUserLoggedOut }: HFNAuthComponentProps) {
  const hfnAuthRef = useRef<HFNAuthElement | null>(null);

  useEffect(() => {
    let mounted = true;

    // Dynamically import the hfnauth package and set login callback
    import("hfnauth/main")
      .then(() => {
        if (!mounted) return;
        console.log("HFN Auth package loaded successfully");

        const authEl = hfnAuthRef.current ?? queryHFNElement();
        if (authEl) {
          authEl.loginCallback = function (res: any) {
            if (res?.data?.access_token) {
              localStorage.setItem("accessToken", res.data.access_token);
              // navigate to the authorization handler
              window.location.href = "/hfnauth/authorization";
            }
          };
        }
      })
      .catch((error) => {
        console.error("Failed to load HFN Auth package:", error);
      });

    // Set up event listener for logout
    const handleUserLoggedOut = async (event: any) => {
      if (event?.detail?.loggedOut && onUserLoggedOut) {
        await onUserLoggedOut();
      }
    };

    const attachEl = hfnAuthRef.current ?? queryHFNElement();
    if (attachEl) {
      attachEl.addEventListener("userLoggedOut", handleUserLoggedOut);
    }

    return () => {
      mounted = false;
      const el = hfnAuthRef.current ?? queryHFNElement();
      if (el) {
        el.removeEventListener("userLoggedOut", handleUserLoggedOut);
      }
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
      subPath={process.env.NEXT_PUBLIC_HFN_SUBPATH || "plant-tree"}
    />
  );
}
