/**
 * UsefulLink API Service
 * Direct Strapi API calls at build time
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { UsefulLink, UsefulLinkItem, UsefulLinkSimplified } from "@/types/useful-link";

/**
 * Transform raw Strapi UsefulLink data to simplified format
 */
function transformUsefulLink(data: UsefulLink): UsefulLinkSimplified {
  const items: UsefulLinkItem[] = [
    { label: data.label1, url: data.url1 },
    { label: data.label2, url: data.url2 },
    { label: data.label3, url: data.url3 },
    { label: data.label4, url: data.url4 },
    { label: data.label5, url: data.url5 },
    { label: data.label6, url: data.url6 },
  ].filter((item) => item.label && item.url);

  return { items };
}

/**
 * Fetch useful links from Strapi API (Single Type)
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchUsefulLinks = cache(async (): Promise<UsefulLinkSimplified> => {
  try {
    const data = await fetchAPI("/useful-link", {});

    if (data.data) {
      return transformUsefulLink(data.data);
    }

    return { items: [] };
  } catch (error) {
    console.error("Error fetching useful links:", error);
    return { items: [] };
  }
});
