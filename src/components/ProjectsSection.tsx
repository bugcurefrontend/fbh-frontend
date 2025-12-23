"use client";

import React from "react";
import Image from "next/image";
import LocationPinIcon from "./icons/LocationPinIcon";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { generateProjectSlug } from "@/services/projects";
import { ProjectSimplified } from "@/types/project";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface ProjectsSectionProps {
  projects: ProjectSimplified[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects: apiProjects,
}) => {
  // Transform API data to match existing UI structure
  const projects: Project[] = apiProjects.map((p) => ({
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

  const formatPlantedCount = (count: number): string => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k+ planted`;
    }
    return `${count} planted`;
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
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Projects
        </h2>
        <Link
          href="/projects"
          className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]"
        >
          View All
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
      <div className="sm:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-4 pb-2 w-max">
          {projects.map((project, idx) => (
            <Link
              key={idx}
              href={`/projects/${generateProjectSlug(project.title)}`}
            >
              <div className="flex-1 min-w-[314px] max-w-[314px] border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                <div className="relative h-52">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover rounded-t-[16px]"
                  />
                  <div className="absolute top-4 left-4 flex gap-1">
                    <div className="bg-[#006161] shadow-[0_20px_40px_-4px_rgba(133,133,133,0.12)] text-white text-xs font-semibold px-2 py-1 rounded-full md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF] capitalize">
                      {formatPlantedCount(project.plantedCount)}
                    </div>
                    {project.category && (
                      <div className="bg-[#006161] shadow-[0_20px_40px_-4px_rgba(133,133,133,0.12)] text-white text-xs font-semibold px-2 py-1 rounded-full md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF] capitalize">
                        {project.category}
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-2 py-3 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate flex-1 min-w-0 md:font-bold md:text-lg md:leading-[26px] md:align-middle text-[#090C0F]">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <LocationPinIcon width={13} height={16} color="#19212c" />
                      <span className="font-semibold md:font-semibold md:leading-6 md:align-middle text-[#19212C]">
                        {project.location}
                      </span>
                    </div>
                  </div>
                  <button className="bg-[#003399] text-white font-bold text-base py-2 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center md:font-bold md:text-base md:leading-[26px] md:text-[#FFFFFF]">
                    PLANT A TREE
                    <Image
                      src="/images/donate.png"
                      alt="donate"
                      width={24}
                      height={24}
                      className=""
                    />{" "}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
