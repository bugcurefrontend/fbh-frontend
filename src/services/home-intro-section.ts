/**
 * Home Intro Section API Service
 */

import { cache } from "react";
import { fetchAPI, getStrapiURL } from "./api";
import { HomeIntroSection } from "@/types/home-intro-section";
import { serviceErrorFallback } from "./service-utils";

type ImageLike = {
  id?: number;
  url?: string;
  width?: number;
  height?: number;
  data?: ImageLike;
  attributes?: ImageLike;
  formats?: {
    large?: { url?: string; width?: number; height?: number };
    medium?: { url?: string; width?: number; height?: number };
    small?: { url?: string; width?: number; height?: number };
  };
};

export const fetchHomeIntroSection = cache(async (): Promise<HomeIntroSection | null> => {
  try {
    const data = await fetchAPI("/home-intro-section", {
      populate: {
        image: true,
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

    const extractImage = (img: ImageLike | null | undefined) => {
      if (!img) return null;
      const source = img.data || img;
      const url = source?.attributes?.url || source?.url || source?.formats?.large?.url || source?.formats?.medium?.url || source?.formats?.small?.url || "";
      const width = source?.attributes?.width || source?.width || source?.attributes?.formats?.large?.width || undefined;
      const height = source?.attributes?.height || source?.height || source?.attributes?.formats?.large?.height || undefined;
      return {
        id: source?.id || 0,
        url: normalizeUrl(url || ""),
        width,
        height,
      };
    };

    return {
      title: attrs.title || "",
      description: attrs.description || "",
      button_label: attrs.button_label || "",
      button_url: attrs.button_url || "",
      image: extractImage(attrs.image) || null,
    };
  } catch (error) {
    return serviceErrorFallback("Error fetching Home Intro Section:", error, null);
  }
});

