/**
 * Species API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI, isNotEmpty } from "./api";
import { Species, SpeciesSimplified, FAQ } from "@/types/species";

/**
 * Transform raw Strapi species data to simplified format
 */
function transformSpecies(species: Species): SpeciesSimplified {
  const faqs: FAQ[] = [
    { question: species.faq1_question, answer: species.faq1_answer },
    { question: species.faq2_question, answer: species.faq2_answer },
    { question: species.faq3_question, answer: species.faq3_answer },
    { question: species.faq4_question, answer: species.faq4_answer },
    { question: species.faq5_question, answer: species.faq5_answer },
    { question: species.faq6_question || "", answer: species.faq6_answer || "" },
  ].filter((faq) => faq.question && faq.answer);

  return {
    id: species.id,
    documentId: species.documentId,
    name: species.common_name,
    scientificName: species.scientific_name,
    description: species.description,
    lifespan: species.lifespan,
    oxygenReleased: species.oxygen_released,
    maxHeight: species.max_height,
    image: species.images[0]?.url || "",
    images: species.images,
    videoThumbnail: species.video_thumbnail?.url || null,
    videoUrl: species.video_url || null,
    faqs,
    deleted: species.deleted,
    popular: species.popular || false,
    createdAt: species.createdAt,
    updatedAt: species.updatedAt,
  };
}

/**
 * Generate URL-friendly slug from species name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetch all species from Strapi API
 * Used for generateStaticParams and listing pages
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllSpecies = cache(async (): Promise<SpeciesSimplified[]> => {
  try {
    let allSpecies: Species[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages
    do {
      const data = await fetchAPI("/species", {
        populate: "*",
        pagination: {
          page: currentPage,
          pageSize: 100,
        },
        filters: {
          deleted: { $eq: false },
        },
      });

      // Get pagination info
      if (data.meta?.pagination) {
        totalPages = data.meta.pagination.pageCount;
      }

      // Add species from this page
      if (data.data && Array.isArray(data.data)) {
        allSpecies = allSpecies.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    // Transform to simplified format
    return allSpecies
      .filter((species: Species) => !species.deleted)
      .map((species: Species) => transformSpecies(species));
  } catch (error) {
    console.error("Error fetching all species:", error);
    return [];
  }
});

/**
 * Fetch all species slugs for static generation
 * Returns array of { slug: string } for generateStaticParams
 */
export async function fetchSpeciesSlugs(): Promise<{ slug: string }[]> {
  try {
    const species = await fetchAllSpecies();
    return species.map((s) => ({
      slug: generateSlug(s.name),
    }));
  } catch (error) {
    console.error("Error fetching species slugs:", error);
    return [];
  }
}

/**
 * Fetch single species by slug
 * Fetches all species and finds by matching slug (since Strapi doesn't have slug field)
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchSpeciesBySlug = cache(async (
  slug: string
): Promise<SpeciesSimplified | null> => {
  try {
    const allSpecies = await fetchAllSpecies();
    const species = allSpecies.find((s) => generateSlug(s.name) === slug);
    return species || null;
  } catch (error) {
    console.error(`Error fetching species by slug ${slug}:`, error);
    return null;
  }
});

/**
 * Fetch single species by documentId
 * Direct API call with filter
 */
export async function fetchSpeciesById(
  documentId: string
): Promise<SpeciesSimplified | null> {
  try {
    const data = await fetchAPI(`/species/${documentId}`, {
      populate: "*",
    });

    if (data.data) {
      const species: Species = data.data;
      if (species.deleted) {
        return null;
      }
      return transformSpecies(species);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching species by id ${documentId}:`, error);
    return null;
  }
}

/**
 * Fetch popular species from Strapi API
 * Filters by popular=true for landing page display
 */
export async function fetchPopularSpecies(): Promise<SpeciesSimplified[]> {
  try {
    const data = await fetchAPI("/species", {
      populate: "*",
      filters: {
        deleted: { $eq: false },
        popular: { $eq: true },
      },
    });

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((species: Species) => transformSpecies(species));
    }

    return [];
  } catch (error) {
    console.error("Error fetching popular species:", error);
    return [];
  }
}
