"use client";

import React, { useState } from "react";
import SpeciesHero from "./SpeciesHero";
import RelatedSpecies from "./RelatedSpecies";
import FAQSection from "./FAQSection";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";

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
  const [isGeoTagged, setIsGeoTagged] = useState(true);

  const handlePlantTree = () => {
    console.log(`Plant ${speciesData.name} tree`);
  };

  const handleGiftTree = () => {
    console.log(`Gift ${speciesData.name} tree`);
  };

  return (
    <main className="max-w-7xl mx-auto md:px-8 px-4 md:pt-8 pt-4 space-y-8 md:space-y-16">
      {/* Species Hero Section */}
      <SpeciesHero
        name={speciesData.name}
        scientificName={speciesData.scientificName}
        description={speciesData.description}
        treeSpecies={speciesData.treeSpecies}
        characteristics={speciesData.characteristics}
        isGeoTagged={isGeoTagged}
        onGeoTaggedChange={setIsGeoTagged}
        onPlantTree={handlePlantTree}
        onGiftTree={handleGiftTree}
        heroImageUrl={speciesData.treeSpecies?.[0]?.imageUrl}
        heroImageAlt={
          speciesData.treeSpecies?.[0]?.imageAlt ?? speciesData.name
        }
      />

      <FAQSection />
      <RelatedSpecies />

      {/* Mobile Sticky Actions */}
      <GeoTagToggleAndActions
        isGeoTagged={isGeoTagged}
        onGeoTaggedChange={setIsGeoTagged}
        onPlantTree={handlePlantTree}
        onGiftTree={handleGiftTree}
        variant="mobile"
      />
    </main>
  );
};

export default SpeciesDetailPage;
