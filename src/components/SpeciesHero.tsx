"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";
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
  treeSpecies,
  characteristics,
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
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
        {/* Left side - Hero Image */}
        <div className="lg:w-[546px] w-full lg:h-[573px] relative flex-shrink-0">
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.823933!2d79.136!3d24.592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDM1JzU1LjAiTiA3OcKwMDgnMjMuOCJF!5e0!3m2!1sen!2sin!4v1698239123456!5m2!1sen!2sin"
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

          {/* Tree Species Thumbnails */}
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
          <button className="hidden absolute right-4 top-4 md:flex items-center justify-center h-12 w-12 rounded-lg text-white bg-[#003399] hover:bg-[#002266]">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Right side - Species Details */}
        <div className="flex flex-col justify-between md:space-y-8">
          {/* Title and Scientific Name */}
          <div className="md:space-y-2 space-y-4 relative">
            <div className="md:space-y-2 space-y-1 flex items-center justify-between">
              <h1 className="text-lg md:text-2xl font-semibold md:text-gray-900 text-[#333333] font-public-sans">
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
              <div className="md:text-base text-xs text-[#4C4748]">
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
              <div className="md:text-base text-xs text-[#4C4748]">
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
              <div className="md:text-base text-xs text-[#4C4748]">Height</div>
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
