"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Share2 } from "lucide-react";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";

interface ProjectHeroProps {
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
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  location,
  description,
  heroImageUrl,
  heroImageAlt,
  treeSpecies,
  stats,
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row space-x-6 space-y-6 lg:space-y-0">
        {/* Left side - Hero Image */}
        <div className="lg:w-[546px] w-full lg:h-[573px] relative flex-shrink-0">
          <div className="min-h-[360px] h-full w-full relative overflow-hidden rounded-lg">
            <Image
              src={heroImageUrl}
              alt={heroImageAlt}
              fill
              className="object-cover"
            />
          </div>

          <Image
            src="/images/dots.png"
            alt="dots"
            width={48}
            height={8}
            className="md:hidden block mx-auto mt-4"
          />

          {/* Tree Species Thumbnails */}
          <div className="hidden absolute bottom-6 left-6 md:flex gap-2">
            {treeSpecies.map((species) => (
              <div
                key={species.id}
                className="w-[112px] h-[112px] rounded-lg overflow-hidden border border-white shadow-lg cursor-pointer"
              >
                <Image
                  src={species.imageUrl}
                  alt={species.imageAlt}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <button className="hidden absolute right-4 top-4 md:flex items-center justify-center h-12 w-12 rounded-lg text-white bg-[#003399] hover:bg-[#002266]">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Right side - Project Details */}
        <div className="flex flex-col justify-between">
          {/* Title and Location */}
          <div className="max-md:space-y-2 relative">
            <div className="md:space-y-2 space-y-1">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-900 font-public-sans">
                {title}
              </h1>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-5.5 h-5.5" />
                <span className="md:text-base text-sm md:font-semibold">
                  {location}
                </span>
              </div>
            </div>
            <p className="md:mt-4 text-gray-700 md:text-base text-sm leading-6">
              {description}{" "}
              <span className="text-[#003399] text-sm font-semibold">
                Read More
              </span>
            </p>

            <button className="md:hidden absolute right-0 top-2 flex items-center justify-center h-9 w-9 rounded text-white bg-[#003399] hover:bg-[#002266]">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Statistics */}
          <div className="border border-[#E4E4E4] rounded-2xl flex items-center justify-between p-6">
            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <LandscapeIcon className="md:w-10 w-8 h-8 md:h-10  text-white mx-auto" />

              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.treesAvailable.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs text-gray-600">
                Trees <br className="md:hidden" /> Available
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <TreeSpeciesIcon className="md:w-10 w-8 h-8 md:h-10 mx-auto" />
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.treesPlanted.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs text-gray-600">
                Trees <br className="md:hidden" /> Planted
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>
            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/tree.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.totalTrees.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs text-gray-600">
                Total <br className="md:hidden" /> Trees
              </div>
            </div>
          </div>

          {/* Geo-tagged Toggle and Actions */}
          <GeoTagToggleAndActions
            isGeoTagged={isGeoTagged}
            onGeoTaggedChange={onGeoTaggedChange}
            onPlantTree={onPlantTree}
            onGiftTree={onGiftTree}
            variant="desktop"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
