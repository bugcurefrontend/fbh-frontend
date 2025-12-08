"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Share2 } from "lucide-react";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";

interface ProjectHeroProps {
  title: string;
  location: string;
  description: string;
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
  onReadMoreClick?: () => void;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  location,
  description,
  treeSpecies,
  stats,
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
  onReadMoreClick,
}) => {
  const [items, setItems] = useState([
    ...treeSpecies,
    {
      id: "map",
      imageUrl: "",
      imageAlt: "Project Map",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(treeSpecies[0]?.imageUrl);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (items[activeIndex].id === "map") {
      setActiveImage(""); // no image, show map
    } else {
      setActiveImage(items[activeIndex].imageUrl);
    }
  }, [activeIndex, items]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row space-x-6 space-y-6 lg:space-y-0">
        {/* Left side - Hero Image / Map */}
        <div className="lg:w-[546px] w-full relative flex-shrink-0">
          <div className="min-h-[360px] h-full w-full relative overflow-hidden rounded-lg">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={items[activeIndex].imageAlt}
                fill
                className="object-cover transition-all duration-500"
              />
            ) : (
              // Show map iframe for last thumbnail
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.9814570275257!2d78.21631687473341!3d17.1752898088815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbc68ae81e7a79%3A0x3e82438832073e9d!2sKanha%20Shanti%20Vanam!5e1!3m2!1sen!2sin!4v1765172898898!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="rounded-lg border-0 min-h-[360px] h-full"
                allowFullScreen
              />
            )}
          </div>

          {/* Mobile dots */}
          <div className="md:hidden flex justify-center mt-4 gap-2">
            {items.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[#003399]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Desktop thumbnails */}
          <div className="hidden absolute bottom-6 left-6 md:flex gap-2">
            {items.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setActiveIndex(i)}
                className={`w-[112px] h-[112px] rounded-lg overflow-hidden border border-white cursor-pointer shadow-lg transition-all duration-300 ${
                  activeIndex === i ? "scale-105" : "hover:scale-105"
                }`}
              >
                {item.id === "map" ? (
                  <div className="w-full h-full flex items-center justify-center ">
                    <Image
                      src="/images/map.png"
                      alt="map"
                      width={112}
                      height={112}
                      className="w-full min-h-full object-cover"
                    />
                  </div>
                ) : (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    width={112}
                    height={112}
                    className="w-full min-h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Share button (desktop) */}
          <button className="hidden absolute right-4 top-4 md:flex items-center justify-center h-12 w-12 rounded-lg text-white bg-[#003399] hover:bg-[#002266]">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Right side - Project Details (unchanged) */}
        <div className="flex flex-col justify-between md:gap-6">
          {/* Title and Location */}
          <div className="max-md:space-y-4 relative">
            <div className="md:space-y-2 space-y-1">
              <h1 className="text-lg md:text-2xl font-semibold md:text-gray-900 text-[#333333]  font-public-sans">
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
              {description}
              <span className="md:hidden">.</span>
              <span className="max-md:hidden">...</span>
              <button
                onClick={onReadMoreClick}
                className="max-md:hidden text-[#003399] text-sm font-semibold"
              >
                Read More
              </button>
            </p>

            <button className="md:hidden absolute right-0 top-2 flex items-center justify-center h-9 w-9 rounded text-white bg-[#003399] hover:bg-[#002266]">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Statistics */}
          <div className="max-md:mt-2 border border-[#E4E4E4] rounded-2xl flex items-center justify-between p-6">
            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <LandscapeIcon className="md:w-10 w-8 h-8 md:h-10 text-white mx-auto" />
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
