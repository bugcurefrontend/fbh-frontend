/**
 * Global API Service
 */

import { cache } from "react";
import { fetchAPI, getStrapiURL } from "./api";
import { GlobalContent } from "@/types/global";
import { Attribute } from "@/types/attribute";

export const fetchGlobal = cache(async (): Promise<GlobalContent | null> => {
  try {
    // Only populate known/valid keys. The Strapi schema uses the typo `about_us_hearderimage` (legacy), so avoid the invalid `about_us_headerimage` key which causes a 400.
    const data = await fetchAPI("/global", {
      populate: {
        projects_list_headerimage: true,
        species_list_headerimage: true,
        about_us_hearderimage: true, // keep the legacy/misspelled key
        our_team_headerimage: true,
        sample_certificate: true,
        avatar: true,
        default_attribute: true,
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

    const extractMedia = (media: any) => {
      if (!media) return null;
      const source = media.data || media;
      const url =
        source?.attributes?.url || source?.url || source?.formats?.large?.url || source?.formats?.medium?.url || source?.formats?.small?.url || "";
      const width = source?.attributes?.width || source?.width || source?.attributes?.formats?.large?.width || undefined;
      const height = source?.attributes?.height || source?.height || source?.attributes?.formats?.large?.height || undefined;
      return { id: source?.id || 0, url: normalizeUrl(url || ""), width, height };
    };

    const extractAttribute = (attr: any): Attribute | null => {
      if (!attr) return null;
      const source = attr.data || attr;
      const attributes = source?.attributes || source;
      return {
        id: source?.id || 0,
        name: attributes?.name || "",
        type: attributes?.type || "",
        image: attributes?.image?.data ? normalizeUrl(attributes.image.data?.attributes?.url || "") : attributes?.image || "",
      } as Attribute;
    };

    return {
      projects_list_headerimage: extractMedia(attrs.projects_list_headerimage) || null,
      species_list_headerimage: extractMedia(attrs.species_list_headerimage) || null,
      about_us_hearderimage: extractMedia(attrs.about_us_hearderimage) || null,
      about_us_headerimage: extractMedia(attrs.about_us_headerimage) || null,
      our_team_headerimage: extractMedia(attrs.our_team_headerimage) || null,
      sample_certificate: extractMedia(attrs.sample_certificate) || null,
      avatar: extractMedia(attrs.avatar) || null,
      co2_sequestation: attrs.co2_sequestation ?? undefined,
      default_attribute: extractAttribute(attrs.default_attribute),
      copyright: attrs.copyright ?? null,
    };
  } catch (error) {
    console.error("Error fetching Global content:", error);
    return null;
  }
});