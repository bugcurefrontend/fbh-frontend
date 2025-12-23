"use client";

import React, { useState } from "react";
import SpeciesHero from "./SpeciesHero";
import RelatedSpecies from "./RelatedSpecies";
import FAQSection from "./FAQSection";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";
import { useCurrency } from "./CurrencySelect";
import { PlantRates } from "@/types/plant-rate";

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
    mdHeight: string;
  };
  faqs: FAQ[];
  benefits: string[];
  growthInfo: string[];
  environmentalImpact: string[];
  videoThumbnail?: string | null;
  videoUrl?: string | null;
}

interface SpeciesDetailPageProps {
  speciesData: SpeciesDetailData;
  plantRates: PlantRates;
}

const SpeciesDetailPage: React.FC<SpeciesDetailPageProps> = ({
  speciesData,
  plantRates,
}) => {
  const [isGeoTagged, setIsGeoTagged] = useState(true);
  const { currency, currencySymbol } = useCurrency();

  // Get rates based on selected currency
  const currentRate = plantRates[currency];
  const geotaggedRate = currentRate?.geotagged_rate;
  const nonGeotaggedRate = currentRate?.non_geotagged_rate;

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
        videoThumbnail={speciesData.videoThumbnail}
        videoUrl={speciesData.videoUrl}
        geotaggedRate={geotaggedRate}
        nonGeotaggedRate={nonGeotaggedRate}
        currencySymbol={currencySymbol}
      />

      <FAQSection faqs={speciesData.faqs} />
      <RelatedSpecies currentSpeciesId={speciesData.id} />

      {/* Mobile Sticky Actions */}
      <GeoTagToggleAndActions
        isGeoTagged={isGeoTagged}
        onGeoTaggedChange={setIsGeoTagged}
        onPlantTree={handlePlantTree}
        onGiftTree={handleGiftTree}
        variant="mobile"
        geotaggedRate={geotaggedRate}
        nonGeotaggedRate={nonGeotaggedRate}
        currencySymbol={currencySymbol}
      />
    </main>
  );
};

export default SpeciesDetailPage;
