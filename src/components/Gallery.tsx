"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";

interface GalleryProps {
  className?: string;
}

const Gallery: React.FC<GalleryProps> = ({ className }) => {
  const images = [
    "/images/gallery/1.png",
    "/images/gallery/2.png",
    "/images/gallery/3.png",
    "/images/gallery/4.png",
    "/images/gallery/5.png",
    "/images/gallery/6.png",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const handlePrev = () => {
    if (!carouselApi) return;
    carouselApi.scrollPrev();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!carouselApi) return;
    carouselApi.scrollNext();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [carouselApi, selectedIndex]); // depends on carouselApi and selectedIndex

  return (
    <section className="relative">
      {/* Large Image */}
      <div
        className={`w-full h-[361px] md:h-[400px] relative rounded-xl overflow-hidden ${className}`}
      >
        <Image
          src={images[selectedIndex]}
          alt={`Gallery Image ${selectedIndex + 1}`}
          fill
          className="object-cover transition-all duration-700"
        />
      </div>

      {/* Thumbnails Carousel */}
      <div className="mt-4 max-md:hidden">
        <Carousel
          opts={{ align: "start" }}
          setApi={(api) => {
            if (!api) return;
            setCarouselApi(api);
            api.on("select", () => {
              setSelectedIndex(api.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((img, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/3 md:basis-1/6 pl-2 md:pl-4 cursor-pointer"
                onClick={() => {
                  setSelectedIndex(idx);
                  carouselApi?.scrollTo(idx);
                }}
              >
                <div
                  className={`relative w-full h-[70px] md:h-[116px] rounded-md overflow-hidden ${
                    selectedIndex === idx ? "" : "opacity-60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls + Progress Bar */}
          <div className="flex justify-between items-center mt-8 gap-6 relative">
            <div className="w-full h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px] overflow-hidden">
              <div
                className="h-1 md:h-[4px] bg-[#003399] rounded-[2px] transition-all duration-300"
                style={{
                  width: `${((selectedIndex + 1) / images.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Navigation */}
            <div className="flex gap-2">
              <div
                onClick={handlePrev}
                className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer"
              >
                <CarouselPrevious className="w-4 h-4" />
              </div>
              <div
                onClick={handleNext}
                className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer"
              >
                <CarouselNext className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Mobile Dots */}
      <div className="md:hidden mt-4 flex gap-3 items-center justify-center">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === selectedIndex ? "bg-[#003399]" : "bg-[#E6EBF5]"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
