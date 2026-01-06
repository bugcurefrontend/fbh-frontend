"use client";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { HeroContentSimplified } from "@/types/hero-content";

interface HeroSectionProps {
  heroContents?: HeroContentSimplified[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroContents }) => {
  // Fallback to static data if no hero contents from API
  const fallbackSlides = [
    {
      id: 1,
      title: "Putting heart back into the Earth",
      buttonText: "PLANT A TREE",
      bgImage: "/images/hero-forest-bg.png",
      href: "/plant-tree",
    },
    {
      id: 2,
      title: "Together for a Greener Future",
      buttonText: "JOIN US",
      bgImage: "/images/hero-water-bg.avif",
      href: "/join-us",
    },
    {
      id: 3,
      title: "One Tree Can Change the World",
      buttonText: "DONATE NOW",
      bgImage: "/images/hero-girls-bg.avif",
      href: "/gift-tree",
    },
  ];

  // Use API data if available, otherwise use fallback
  const heroSlides =
    heroContents && heroContents.length > 0
      ? heroContents.map((hc) => ({
          id: hc.id,
          title: hc.title,
          buttonText: hc.buttonText,
          bgImage: hc.bgImage,
          href: hc.buttonUrl,
        }))
      : fallbackSlides;
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // sync current index when slide changes
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="md:h-[540px] h-[403px] relative overflow-hidden">
      {/* Carousel background */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex">
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="relative w-full md:h-[540px] h-[403px] flex-shrink-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0,13,38,0.3), rgba(0,13,38,0.3)), url(${slide.bgImage})`,
              }}
            >
              {/* Foreground content */}
              <div className="max-sm:absolute w-full max-w-7xl mx-auto md:px-14 px-4 md:pt-[200px] bottom-20">
                <div className="sm:max-w-[582px] max-sm:mx-auto max-w-[290px] text-white transition-all duration-700 max-md:flex items-center justify-center flex-col">
                  <h1 className="sm:text-[64px] max-md:text-center font-bold mb-4 text-[38px] leading-[1.2] sm:mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                    {slide.title}
                  </h1>
                  <Link href={slide.href}>
                    <button className="bg-[#003399] md:h-[58px] h-11 w-[228px] md:w-[315px] text-white font-bold text-sm rounded-[8px] md:text-base md:leading-[26px] max-w-[370px] hover:bg-[#002080] drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                      {slide.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="relative max-w-7xl mx-auto">
        <div className="max-md:hidden absolute flex gap-3 px-14 z-40 right-0 top-98">
          <button
            onClick={scrollPrev}
            className="md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-white border-1 cursor-pointer drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={scrollNext}
            className="text-white border-1 md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Mobile dots */}
      <div className="md:hidden absolute top-[358px] left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-[#003399]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
