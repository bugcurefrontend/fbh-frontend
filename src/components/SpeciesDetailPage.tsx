"use client";

import React, { useState } from "react";
import SpeciesHero from "./SpeciesHero";
import RelatedSpecies from "./RelatedSpecies";
import FAQSection from "./FAQSection";

interface SpeciesDetailData {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
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
  benefits: string[];
  growthInfo: string[];
  environmentalImpact: string[];
}

interface SpeciesDetailPageProps {
  speciesData: SpeciesDetailData;
}

const SpeciesDetailPage: React.FC<SpeciesDetailPageProps> = ({
  speciesData,
}) => {
  const [isGeoTagged, setIsGeoTagged] = useState(false);

  const handlePlantTree = () => {
    console.log(`Plant ${speciesData.name} tree`);
  };

  const handleGiftTree = () => {
    console.log(`Gift ${speciesData.name} tree`);
  };

  return (
    <main className="mx-auto md:px-8 px-4 md:pt-8 pt-4 md:space-y-16 space-y-8">
      {/* Species Hero Section */}
      <SpeciesHero
        name={speciesData.name}
        scientificName={speciesData.scientificName}
        description={speciesData.description}
        treeSpecies={speciesData.treeSpecies}
        heroImageUrl={speciesData.heroImageUrl}
        heroImageAlt={speciesData.heroImageAlt}
        characteristics={speciesData.characteristics}
        isGeoTagged={isGeoTagged}
        onGeoTaggedChange={setIsGeoTagged}
        onPlantTree={handlePlantTree}
        onGiftTree={handleGiftTree}
      />

      <FAQSection />
      <RelatedSpecies />
    </main>
  );
};

export default SpeciesDetailPage;
