import { fetchAPI, getStrapiURL } from "./api";
import { PlantRate } from "@/types/plant-rate";
import { serviceErrorFallback } from "./service-utils";

interface PlantRateRecord {
    id: number;
    documentId?: string;
    currency_code?: string;
    geotagged_rate?: number;
    non_geotagged_rate?: number;
    deleted?: boolean;
    country_icon?: { data?: { attributes?: { url?: string } }; url?: string };
    attributes?: {
        currency_code?: string;
        geotagged_rate?: number;
        non_geotagged_rate?: number;
        deleted?: boolean;
        country_icon?: { data?: { attributes?: { url?: string } }; url?: string };
    };
}

export async function fetchAllPlantRates(): Promise<PlantRate[]> {
    const path = "/plant-rates";
    const urlParamsObject = {
        populate: ["country_icon"],
        pagination: {
            pageSize: 100,
        },
    };

    try {
        const response = await fetchAPI<{ data?: PlantRateRecord[] } | PlantRateRecord[]>(path, urlParamsObject);

        if (!response) return [];

        const items = Array.isArray(response) ? response : response.data || [];

        return items
            .map((item: PlantRateRecord) => {
                const attrs = item.attributes || item;

                const iconUrlRaw = attrs.country_icon?.data?.attributes?.url || attrs.country_icon?.url || "";

                const getFullUrl = (url: string) => {
                    if (!url) return "";
                    if (url.startsWith("http") || url.startsWith("//")) return url;
                    return getStrapiURL(url);
                };

                return {
                    id: item.id,
                    documentId: item.documentId || String(item.id),
                    currency_code: attrs.currency_code || "",
                    geotagged_rate: attrs.geotagged_rate ?? 0,
                    non_geotagged_rate: attrs.non_geotagged_rate ?? 0,
                    deleted: attrs.deleted || false,
                    country_icon: getFullUrl(iconUrlRaw),
                };
            })
            .filter((rate) => !rate.deleted);
    } catch (error) {
        return serviceErrorFallback("Error fetching plant rates:", error, []);
    }
}

