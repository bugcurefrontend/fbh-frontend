"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Info, Share2, Gift } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";

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
        <div className="lg:w-[546px] w-full lg:h-[557px] relative flex-shrink-0">
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
                className="w-20 h-20 rounded-lg overflow-hidden border-3 border-white shadow-lg cursor-pointer"
              >
                <Image
                  src={species.imageUrl}
                  alt={species.imageAlt}
                  width={80}
                  height={80}
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
          <div className="md:space-y-2 space-y-4 relative">
            <div className="md:space-y-2 space-y-1">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-900 font-public-sans">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="md:text-base text-sm md:font-semibold">
                  {location}
                </span>
              </div>
            </div>
            <p className="text-gray-700 md:text-base text-sm leading-6">
              {description}
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
              <div className="md:text-base text-xs font-semibold text-gray-600">
                Trees <br className="md:hidden" /> Available
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <TreeSpeciesIcon className="md:w-10 w-8 h-8 md:h-10 mx-auto" />
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.treesPlanted.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs font-semibold text-gray-600">
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
              <div className="md:text-base text-xs font-semibold text-gray-600">
                Total <br className="md:hidden" /> Trees
              </div>
            </div>
          </div>

          {/* Geo-tagged Toggle */}
          <div className="max-sm:hidden border border-[#E4E4E4] rounded-2xl px-4 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-800 text-base">
                  I want my trees to be geo-tagged.
                </span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <Switch
                checked={isGeoTagged}
                onCheckedChange={onGeoTaggedChange}
                className="data-[state=checked]:bg-[#003399]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={onPlantTree}
                className="flex-1 bg-[#003399] hover:bg-[#002266] text-white font-bold py-3 h-12 rounded-lg uppercase text-base"
              >
                PLANT A TREE
                <Image
                  src="/images/donate.png"
                  alt="donate"
                  width={24}
                  height={24}
                  className=""
                />
              </Button>
              <Button
                onClick={onGiftTree}
                variant="outline"
                className="flex-1 border-gray-300 font-bold py-3 h-12 rounded-lg hover:bg-gray-50 uppercase text-base text-[#003399] hover:text-[#002266]"
              >
                GIFT A TREE
                <Gift size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
