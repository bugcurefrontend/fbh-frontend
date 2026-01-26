"use client";

import React from "react";
import Image from "next/image";
import LocationPinIcon from "./icons/LocationPinIcon";

interface ProjectCardProps {
  id: string | number;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
  onPlantTree: (projectId: string | number) => void;
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
      return `${Math.floor(count / 1000)}k+ Planted`;
    }
    if (count === 0) {
      return `All Planted`;
    }
    return `${count} Planted`;
  };

  return (
    <div className="hover:shadow-[0_1px_8px_rgba(0,0,0,0.1)] rounded-[16px] overflow-hidden border border-gray-200 flex flex-col">
      <div className="relative h-[200px]">
        <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />

        <div className="absolute top-4 md:left-4 left-2.5 flex md:gap-3 gap-[6.81px]">
          <div className="bg-[#006161] shadow-[0_20px_40px_-4px_rgba(133,133,133,0.12)] text-white text-sm font-semibold max-md:h-[26px] h-[30px] md:px-4 md:py-2 px-3 py-1 flex items-center justify-center rounded-full md:text-base md:font-semibold md:leading-[13.62px] md:align-middle md:text-[#FFFFFF] capitalize">
            {formatPlantedCount(plantedCount)}
          </div>

          <div className="bg-[#006161] shadow-[0_20px_40px_-4px_rgba(133,133,133,0.12)] text-white text-sm font-semibold max-md:h-[26px] h-[30px] md:px-4 md:py-2 px-3 py-1 flex items-center justify-center rounded-full md:text-base md:font-semibold md:leading-[13.62px] md:align-middle md:text-[#FFFFFF] capitalize">
            {category ? category : "No Category"}
          </div>
        </div>
      </div>
      <div className="px-2.5 md:px-4 pt-4 pb-4 md:pb-6 md:pt-4 flex flex-col md:gap-6 gap-4">
        <div className="flex justify-between items-center">
          <p className="md:font-bold font-semibold md:text-lg md:text-[#090C0F] truncate flex-1 min-w-0">
            {title}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <LocationPinIcon width={13} height={16} color="#19212C" />
            <span className="text-base font-semibold text-[#19212C]">
              {location.split(" ")[0].replace(/,$/, "")}
            </span>
          </div>
        </div>
        <button
          onClick={() => onPlantTree(id)}
          className="bg-[#003399] text-white font-bold md:text-base text-sm md:py-3 h-11 md:h-12 py-1.5 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center"
        >
          PLANT A TREE
          <Image
            src="/images/donate.png"
            alt="donate"
            width={24}
            height={24}
            className="max-sm:w-5"
          />{" "}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
