/**
 * FooterMenu API Service
 * Direct Strapi API calls at build time
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { FooterMenu, FooterMenuItem, FooterMenuSimplified } from "@/types/footer-menu";

/**
 * Transform raw Strapi FooterMenu data to simplified format
 */
function transformFooterMenu(menu: FooterMenu): FooterMenuSimplified {
  const items: FooterMenuItem[] = [
    { label: menu.label1, url: menu.url1 },
    { label: menu.label2, url: menu.url2 },
    { label: menu.label3, url: menu.url3 },
    { label: menu.label4, url: menu.url4 },
    { label: menu.label5, url: menu.url5 },
  ].filter((item) => item.label && item.url);

  return { items };
}

/**
 * Fetch footer menu from Strapi API (Single Type)
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchFooterMenu = cache(async (): Promise<FooterMenuSimplified> => {
  try {
    const data = await fetchAPI("/footer-menu", {});

    if (data.data) {
      return transformFooterMenu(data.data);
    }

    return { items: [] };
  } catch (error) {
    console.error("Error fetching footer menu:", error);
    return { items: [] };
  }
});
