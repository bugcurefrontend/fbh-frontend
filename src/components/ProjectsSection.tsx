"use client";

import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { generateProjectSlug } from "@/services/projects";
import { ProjectSimplified } from "@/types/project";
import MobileProjectsCarousel, {
  ProjectForCarousel,
} from "./MobileProjectsCarousel";

interface ProjectsSectionProps {
  projects: ProjectSimplified[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects: apiProjects,
}) => {
  // Transform API data to match existing UI structure
  const projects: ProjectForCarousel[] = apiProjects.map((p) => ({
    id: p.documentId,
    title: p.name,
    location: p.address,
    plantedCount: p.plantedCount,
    category: p.archetype,
    imageUrl: p.thumbnail || "/images/test2.jpg",
    imageAlt: `${p.name} - ${p.archetype}`,
  }));

  const handlePlantTree = (projectId: string) => {
    console.log(`Plant tree for project: ${projectId}`);
    // Handle plant tree action
  };

  if (projects.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16">
        <div className="text-center py-12">
          <p className="text-gray-500">No projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Projects
        </h2>
        <Link href="/projects">
          <button className="absolute right-0 top-2.5 md:top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
            View All
          </button>
        </Link>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${generateProjectSlug(project.title)}`}
          >
            <ProjectCard
              id={project.id}
              title={project.title}
              location={project.location}
              plantedCount={project.plantedCount}
              category={project.category}
              imageUrl={project.imageUrl}
              imageAlt={project.imageAlt}
              onPlantTree={handlePlantTree}
            />
          </Link>
        ))}
      </div>

      {/* Mobile Carousel */}
      <MobileProjectsCarousel projects={projects} />
    </section>
  );
};

export default ProjectsSection;
