/**
 * Articles API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Article } from "@/types/article";

/**
 * Fetch all articles from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllArticles = cache(async (): Promise<Article[]> => {
  try {
    let allArticles: any[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI("/articles", {
        populate: "*",
        pagination: {
          page: currentPage,
          pageSize: 100,
        },
      });

      if (data.meta?.pagination) {
        totalPages = data.meta.pagination.pageCount;
      }

      if (data.data && Array.isArray(data.data)) {
        allArticles = allArticles.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    return allArticles.map((item: any) => ({
      id: item.id,
      title: item.title || item.attributes?.title || "",
      description: item.description || item.attributes?.description || "",
      image: item.image?.url || item.attributes?.image?.data?.attributes?.url || "",
      date: item.date || item.attributes?.date || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
});
