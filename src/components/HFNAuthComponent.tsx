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

    import("hfnauth/main")
      .then(async () => {
        if (!mounted) return;

        await new Promise(resolve => setTimeout(resolve, 100));

        const authEl = hfnAuthRef.current ?? queryHFNElement();

        if (authEl) {
          // DO NOT set loginCallback here - it's handled by OneAuth.tsx on the callback page
          // Setting it here causes duplicate processing and "code invalid" errors

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
