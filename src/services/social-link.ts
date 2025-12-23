/**
 * SocialLink API Service
 * Direct Strapi API calls at build time
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { SocialLink, SocialLinkSimplified } from "@/types/social-link";

/**
 * Transform raw Strapi SocialLink data to simplified format
 */
function transformSocialLink(data: SocialLink): SocialLinkSimplified {
  return {
    youtube: data.youtube_url || "",
    linkedin: data.linkedin_url || "",
    instagram: data.instagram_url || "",
    facebook: data.facebook_url || "",
    x: data.x_url || "",
    appstore: data.appstore_url || "",
    playstore: data.playstore_url || "",
  };
}

/**
 * Fetch social links from Strapi API (Single Type)
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchSocialLinks = cache(async (): Promise<SocialLinkSimplified> => {
  try {
    const data = await fetchAPI("/social-link", {});

    if (data.data) {
      return transformSocialLink(data.data);
    }

    return {
      youtube: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      x: "",
      appstore: "",
      playstore: "",
    };
  } catch (error) {
    console.error("Error fetching social links:", error);
    return {
      youtube: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      x: "",
      appstore: "",
      playstore: "",
    };
  }
});
