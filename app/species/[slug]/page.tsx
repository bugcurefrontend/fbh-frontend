import { notFound } from "next/navigation";
import SpeciesDetailPage from "../../../src/components/SpeciesDetailPage";
import { SpeciesSimplified } from "../../../src/types/species";
import { findSpeciesBySlug, generateSlug } from "../../../src/lib/slug";
import fs from "fs";
import path from "path";

// Generate static paths at build time
export async function generateStaticParams() {
  try {
    const speciesPath = path.join(process.cwd(), 'public/data/species.json');

    if (fs.existsSync(speciesPath)) {
      const species = JSON.parse(fs.readFileSync(speciesPath, 'utf8'));
      return species.map((s: SpeciesSimplified) => ({
        slug: generateSlug(s.name),
      }));
    }

    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
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
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  try {
    // Try to read from static JSON file
    const speciesPath = path.join(process.cwd(), 'public/data/species.json');
    let allSpecies: SpeciesSimplified[] = [];

    if (fs.existsSync(speciesPath)) {
      allSpecies = JSON.parse(fs.readFileSync(speciesPath, 'utf8'));
    }

    // Find species by slug
    const species = findSpeciesBySlug(allSpecies, slug);

    if (!species) {
      notFound();
    }

    const transformedData = transformToDetailData(species);
    return <SpeciesDetailPage speciesData={transformedData} />;
  } catch (error) {
    console.error("Error loading species:", error);
    notFound();
  }
}
