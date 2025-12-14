/**
 * Case Studies API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { CaseStudy, CaseStudySimplified } from "@/types/case-study";

/**
 * Generate URL-friendly slug from case study title
 */
export function generateCaseStudySlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Transform raw Strapi case study data to simplified format
 */
function transformCaseStudy(caseStudy: CaseStudy): CaseStudySimplified {
  return {
    id: caseStudy.id,
    documentId: caseStudy.documentId,
    title: caseStudy.title,
    address: caseStudy.address,
    description: caseStudy.description || "",
    image: caseStudy.media?.[0]?.url || "",
    images: caseStudy.media || [],
    partnerLogos: caseStudy.partners?.map((p) => p.url) || [],
    deleted: caseStudy.deleted || false,
  };
}

/**
 * Fetch all case studies from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllCaseStudies = cache(async (): Promise<CaseStudySimplified[]> => {
  try {
    let allCaseStudies: CaseStudy[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI("/case-studies", {
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
        allCaseStudies = allCaseStudies.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    // Transform to simplified format and filter out deleted
    return allCaseStudies
      .filter((cs: CaseStudy) => !cs.deleted)
      .map((cs: CaseStudy) => transformCaseStudy(cs));
  } catch (error) {
    console.error("Error fetching all case studies:", error);
    return [];
  }
});

/**
 * Fetch all case study slugs for static generation
 * Returns array of { slug: string } for generateStaticParams
 */
export async function fetchCaseStudySlugs(): Promise<{ slug: string }[]> {
  try {
    const caseStudies = await fetchAllCaseStudies();
    return caseStudies.map((cs) => ({
      slug: generateCaseStudySlug(cs.title),
    }));
  } catch (error) {
    console.error("Error fetching case study slugs:", error);
    return [];
  }
}

/**
 * Fetch single case study by slug
 * Fetches all case studies and finds by matching slug
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchCaseStudyBySlug = cache(async (
  slug: string
): Promise<CaseStudySimplified | null> => {
  try {
    const allCaseStudies = await fetchAllCaseStudies();
    const caseStudy = allCaseStudies.find(
      (cs) => generateCaseStudySlug(cs.title) === slug
    );
    return caseStudy || null;
  } catch (error) {
    console.error(`Error fetching case study by slug ${slug}:`, error);
    return null;
  }
});
