/**
 * Articles API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Article } from "@/types/article";
import { serviceErrorFallback } from "./service-utils";

interface ArticleRecord {
  id: number;
  deleted?: boolean;
  title?: string;
  description?: string;
  image?: { url?: string };
  date?: string;
  url?: string;
  attributes?: {
    title?: string;
    description?: string;
    image?: { data?: { attributes?: { url?: string } } };
    date?: string;
    url?: string;
  };
}

/**
 * Fetch all articles from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllArticles = cache(async (): Promise<Article[]> => {
  try {
    let allArticles: ArticleRecord[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI<{ data?: ArticleRecord[]; meta?: { pagination?: { pageCount: number } } }>("/articles", {
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

    return allArticles
      .filter((item) => !item.deleted)
      .map((item) => ({
        id: item.id,
        title: item.title || item.attributes?.title || "",
        description: item.description || item.attributes?.description || "",
        image: item.image?.url || item.attributes?.image?.data?.attributes?.url || "",
        date: item.date || item.attributes?.date || new Date().toISOString(),
        url: item.url || item.attributes?.url || "",
        deleted: item.deleted || false,
      }));
  } catch (error) {
    return serviceErrorFallback("Error fetching articles:", error, []);
  }
});

