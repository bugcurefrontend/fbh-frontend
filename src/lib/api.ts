import { Article } from "@/types/article";
import { Species, SpeciesSimplified, FAQ } from "@/types/species";

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

// Helper function to transform species data to simplified format
function transformSpecies(species: Species): SpeciesSimplified {
  const faqs: FAQ[] = [
    { question: species.faq1_question, answer: species.faq1_answer },
    { question: species.faq2_question, answer: species.faq2_answer },
    { question: species.faq3_question, answer: species.faq3_answer },
    { question: species.faq4_question, answer: species.faq4_answer },
    { question: species.faq5_question, answer: species.faq5_answer },
  ].filter(faq => faq.question && faq.answer); // Filter out empty FAQs

  return {
    id: species.id,
    documentId: species.documentId,
    name: species.common_name,
    scientificName: species.scientific_name,
    description: species.description,
    lifespan: species.lifespan,
    oxygenReleased: species.oxygen_released,
    maxHeight: species.max_height,
    image: species.images[0]?.url || "",
    images: species.images,
    faqs,
    deleted: species.deleted,
    createdAt: species.createdAt,
    updatedAt: species.updatedAt,
  };
}

// Fetch all species with automatic pagination
export async function getSpecies(): Promise<SpeciesSimplified[]> {
  try {
    let allSpecies: Species[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages
    do {
      const response = await fetch(
        `${API_BASE_URL}/api/species?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=100`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch species");
      }

      const data = await response.json();

      // Get pagination info
      if (data.meta?.pagination) {
        totalPages = data.meta.pagination.pageCount;
      }

      // Add species from this page
      if (data.data && Array.isArray(data.data)) {
        allSpecies = allSpecies.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    // Filter out deleted species and transform to simplified format
    const transformed = allSpecies
      .filter((species: Species) => !species.deleted)
      .map((species: Species) => transformSpecies(species));

    return transformed;
  } catch (error) {
    console.error("Error fetching species:", error);
    return [];
  }
}

// Fetch single species by ID or documentId
export async function getSpeciesById(id: string | number): Promise<SpeciesSimplified | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/species/${id}?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch species with id: ${id}`);
    }

    const data = await response.json();

    if (data.data) {
      const species: Species = data.data;

      // Don't return deleted species
      if (species.deleted) {
        return null;
      }

      return transformSpecies(species);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching species with id ${id}:`, error);
    return null;
  }
}
