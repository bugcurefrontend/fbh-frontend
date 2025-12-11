"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SpeciesDetailPage from "../../src/components/SpeciesDetailPage";
import { getSpeciesById } from "../../src/lib/api";
import { SpeciesSimplified } from "../../src/types/species";

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

function SpeciesDetailContent() {
  const searchParams = useSearchParams();
  const speciesId = searchParams.get("id");

  const [speciesData, setSpeciesData] = useState<SpeciesDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeciesDetail = async () => {
      if (!speciesId) {
        setError("No species ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const species = await getSpeciesById(speciesId);

        if (!species) {
          setError("Species not found");
          setLoading(false);
          return;
        }

        const transformedData = transformToDetailData(species);
        setSpeciesData(transformedData);
      } catch (err) {
        console.error("Error fetching species:", err);
        setError("Failed to load species details");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeciesDetail();
  }, [speciesId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading species details...</p>
      </div>
    );
  }

  if (error || !speciesData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-lg">{error || "Species not found"}</p>
          <a href="/species" className="text-blue-600 underline">
            Back to All Species
          </a>
        </div>
      </div>
    );
  }

  return <SpeciesDetailPage speciesData={speciesData} />;
}

export default function SpeciesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading species details...</p>
      </div>
    }>
      <SpeciesDetailContent />
    </Suspense>
  );
}
