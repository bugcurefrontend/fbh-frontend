"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { Attribute } from "@/types/attribute";

interface PlantForCauseProps {
  attributes: Attribute[];
}

const PlantForCause: React.FC<PlantForCauseProps> = ({ attributes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no attributes are provided, render nothing or fallback?
  // User asked not to change UI, but empty carousel is bad.
  // Assuming attributes will be passed. If array is empty, it just won't render items.
  const imagesArray = attributes;

  const totalSlides = imagesArray.length;
  const visibleSlides = 5;
  const progress =
    totalSlides > 0
      ? ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
        ? 100
        : ((currentIndex + visibleSlides) / totalSlides) * 100
      : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 relative mt-8 md:mt-16">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Plant For A Cause
        </h2>
      </div>

      {/*Desktop Carousel */}
      <Carousel
        className="max-sm:hidden "
        opts={{ align: "start" }}
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="-md:ml-14 -ml-8">
          {imagesArray.map((image) => (
            <CarouselItem
              key={image.id}
              className="basis-1/1 sm:basis-1/4 lg:basis-1/5 md:pl-14 pl-8 space-y-2"
            >
              <div className="border-[0.76px] overflow-hidden border-[#B7B9BB] rounded-[16px] cursor-pointer hover:shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
                <Image
                  src={image.image}
                  alt={image.name}
                  width={200}
                  height={200}
                  className="h-50 w-50"
                />
              </div>
              <h3 className="text-center font-bold md:text-lg md:font-bold md:leading-[26px] text-[#090C0F] truncate">
                {image.name}
              </h3>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls + Progress Bar */}
        <div className="flex justify-between items-center mt-8 gap-12 relative">
          <div className="w-full h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px] overflow-hidden">
            <div
              className="h-1 md:h-[4px] bg-[#003399] rounded-[2px] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <CarouselPrevious className="border border-gray-700 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-gray-700 cursor-pointer" />
            <CarouselNext className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer" />
          </div>
        </div>
      </Carousel>

      {/*Mobile Carousel */}
      <div className="flex gap-4 sm:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {imagesArray.map((image) => (
          <div key={image.id} className="space-y-2">
            <Image
              src={image.image}
              alt={image.name}
              width={150}
              height={150}
              className="min-w-[150px] object-cover border-[0.7px] overflow-hidden border-[#B7B9BB] rounded-[12px]"
            />
            <h3 className="text-center text-base font-semibold leading-[26px] text-[#090C0F] truncate">
              {image.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlantForCause;
