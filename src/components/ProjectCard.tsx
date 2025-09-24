"use client";

import React from "react";
import Image from "next/image";
import LocationPinIcon from "./icons/LocationPinIcon";

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
  onPlantTree: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  location,
  plantedCount,
  category,
  imageUrl,
  imageAlt,
  onPlantTree,
}) => {
  const formatPlantedCount = (count: number): string => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k+ planted`;
    }
    return `${count}+ planted`;
  };

  return (
    <div className="rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
      <div className="relative h-52">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-t-md"
        />
        <div className="absolute top-4 md:left-4 left-2.5 flex gap-3">
          <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded flex">
            {formatPlantedCount(plantedCount)}
          </div>
          <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">
            {category}
          </div>
        </div>
      </div>
      <div className="px-2.5 md:px-4 py-4 md:py-6 flex flex-col md:gap-6 gap-4">
        <div className="flex justify-between items-center">
          <p className="md:font-bold font-semibold md:text-lg text-black truncate">
            {title}
          </p>
          <div className="flex items-center gap-2">
            <LocationPinIcon width={13} height={16} color="#19212c" />
            <span className="text-base font-semibold text-black">
              {location}
            </span>
          </div>
        </div>
        <button
          onClick={() => onPlantTree(id)}
          className="bg-[#003399] text-white font-bold md:text-base text-sm md:py-3 py-1.5 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center"
        >
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
  );
};

export default ProjectCard;
