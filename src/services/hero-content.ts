/**
 * Hero Content API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { HeroContent, HeroContentSimplified } from "@/types/hero-content";

/**
 * Transform raw Strapi hero content data to simplified format
 */
function transformHeroContent(heroContent: HeroContent): HeroContentSimplified {
  return {
    id: heroContent.id,
    documentId: heroContent.documentId,
    title: heroContent.title,
    buttonText: heroContent.button_label,
    buttonUrl: heroContent.button_url,
    bgImage: heroContent.image?.url || "",
    deleted: heroContent.deleted || false,
  };
}

/**
 * Fetch all hero contents from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllHeroContents = cache(async (): Promise<HeroContentSimplified[]> => {
  try {
    let allHeroContents: HeroContent[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI("/hero-contents", {
        populate: "*",
        pagination: {
          page: currentPage,
          pageSize: 100,
        },
        filters: {
          deleted: { $eq: false },
        },
      });

      if (data.meta?.pagination) {
        totalPages = data.meta.pagination.pageCount;
      }

      if (data.data && Array.isArray(data.data)) {
        allHeroContents = allHeroContents.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    // Transform to simplified format and filter out deleted
    return allHeroContents
      .filter((hc: HeroContent) => !hc.deleted)
      .map((hc: HeroContent) => transformHeroContent(hc));
  } catch (error) {
    console.error("Error fetching all hero contents:", error);
    return [];
  }
});
