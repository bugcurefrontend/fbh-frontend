import { Article } from "@/types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_FBH_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_FBH_API_TOKEN;

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
