"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import { SpeciesSimplified } from "@/types/species";
import { generateSlug } from "@/lib/slug";

const SpeciesSection: React.FC = () => {
  const [species, setSpecies] = useState<SpeciesSimplified[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        // Try static pre-built data first (performance optimization)
        const response = await fetch('/data/species.json');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSpecies(data);
            setLoading(false);
            return;
          }
        }

        // Fallback to API if static data unavailable
        console.log('Falling back to API fetch...');
        const { getSpecies } = await import('@/lib/api');
        const apiData = await getSpecies();
        setSpecies(apiData);
      } catch (error) {
        console.error("Failed to load species:", error);
        // Second fallback - try API again
        try {
          const { getSpecies } = await import('@/lib/api');
          const apiData = await getSpecies();
          setSpecies(apiData);
        } catch (apiError) {
          console.error("API fallback also failed:", apiError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  const totalSlides = species.length;
  const visibleSlides = 3;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 relative mt-8 md:mt-16">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading species...</p>
        </div>
      </section>
    );
  }

  if (species.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 relative mt-8 md:mt-16">
        <div className="text-center py-12">
          <p className="text-gray-500">No species available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 relative mt-8 md:mt-16">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Species
        </h2>
        <Link href="/species">
          <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
            View All
          </button>
        </Link>
      </div>

      {/*Desktop Carousel */}
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
        <CarouselContent className="-ml-8">
          {species.map((item) => (
            <CarouselItem
              key={item.documentId}
              className="basis-1/1 sm:basis-1/2 lg:basis-1/3 pl-8"
            >
              <Link href={`/species/${generateSlug(item.name)}`}>
                <div className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0">
                  <div className="overflow-hidden w-full md:p-4 p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={350}
                      height={194}
                      className="w-full object-cover rounded-lg max-h-[194px]"
                    />
                  </div>
                  <div className="p-4 pt-2 flex justify-between items-center">
                    <p className="text-lg font-bold text-black truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#19212C]">
                      {item.name}
                    </p>
                    <button className="mr-4 flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                      Know More
                      <ArrowRightIcon width={22} height={22} color="#003399" />
                    </button>
                  </div>
                </div>
              </Link>
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
      <div className="sm:hidden mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-4 pb-2 w-max">
          {species.map((item) => (
            <Link key={item.documentId} href={`/species/${generateSlug(item.name)}`}>
              <div className="flex-1 min-w-[314px] max-w-[314px] border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
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
                  <p className="font-semibold truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle text-[#19212C]">
                    {item.name}
                  </p>
                  <button className="py-[11px] pr-[12px] flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                    Know More{" "}
                    <ArrowRightIcon
                      width={24}
                      height={24}
                      color="#003399"
                      className="max-sm:w-6"
                    />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeciesSection;
