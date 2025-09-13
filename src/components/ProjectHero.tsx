"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Info, Mountain, Leaf, TreePine } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left side - Hero Image */}
        <div className="lg:w-[546px] relative flex-shrink-0">
          <div className="h-full relative overflow-hidden rounded-lg">
            <Image
              src={heroImageUrl}
              alt={heroImageAlt}
              fill
              className="object-cover"
              sizes="546px"
            />
          </div>
          
          {/* Tree Species Thumbnails */}
          <div className="absolute bottom-6 left-6 flex gap-2">
            {treeSpecies.map((species) => (
              <div
                key={species.id}
                className="w-20 h-20 rounded-lg overflow-hidden border-3 border-white shadow-lg"
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
        </div>

        {/* Right side - Project Details */}
        <div className="flex-1 p-8 space-y-6">
          {/* Title and Location */}
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-gray-900 font-public-sans">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-base font-semibold">{location}</span>
            </div>
            <p className="text-gray-700 text-base leading-6">
              {description}
            </p>
          </div>

          {/* Statistics */}
          <div className="flex items-center justify-between py-6">
            <div className="text-center space-y-2 flex-1">
              <div className="w-10 h-10 mx-auto mb-2">
                <Mountain className="w-full h-full text-green-600" />
              </div>
              <div className="text-2xl font-semibold text-black">
                {stats.treesAvailable.toLocaleString()}
              </div>
              <div className="text-base text-gray-600">Trees Available</div>
            </div>

            <div className="w-px h-24 bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 flex-1">
              <div className="w-10 h-10 mx-auto mb-2">
                <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-black">
                {stats.treesPlanted.toLocaleString()}
              </div>
              <div className="text-base text-gray-600">Trees Planted</div>
            </div>

            <div className="w-px h-24 bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 flex-1">
              <div className="w-10 h-10 mx-auto mb-2">
                <div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-semibold text-black">
                {stats.totalTrees.toLocaleString()}
              </div>
              <div className="text-base text-gray-600">Total Trees</div>
            </div>
          </div>

          {/* Geo-tagged Toggle */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-800 text-base">I want my trees to be geo-tagged.</span>
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
            </Button>
            <Button
              onClick={onGiftTree}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-800 font-bold py-3 h-12 rounded-lg hover:bg-gray-50 uppercase text-base"
            >
              GIFT A TREE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;