import { Article } from "@/types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_FBH_API_URL || "https://api.fbh.dev.heartfulness.org";
const API_TOKEN = process.env.NEXT_PUBLIC_FBH_API_TOKEN || "22001a4ea070d3acff0b0c6bda31758fc17b2bfe084eaf7ea44c287da1884a376a53e3ad2204a78d518f9bb3596b2055fe01d38ded7cfcdc5cd3ef118a52ff6c4011c39bebf62b0f842860aef183ee905a07fc593efba9bc63930decb861dc410827d74cbfed6fb64d404870131ebcc6a59289e36802c8f91f239c21db290d46";

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await response.json();

    // Transform Strapi data to match our Article interface
    if (data.data && Array.isArray(data.data)) {
      const transformed = data.data.map((item: any) => ({
        id: item.id,
        title: item.title || item.attributes?.title || "",
        description: item.description || item.attributes?.description || "",
        image: item.image?.url || item.attributes?.image?.data?.attributes?.url || "",
        date: item.date || item.attributes?.date || new Date().toISOString(),
      }));
      return transformed;
    }

    return data.data || data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
