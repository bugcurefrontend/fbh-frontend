import { Metadata } from "next";
import { notFound } from "next/navigation";
import SpeciesDetailPage from "../../../src/components/SpeciesDetailPage";
import { fetchAllSpecies, fetchSpeciesBySlug, generateSlug } from "@/services/species";
import { SpeciesSimplified } from "@/types/species";

type Params = { slug: string };

/**
 * Generate static paths at build time
 * Fetches all species from Strapi API and generates slugs
 */
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const species = await fetchAllSpecies();
    return species.map((s: SpeciesSimplified) => ({
      slug: generateSlug(s.name),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const species = await fetchSpeciesBySlug(slug);

  if (!species) {
    return {
      title: "Species Not Found",
    };
  }

  return {
    title: `${species.name} - FBH`,
    description: species.description?.slice(0, 160) || `Learn about ${species.name}`,
    openGraph: {
      title: species.name,
      description: species.description?.slice(0, 160),
      images: species.image ? [{ url: species.image }] : [],
    },
  };
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface SpeciesDetailData {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  treeSpecies: {
    id: string;
    imageUrl: string;
    imageAlt: string;
  }[];
  characteristics: {
    lifespan: string;
    oxygenReleased: string;
    height: string;
  };
  faqs: FAQ[];
  benefits: string[];
  growthInfo: string[];
  environmentalImpact: string[];
}

function transformToDetailData(species: SpeciesSimplified): SpeciesDetailData {
  // Transform images array to treeSpecies format
  const treeSpecies = species.images.map((img, index) => ({
    id: `${species.documentId}-image-${index}`,
    imageUrl: img.url,
    imageAlt: `${species.name} - Image ${index + 1}`,
  }));

  // Transform FAQs to include id field
  const faqs = species.faqs.map((faq, index) => ({
    id: `faq-${index + 1}`,
    question: faq.question,
    answer: faq.answer,
  }));

  return {
    id: species.documentId,
    name: species.name,
    scientificName: species.scientificName,
    description: species.description,
    treeSpecies,
    characteristics: {
      lifespan: species.lifespan,
      oxygenReleased: species.oxygenReleased,
      height: species.maxHeight,
    },
    faqs,
    benefits: [],
    growthInfo: [],
    environmentalImpact: [],
  };
}

export default async function SpeciesSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch species from Strapi API
  const species = await fetchSpeciesBySlug(slug);

  if (!species) {
    notFound();
  }

  const transformedData = transformToDetailData(species);
  return <SpeciesDetailPage speciesData={transformedData} />;
}
