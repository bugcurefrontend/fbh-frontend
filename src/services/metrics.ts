/**
 * Metrics API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Metric, MetricSimplified } from "@/types/metric";

/**
 * Transform raw Strapi metric data to simplified format
 */
function transformMetric(metric: Metric): MetricSimplified {
  return {
    id: metric.id,
    documentId: metric.documentId,
    icon: metric.icon?.url || "",
    label: metric.description,
    value: metric.value,
    deleted: metric.deleted || false,
  };
}

/**
 * Fetch all metrics from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllMetrics = cache(async (): Promise<MetricSimplified[]> => {
  try {
    let allMetrics: Metric[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI("/metrics", {
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
        allMetrics = allMetrics.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    // Transform to simplified format and filter out deleted
    return allMetrics
      .filter((m: Metric) => !m.deleted)
      .map((m: Metric) => transformMetric(m));
  } catch (error) {
    console.error("Error fetching all metrics:", error);
    return [];
  }
});
