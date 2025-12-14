/**
 * Testimonials API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Testimonial, TestimonialSimplified } from "@/types/testimonial";

/**
 * Transform raw Strapi testimonial data to simplified format
 */
function transformTestimonial(testimonial: Testimonial): TestimonialSimplified {
  return {
    id: testimonial.id,
    documentId: testimonial.documentId,
    name: testimonial.name,
    designation: testimonial.designation,
    quote: testimonial.body,
    src: testimonial.profile_image?.url || "",
    videoUrl: testimonial.video_url || null,
    deleted: testimonial.deleted || false,
  };
}

/**
 * Fetch all testimonials from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllTestimonials = cache(async (): Promise<TestimonialSimplified[]> => {
  try {
    let allTestimonials: Testimonial[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI("/testimonials", {
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
        allTestimonials = allTestimonials.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    // Transform to simplified format and filter out deleted
    return allTestimonials
      .filter((t: Testimonial) => !t.deleted)
      .map((t: Testimonial) => transformTestimonial(t));
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    return [];
  }
});
