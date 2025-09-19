"use client";

import React, { useState } from "react";
import ProjectHero from "./ProjectHero";
import ProjectTabs from "./ProjectTabs";
import RelatedProjects from "./RelatedProjects";

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
  heroImageUrl: string;
  heroImageAlt: string;
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
  const [isGeoTagged, setIsGeoTagged] = useState(false);

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
    <main className="container mx-auto md:px-8 px-4 py-8 space-y-16">
      {/* Project Hero Section */}
      <ProjectHero
        title={projectData.title}
        location={projectData.location}
        description={projectData.description}
        heroImageUrl={projectData.heroImageUrl}
        heroImageAlt={projectData.heroImageAlt}
        treeSpecies={projectData.treeSpecies}
        stats={projectData.stats}
        isGeoTagged={isGeoTagged}
        onGeoTaggedChange={setIsGeoTagged}
        onPlantTree={handlePlantTree}
        onGiftTree={handleGiftTree}
      />

      {/* Project Tabs Section */}
      <ProjectTabs
        projectDescription={projectData.projectDescription}
        projectDetails={projectData.projectDetails}
      />

      {/* Related Projects Section */}
      <RelatedProjects
        projects={relatedProjects}
        onPlantTree={handleRelatedPlantTree}
        onViewAll={handleViewAll}
      />
    </main>
  );
};

export default ProjectDetailPage;
