"use client";
import React, { useState } from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const SpeciesSection: React.FC = () => {
  const species = [
    { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
    { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
    { name: "Mango Tree", image: "/images/mango-tree.webp" },
    { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
    { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
    { name: "Mango Tree", image: "/images/mango-tree.webp" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = species.length;
  const visibleSlides = 3;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  return (
    <section className="relative">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black">
          Species
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase">
          View All
        </button>
      </div>

      {/* Carousel */}
      <Carousel
        className="max-sm:hidden"
        opts={{ align: "start" }}
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="-ml-4">
          {species.map((item, idx) => (
            <CarouselItem
              key={idx}
              className="basis-1/1 sm:basis-1/2 lg:basis-1/3 pl-4"
            >
              <div className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0">
                <div className="overflow-hidden w-full md:p-4 p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={350}
                    height={194}
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-black truncate">
                    {item.name}
                  </p>
                  <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                    Know More
                    <ArrowRightIcon width={22} height={22} color="#003399" />
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls + Progress Bar */}
        <div className="flex justify-between items-center mt-6 gap-6 relative">
          <div className="w-full h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px] overflow-hidden">
            <div
              className="h-1 md:h-[4px] bg-[#003399] rounded-[2px] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <CarouselPrevious className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer" />
            <CarouselNext className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer" />
          </div>
        </div>
      </Carousel>

      {/* Mobile Carousel */}
      <div className="sm:hidden mb-6 overflow-x-auto scrollbar-none">
        <div className="flex gap-4 pb-2 w-max">
          {species.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden"
            >
              <div className="pt-3 px-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={280}
                  height={194}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="p-4 flex sm:flex-root flex-col justify-between sm:items-center max-sm:gap-2">
                <p className="text-lg font-bold text-black truncate">
                  {item.name}
                </p>
                <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                  Know More{" "}
                  <ArrowRightIcon
                    width={22}
                    height={22}
                    color="#003399"
                    className="max-sm:w-4"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeciesSection;
