import { fetchAPI, getStrapiURL } from "./api";
import { PlantRate } from "@/types/plant-rate";

export async function fetchAllPlantRates(): Promise<PlantRate[]> {
    const path = "/plant-rates";
    const urlParamsObject = {
        populate: ["country_icon"],
        pagination: {
            pageSize: 100,
        },
    };

    try {
        const response = await fetchAPI(path, urlParamsObject);

        if (!response) return [];

        const items = Array.isArray(response) ? response : response.data || [];

        return items
            .map((item: any) => {
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
                    currency_code: attrs.currency_code,
                    geotagged_rate: attrs.geotagged_rate,
                    non_geotagged_rate: attrs.non_geotagged_rate,
                    deleted: attrs.deleted || false,
                    country_icon: getFullUrl(iconUrlRaw),
                };
            })
            .filter((rate: PlantRate) => !rate.deleted);
    } catch (error) {
        console.error("Error fetching plant rates:", error);
        return [];
    }
}
