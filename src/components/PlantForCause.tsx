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

interface CauseImage {
  id: string;
  imageUrl: string;
  title: string;
}

const imagesArray: CauseImage[] = [
  { id: "1", imageUrl: "/images/climate.png", title: "Climate Healing" },
  { id: "2", imageUrl: "/images/birthday.png", title: "Birthday" },
  { id: "3", imageUrl: "/images/wedding.png", title: "Wedding" },
  { id: "4", imageUrl: "/images/apology.png", title: "Apology" },
  { id: "5", imageUrl: "/images/new-year.png", title: "New Year" },
  { id: "6", imageUrl: "/images/climate.png", title: "Climate Healing" },
  { id: "7", imageUrl: "/images/birthday.png", title: "Birthday" },
  { id: "8", imageUrl: "/images/wedding.png", title: "Wedding" },
  { id: "9", imageUrl: "/images/apology.png", title: "Apology" },
  { id: "10", imageUrl: "/images/new-year.png", title: "New Year" },
];

const PlantForCause: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = imagesArray.length;
  const visibleSlides = 5;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 relative mt-8 md:mt-16">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
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
              <div className="border-[0.7px] overflow-hidden border-[#B7B9BB] rounded-xl cursor-pointer hover:shadow-lg transition-shadow">
                <Image
                  src={image.imageUrl}
                  alt={image.title}
                  width={200}
                  height={200}
                  className="w-full"
                />
              </div>
              <h3 className="text-center font-bold md:text-lg md:font-bold md:leading-[26px] text-[#090C0F] truncate">
                {image.title}
              </h3>
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

      {/*Mobile Carousel */}
      <div className="flex gap-4 sm:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {imagesArray.map((image) => (
          <div key={image.id} className="space-y-2">
            <Image
              src={image.imageUrl}
              alt={image.title}
              width={150}
              height={150}
              className="min-w-[150px] object-cover border-[0.7px] overflow-hidden border-[#B7B9BB] rounded-xl"
            />
            <h3 className="text-center text-base font-semibold leading-[26px] text-[#090C0F] truncate">
              {image.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlantForCause;
