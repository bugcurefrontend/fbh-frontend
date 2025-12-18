/**
 * PlantRate API Service
 * Fetches tree planting rates from Strapi API
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { PlantRate } from "@/types/plant-rate";

/**
 * Fetch plant rates from Strapi API
 * Returns the first non-deleted rate entry
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchPlantRate = cache(async (): Promise<PlantRate | null> => {
  try {
    const data = await fetchAPI("/plant-rates", {
      filters: {
        deleted: { $eq: false },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    });

    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0];
    }

    return null;
  } catch (error) {
    console.error("Error fetching plant rate:", error);
    return null;
  }
});

/**
 * Get the appropriate rate based on geo-tagged selection
 * @param isGeoTagged - Whether user selected geo-tagged trees
 * @returns The rate amount or default fallback
 */
export async function getTreeRate(isGeoTagged: boolean): Promise<number> {
  const plantRate = await fetchPlantRate();

  if (!plantRate) {
    // Fallback to default rate if API fails
    return 175;
  }

  return isGeoTagged ? plantRate.geotagged_rate : plantRate.non_geotagged_rate;
}
