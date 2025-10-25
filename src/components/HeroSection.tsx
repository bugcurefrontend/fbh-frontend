"use client";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Putting heart back into the Earth",
    buttonText: "PLANT A TREE",
    bgImage: "/images/hero-forest-bg.png",
  },
  {
    id: 2,
    title: "Together for a Greener Future",
    buttonText: "JOIN US",
    bgImage: "/images/hero-water-bg.avif",
  },
  {
    id: 3,
    title: "One Tree Can Change the World",
    buttonText: "DONATE NOW",
    bgImage: "/images/hero-girls-bg.avif",
  },
];

const HeroSection = () => {
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
              <div className="w-full max-w-7xl mx-auto md:px-16 px-4 md:pt-[200px] pt-[102px]">
                <div className="sm:max-w-[582px] max-w-[276px] text-white transition-all duration-700">
                  <h1 className="sm:text-[64px] font-bold mb-4 text-[38px] leading-[1.2] sm:mb-8">
                    {slide.title}
                  </h1>
                  <button className="bg-[#003399] text-white font-bold text-base sm:py-3 py-[6px] rounded md:w-[370px] md:h-12 md:py-[11px] md:px-[22px] md:rounded-lg md:text-base md:font-bold md:leading-[26px] md:text-[#FFFFFF] max-w-[370px] w-full hover:bg-[#002080]">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="max-md:hidden absolute right-45 bottom-28 flex gap-3 z-10">
        <button
          onClick={scrollPrev}
          className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollNext}
          className="bg-white border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Mobile dots */}
      <div className="md:hidden absolute top-[334px] left-1/2 -translate-x-1/2 flex gap-3">
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
