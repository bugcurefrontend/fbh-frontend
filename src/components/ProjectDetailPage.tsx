"use client";

import React, { useRef, useState } from "react";
import ProjectHero from "./ProjectHero";
import ProjectTabs from "./ProjectTabs";
import ProjectAccordion from "./ProjectAccordion";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface ProjectDetailData {
  id: string;
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
}

interface ProjectDetailPageProps {
  projectData: ProjectDetailData;
  relatedProjects: Project[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectData,
  relatedProjects,
}) => {
  const [isGeoTagged, setIsGeoTagged] = useState(true);
  const overviewRef = useRef<HTMLDivElement>(null);

  const handleReadMoreClick = () => {
    overviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handlePlantTree = () => {
    console.log(`Plant tree for project: ${projectData.id}`);
    // Handle plant tree action
  };

  const handleGiftTree = () => {
    console.log(`Gift tree for project: ${projectData.id}`);
    // Handle gift tree action
  };

  const handleRelatedPlantTree = (projectId: string) => {
    console.log(`Plant tree for related project: ${projectId}`);
    // Handle plant tree action for related projects
  };

  const handleViewAll = () => {
    console.log("View all projects");
    // Navigate to all projects page
  };

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
      />

      {/* Project Tabs Section */}
      <div ref={overviewRef}>
        <ProjectTabs
          projectDescription={projectData.projectDescription}
          projectDetails={projectData.projectDetails}
          relatedProjects={relatedProjects}
          onPlantTree={handleRelatedPlantTree}
          onViewAll={handleViewAll}
        />
      </div>

      <ProjectAccordion
        projectDescription={projectData.projectDescription}
        projectDetails={projectData.projectDetails}
        relatedProjects={relatedProjects}
        onPlantTree={handleRelatedPlantTree}
        onViewAll={handleViewAll}
      />

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

export default ProjectDetailPage;
