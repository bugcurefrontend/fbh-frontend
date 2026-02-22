"use client";

import React, { useRef, useState } from "react";
import ProjectHero from "./ProjectHero";
import ProjectTabs from "./ProjectTabs";
import ProjectAccordion from "./ProjectAccordion";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";
import { useCurrency } from "./CurrencySelect";
import { PlantRate } from "@/types/plant-rate";

interface Project {
  id: string | number;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
  availableCount: number;
}

interface ProjectUpdateUI {
  id: number;
  month: string;
  date: string;
  year: number;
  images: string[];
  text: string;
}

interface ProjectSpeciesUI {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface ProjectDetailData {
  id: string | number;
  title: string;
  location: string;
  description: string;
  treeSpecies: Array<{
    id: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  stats: {
    treesAvailable: number;
    treesPlanted: number;
    totalTrees: number;
  };
  projectDescription: string;
  projectDetails: string[];
  mapCode: string;
  videoThumbnail?: string | null;
  videoUrl?: string | null;
}

interface ProjectDetailPageProps {
  projectData: ProjectDetailData;
  relatedProjects: Project[];
  projectUpdates?: ProjectUpdateUI[];
  projectSpecies?: ProjectSpeciesUI[];
  plantRates: PlantRate[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectData,
  relatedProjects,
  projectUpdates = [],
  projectSpecies = [],
  plantRates,
}) => {
  const [isGeoTagged, setIsGeoTagged] = useState(true);
  const overviewRef = useRef<HTMLDivElement>(null);
  const { currency, currencySymbol } = useCurrency();

  // Get rates based on selected currency
  const currentRate =
    plantRates.find((rate) => rate.currency_code === currency) ||
    plantRates.find((rate) => rate.currency_code?.toUpperCase() === currency.toUpperCase());

  const geotaggedRate = currentRate?.geotagged_rate;
  const nonGeotaggedRate = currentRate?.non_geotagged_rate;

  const handleReadMoreClick = () => {
    overviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handlePlantTree = () => {};

  const handleGiftTree = () => {};

  const handleRelatedPlantTree = (_projectId: string | number) => {};

  const handleViewAll = () => {};

  return (
    <main className="max-w-7xl mx-auto md:px-8 px-4 md:pt-8 pt-4 space-y-8">
      {/* Project Hero Section */}
      <ProjectHero
        title={projectData.title}
        location={projectData.location}
        description={projectData.description}
        treeSpecies={projectData.treeSpecies}
        stats={projectData.stats}
        isGeoTagged={isGeoTagged}
        onGeoTaggedChange={setIsGeoTagged}
        onPlantTree={handlePlantTree}
        onGiftTree={handleGiftTree}
        onReadMoreClick={handleReadMoreClick}
        mapCode={projectData.mapCode}
        videoThumbnail={projectData.videoThumbnail}
        videoUrl={projectData.videoUrl}
        geotaggedRate={geotaggedRate}
        nonGeotaggedRate={nonGeotaggedRate}
        currencySymbol={currencySymbol}
      />

      {/* Project Tabs Section */}
      <div ref={overviewRef}>
        <ProjectTabs
          projectDescription={projectData.projectDescription}
          projectDetails={projectData.projectDetails}
          relatedProjects={relatedProjects}
          onPlantTree={handleRelatedPlantTree}
          onViewAll={handleViewAll}
          projectUpdates={projectUpdates}
          projectSpecies={projectSpecies}
          projectId={projectData.id}
        />
      </div>

      <ProjectAccordion
        projectDescription={projectData.projectDescription}
        projectDetails={projectData.projectDetails}
        relatedProjects={relatedProjects}
        onPlantTree={handleRelatedPlantTree}
        onViewAll={handleViewAll}
        projectUpdates={projectUpdates}
        projectSpecies={projectSpecies}
        projectId={projectData.id}
      />

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

export default ProjectDetailPage;
