/**
 * About Content API Service
 */

import { cache } from "react";
import { fetchAPI, getStrapiURL } from "./api";
import { AboutContent } from "@/types/about-content";
import { serviceErrorFallback } from "./service-utils";

type MediaLike = {
  id?: number;
  url?: string;
  width?: number;
  height?: number;
  data?: MediaLike;
  attributes?: MediaLike;
  formats?: {
    large?: { url?: string; width?: number; height?: number };
    medium?: { url?: string; width?: number; height?: number };
    small?: { url?: string; width?: number; height?: number };
  };
};

export const fetchAboutContent = cache(async (): Promise<AboutContent | null> => {
  try {
    const data = await fetchAPI("/about-content", {
      populate: {
        our_origin_one: true,
        our_origin_two: true,
        our_journey_one: true,
        our_journey_two: true,
        our_journey_three: true,
        our_journey_four: true,
        our_journey_five: true,
        our_journey_six: true,
        our_journey_seven: true,
      },
    });

    if (!data?.data) return null;

    const item = data.data;
    const attrs = item.attributes || item;

    const normalizeUrl = (rawUrl: string) => {
      if (!rawUrl) return "";
      if (rawUrl.startsWith("http")) return rawUrl;
      return getStrapiURL(rawUrl);
    };

    const extractMedia = (media: MediaLike | null | undefined) => {
      if (!media) return null;
      const source = media.data || media;
      const url = source?.attributes?.url || source?.url || source?.formats?.large?.url || source?.formats?.medium?.url || source?.formats?.small?.url || "";
      const width = source?.attributes?.width || source?.width || source?.attributes?.formats?.large?.width || undefined;
      const height = source?.attributes?.height || source?.height || source?.attributes?.formats?.large?.height || undefined;
      return { id: source?.id || 0, url: normalizeUrl(url || ""), width, height };
    };

    return {
      total_trees_planted: attrs.total_trees_planted || undefined,
      total_planting_sites: attrs.total_planting_sites || undefined,
      total_volunteers_engaged: attrs.total_volunteers_engaged || undefined,
      total_partner_organisations: attrs.total_partner_organisations || undefined,
      total_countries: attrs.total_countries || undefined,
      total_practitioners: attrs.total_practitioners || undefined,
      total_trainers: attrs.total_trainers || undefined,
      total_meditation_centres: attrs.total_meditation_centres || undefined,
      our_origin_one: extractMedia(attrs.our_origin_one) || null,
      our_origin_two: extractMedia(attrs.our_origin_two) || null,
      our_journey_one: extractMedia(attrs.our_journey_one) || null,
      our_journey_two: extractMedia(attrs.our_journey_two) || null,
      our_journey_three: extractMedia(attrs.our_journey_three) || null,
      our_journey_four: extractMedia(attrs.our_journey_four) || null,
      our_journey_five: extractMedia(attrs.our_journey_five) || null,
      our_journey_six: extractMedia(attrs.our_journey_six) || null,
      our_journey_seven: extractMedia(attrs.our_journey_seven) || null,
    };
  } catch (error) {
    return serviceErrorFallback("Error fetching About Content:", error, null);
  }
});

