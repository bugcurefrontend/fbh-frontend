/**
 * Our Team Content API Service
 */

import { cache } from "react";
import { fetchAPI, getStrapiURL } from "./api";
import { OurTeamContent } from "@/types/our-team-content";
import { serviceErrorFallback } from "./service-utils";

interface TeamGalleryImage {
    id: number;
    url?: string;
    attributes?: { url?: string };
}

interface TeamContentResponse {
    id: number;
    gallery?: TeamGalleryImage[];
    attributes?: {
        gallery?: {
            data?: TeamGalleryImage[];
        };
    };
}

/**
 * Fetch Our Team Content
 */
export const fetchOurTeamContent = cache(async (): Promise<OurTeamContent | null> => {
    try {
        const data = await fetchAPI<{ data?: TeamContentResponse }>("/our-team-content", {
            populate: {
                gallery: true,
            },
        });

        if (!data.data) return null;

        const item = data.data;

        const normalizeUrl = (rawUrl: string) => {
            if (!rawUrl) return "";
            if (rawUrl.startsWith("http")) return rawUrl;
            // rawUrl might be like /uploads/xyz.jpg - prefix with Strapi base
            return getStrapiURL(rawUrl);
        };

        const galleryFromTop = item.gallery?.map((img: TeamGalleryImage) => ({
            id: img.id,
            url: normalizeUrl(img.url || img.attributes?.url || ""),
        }));

        const galleryFromAttributes = item.attributes?.gallery?.data?.map((img: TeamGalleryImage) => ({
            id: img.id,
            url: normalizeUrl(img.attributes?.url || ""),
        }));

        return {
            id: item.id,
            gallery: galleryFromTop && galleryFromTop.length ? galleryFromTop : (galleryFromAttributes || []),
        };
    } catch (error) {
        return serviceErrorFallback("Error fetching Our Team Content:", error, null);
    }
});

