"use client";

import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { generateProjectSlug } from "@/services/projects";
import MobileProjectsCarousel, {
  ProjectForCarousel,
} from "./MobileProjectsCarousel";

interface RelatedProjectsProps {
  projects: ProjectForCarousel[];
  onPlantTree: (projectId: string | number) => void;
  onViewAll: () => void;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  projects,
  onPlantTree,
  onViewAll,
}) => {
  return (
    <div className="md:space-y-8 space-y-6">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Explore other projects{" "}
        </h2>
        <Link href="/projects">
          <button className="absolute right-0 md:top-4 top-2.5 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
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
              availableCount={project.availableCount}
              onPlantTree={onPlantTree}
            />
          </Link>
        ))}
      </div>

      {/* Mobile Carousel */}
      <MobileProjectsCarousel projects={projects} />
    </div>
  );
};

export default RelatedProjects;
