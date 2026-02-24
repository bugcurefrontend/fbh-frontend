import { cache } from "react";
import { fetchAPI, getStrapiURL } from "./api";
import { Attribute } from "@/types/attribute";
import { serviceErrorFallback } from "./service-utils";

interface AttributeRecord {
  id: number;
  name?: string;
  type?: string;
  image?: { data?: { attributes?: { url?: string } }; url?: string };
  icon?: { data?: { attributes?: { url?: string } }; url?: string };
  attributes?: {
    name?: string;
    type?: string;
    image?: { data?: { attributes?: { url?: string } }; url?: string };
    icon?: { data?: { attributes?: { url?: string } }; url?: string };
  };
}

/**
 * Fetch all attributes from Strapi
 * Wrapped with React cache() to deduplicate requests during a single render pass
 */
export const fetchAllAttributes = cache(async (): Promise<Attribute[]> => {
  const path = "/attributes";
  const urlParamsObject = {
    populate: ["image", "icon"],
    sort: { id: "asc" },
    pagination: {
      pageSize: 100,
    },
  };

  try {
    const response = await fetchAPI<
      { data?: AttributeRecord[] } | AttributeRecord[]
    >(path, urlParamsObject);

    if (!response) return [];

    // The fetchAPI utility typically unpacks the response.
    // If response is the array of items:
    const items = Array.isArray(response) ? response : response.data || [];

    return items.map((item: AttributeRecord) => {
      // Handle Strapi v4 structure (attributes) vs flattened
      const attrs = item.attributes || item;

      const imageUrlRaw =
        attrs.image?.data?.attributes?.url || attrs.image?.url || "";
      const iconUrlRaw =
        attrs.icon?.data?.attributes?.url || attrs.icon?.url || "";

      const getFullUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("//")) return url;
        return getStrapiURL(url);
      };

      return {
        id: item.id,
        name: attrs.name || "",
        type: attrs.type || "",
        image: getFullUrl(imageUrlRaw),
        icon: getFullUrl(iconUrlRaw),
      };
    });
  } catch (error) {
    return serviceErrorFallback("Error fetching attributes:", error, []);
  }
});
