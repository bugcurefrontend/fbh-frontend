"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { generateProjectSlug } from "@/services/projects";
import LocationPinIcon from "./icons/LocationPinIcon";

export interface ProjectForCarousel {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category:string;
  imageUrl: string;
  imageAlt: string;
}

interface MobileProjectsCarouselProps {
  projects: ProjectForCarousel[];
}

const formatPlantedCount = (count: number): string => {
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}k+ planted`;
  }
  return `${count} planted`;
};

const MobileProjectsCarousel: React.FC<MobileProjectsCarouselProps> = ({
  projects,
}) => {
  return (
    <div className="sm:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex gap-6 w-max">
        {projects.map((project, idx) => (
          <Link
            key={idx}
            href={`/projects/${generateProjectSlug(project.title)}`}
          >
            <div className="flex-1 max-w-[314px] min-w-[314px] max-h-[272px] border border-gray-200 rounded-[16px] flex-shrink-0 overflow-hidden">
              <div className="relative h-[160px]">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fill
                  className="object-cover rounded-t-[16px] max-h-[160px]"
                />
                <div className="absolute top-4 left-4 flex gap-[6.81px]">
                  <div className="bg-[#006161] shadow-[0_20px_40px_-4px_rgba(133,133,133,0.12)] text-white text-sm px-3 py-1.5 rounded-full font-semibold leading-[13.62px] md:align-middle md:text-[#FFFFFF] capitalize">
                    {formatPlantedCount(project.plantedCount)}
                  </div>
                  {project.category && (
                    <div className="bg-[#006161] shadow-[0_20px_40px_-4px_rgba(133,133,133,0.12)] text-white text-sm px-3 py-1.5 rounded-full leading-[13.62px] md:align-middle md:text-[#FFFFFF] capitalize">
                      {project.category}
                    </div>
                  )}
                </div>
              </div>
              <div className="px-2.5 py-4 flex flex-col gap-4">
                <div className="flex justify-between items-center h-5">
                  <p className="font-semibold truncate flex-1 min-w-0 md:font-bold md:text-lg md:leading-[26px] md:align-middle text-[#090C0F]">
                    {project.title}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <LocationPinIcon width={13} height={16} color="#19212c" />
                    <span className="font-semibold md:font-semibold md:leading-6 md:align-middle text-[#19212C]">
                      {project.location.split(" ")[0].replace(/,$/, "")}
                    </span>
                  </div>
                </div>
                <button className="bg-[#003399] h-[44px] text-white font-bold text-sm py-2 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center md:font-bold md:text-base md:leading-[26px] md:text-[#FFFFFF]">
                  PLANT A TREE
                  <Image
                    src="/images/donate.png"
                    alt="donate"
                    width={20}
                    height={20}
                    className=""
                  />{" "}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileProjectsCarousel;
