"use client";

/**
 * Debug helper for HFN Auth troubleshooting
 */
export function logAuthDebugInfo() {
  if (typeof window === "undefined") return;

  const debugInfo = {
    currentURL: window.location.href,
    expectedRedirectURI: `${window.location.origin}/hfnauth/authorization`,
    environment: {
      authUrl: process.env.NEXT_PUBLIC_HFN_AUTH_URL,
      clientId: process.env.NEXT_PUBLIC_HFN_CLIENT_ID,
      realm: process.env.NEXT_PUBLIC_HFN_REALM,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      xClientId: process.env.NEXT_PUBLIC_X_CLIENT_ID,
    },
    localStorage: {
      isAuthenticated: localStorage.getItem("isAuthenticated"),
      hasUserProfile: !!localStorage.getItem("userProfile"),
      hasAuthInfo: !!localStorage.getItem("authInfo"),
      landingPage: localStorage.getItem("landingPage"),
    },
  };

  console.group("🔍 HFN Auth Debug Info");
  console.log("Current URL:", debugInfo.currentURL);
  console.log("Expected Redirect URI:", debugInfo.expectedRedirectURI);
  console.log("Environment Config:", debugInfo.environment);
  console.log("LocalStorage State:", debugInfo.localStorage);
  console.groupEnd();

  return debugInfo;
}

/**
 * Check if HFN Auth element is ready
 */
export function checkHFNAuthElement(): boolean {
  const element = document.querySelector("hfn-auth");
  const isReady = !!element;

  console.log("HFN Auth Element Status:", {
    exists: isReady,
    element: element,
    hasTriggerAuth: !!(element as any)?.triggerAuth,
    hasLoginCallback: !!(element as any)?.loginCallback,
  });

  return isReady;
}
