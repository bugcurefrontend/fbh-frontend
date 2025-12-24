/**
 * Partners API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { SupportingPartner, PartnerSimplified } from "@/types/partner";

/**
 * Transform raw Strapi partner data to simplified format
 */
function transformPartner(partner: SupportingPartner): PartnerSimplified {
  return {
    id: partner.id,
    documentId: partner.documentId,
    name: partner.name,
    logo: partner.logo?.url || "",
    companyUrl: partner.company_url || null,
  };
}

/**
 * Fetch all supporting partners from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllPartners = cache(
  async (): Promise<PartnerSimplified[]> => {
    try {
      let allPartners: SupportingPartner[] = [];
      let currentPage = 1;
      let totalPages = 1;

      // Fetch all pages to handle large datasets
      do {
        const data = await fetchAPI("/supporting-partners", {
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
          allPartners = allPartners.concat(data.data);
        }

        currentPage++;
      } while (currentPage <= totalPages);

      // Transform to simplified format
      return allPartners.map((partner: SupportingPartner) =>
        transformPartner(partner)
      );
    } catch (error) {
      console.error("Error fetching all partners:", error);
      return [];
    }
  }
);
