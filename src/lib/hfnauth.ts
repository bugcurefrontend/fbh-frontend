"use client";

import type { AuthParams, HFNAuthElement } from "../types/hfnauth-types";

const HFN_TAG = "hfn-auth";

export function queryHFNElement(): HFNAuthElement | null {
  return document.querySelector(HFN_TAG) as unknown as HFNAuthElement | null;
}

export function getAuthParams(): AuthParams {
  return {
    authUrl: process.env.NEXT_PUBLIC_HFN_AUTH_URL || "https://hfnauth.qa.heartfulness.org",
    realm: process.env.NEXT_PUBLIC_HFN_REALM || "heartfulness",
    client_id: process.env.NEXT_PUBLIC_HFN_CLIENT_ID || "e843d6b2-8f97-48bd-93c2-e7dcddc10448",
  };
}

export default {
  queryHFNElement,
  getAuthParams,
};
