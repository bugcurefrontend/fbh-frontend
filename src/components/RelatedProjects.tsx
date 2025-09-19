"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface RelatedProjectsProps {
  projects: Project[];
  onPlantTree: (projectId: string) => void;
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26]">
          Explore other projects
        </h2>
        <button
          onClick={onViewAll}
          className="md:text-sm text-xs font-bold text-[#003399] hover:text-[#002266] uppercase tracking-wide"
        >
          VIEW ALL
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col"
          >
            <div className="relative h-52">
              <Image
                src={project.imageUrl}
                alt={project.imageAlt}
                fill
                className="object-cover rounded-t-md"
              />

              <div className="absolute top-4 left-4 flex gap-3">
                <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]">
                  {project.plantedCount >= 100
                    ? "100+ planted"
                    : `${project.plantedCount}+ planted`}
                </div>
                <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]">
                  {project.category}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-black truncate md:font-bold md:text-lg md:leading-[26px] md:align-middle md:text-[#090C0F]">
                  {project.title}
                </p>
                <div className="flex items-center gap-2">
                  <MapPin width={13} height={16} color="#19212c" />
                  <span className="text-base font-semibold text-black md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#19212C]">
                    {project.location}
                  </span>
                </div>
              </div>
              <button className="bg-[#003399] text-white font-bold text-base py-3 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center md:h-12 md:gap-2 md:rounded-lg md:py-[11px] md:px-[22px] md:font-bold md:text-base md:leading-[26px] md:text-[#FFFFFF] md:bg-[#003399]">
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
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden overflow-x-auto scrollbar-none">
        <div className="flex gap-4 pb-2 w-max">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[314px] max-w-[314px] border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden"
            >
              <div className="relative h-52">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fill
                  className="object-cover rounded-t-md"
                />

                <div className="absolute top-4 left-4 flex gap-1">
                  <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]">
                    {project.plantedCount >= 100
                      ? "100+ planted"
                      : `${project.plantedCount}+ planted`}
                  </div>
                  <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]">
                    {project.category}
                  </div>
                </div>
              </div>
              <div className="px-2 py-3 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg text-black truncate md:font-bold md:text-lg md:leading-[26px] md:align-middle md:text-[#090C0F]">
                    {project.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin width={13} height={16} color="#19212c" />
                    <span className="text-base font-semibold text-black md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#19212C]">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProjects;
