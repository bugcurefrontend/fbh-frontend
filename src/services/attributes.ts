/**
 * Attributes API Service
 * Direct Strapi API calls at build time
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Attribute } from "@/types/attribute";

/**
 * Fetch all attributes from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllAttributes = cache(async (): Promise<Attribute[]> => {
    try {
        const allAttributes: any[] = [];
        let currentPage = 1;
        let totalPages = 1;

        // Fetch all pages to handle large datasets
        do {
            const data = await fetchAPI("/attributes", {
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
                allAttributes.push(...data.data);
            }

            currentPage++;
        } while (currentPage <= totalPages);

        return allAttributes.map((item: any) => ({
            id: item.id,
            name: item.name || item.attributes?.name || "",
            type: item.type || item.attributes?.type || "",
            image: item.image?.url || item.attributes?.image?.data?.attributes?.url || "",
        }));
    } catch (error) {
        console.error("Error fetching attributes:", error);
        return [];
    }
});
