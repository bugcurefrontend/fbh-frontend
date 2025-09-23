"use client";

import React from "react";
import Image from "next/image";
import { Share2, Clock, Wind, Ruler } from "lucide-react";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";

interface SpeciesHeroProps {
  name: string;
  scientificName: string;
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
  characteristics: {
    lifespan: string;
    oxygenReleased: string;
    height: string;
    mdHeight?: string;
  };
  treeSpecies: Array<{
    id: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
}

const SpeciesHero: React.FC<SpeciesHeroProps> = ({
  name,
  scientificName,
  description,
  heroImageUrl,
  treeSpecies,
  heroImageAlt,
  characteristics,
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row space-x-6 space-y-6 lg:space-y-0">
        {/* Left side - Hero Image */}
        <div className="lg:w-[546px] w-full lg:max-h-[557px] relative flex-shrink-0">
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
                className="w-20 h-20 rounded-lg overflow-hidden border border-white shadow-lg cursor-pointer"
              >
                <Image
                  src={species.imageUrl}
                  alt={species.imageAlt}
                  width={80}
                  height={80}
                  className="object-cover w-full min-h-full"
                />
              </div>
            ))}
          </div>
          <button className="hidden absolute right-4 top-4 md:flex items-center justify-center h-12 w-12 rounded-lg text-white bg-[#003399] hover:bg-[#002266]">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Right side - Species Details */}
        <div className="flex flex-col justify-between md:space-y-8">
          {/* Title and Scientific Name */}
          <div className="md:space-y-2 space-y-4 relative">
            <div className="md:space-y-2 space-y-1 flex items-center justify-between">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-900 font-public-sans">
                {name} ({scientificName})
              </h1>
              <button className="md:hidden flex items-center justify-center h-9 w-9 rounded text-white bg-[#003399] hover:bg-[#002266]">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-700 md:text-base text-sm leading-6">
              {description}
            </p>
          </div>

          {/* Species Characteristics */}
          <div className="border border-[#E4E4E4] rounded-2xl flex items-center justify-between p-6 max-lg:mt-6">
            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/lifespan.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {characteristics.lifespan}
              </div>
              <div className="md:text-base text-xs font-semibold text-gray-600">
                Lifespan
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/oxygen.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {characteristics.oxygenReleased}
              </div>
              <div className="md:text-base text-xs font-semibold text-gray-600">
                Oxygen <span className="max-md:hidden">Released</span>
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/height.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                <span className="max-md:hidden">
                  {characteristics.mdHeight}
                </span>
                <span className="md:hidden">{characteristics.height}</span>
              </div>
              <div className="md:text-base text-xs font-semibold text-gray-600">
                Height
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

export default SpeciesHero;
