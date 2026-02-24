"use client";

import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { generateProjectSlug } from "@/services/projects";

export interface ProjectForCarousel {
  id: string | number;
  title: string;
  location: string;
  plantedCount: number;
  availableCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface MobileProjectsCarouselProps {
  projects: ProjectForCarousel[];
  onPlantTree?: (projectId: string | number) => void;
}

const MobileProjectsCarousel: React.FC<MobileProjectsCarouselProps> = ({
  projects,
  onPlantTree = () => { },
}) => {
  return (
    <div className="sm:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex gap-6 w-max pb-4">
        {projects.map((project, idx) => (
          <div key={idx} className="w-[314px]">
            <Link href={`/projects/${generateProjectSlug(project.title)}`}>
              <ProjectCard
                id={project.id}
                title={project.title}
                location={project.location}
                plantedCount={project.plantedCount}
                availableCount={project.availableCount}
                category={project.category}
                imageUrl={project.imageUrl}
                imageAlt={project.imageAlt}
                onPlantTree={onPlantTree}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileProjectsCarousel;
