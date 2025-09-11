"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Putting heart back into the Earth",
    buttonText: "PLANT A TREE",
    bgImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: 2,
    title: "Together for a Greener Future",
    buttonText: "JOIN US",
    bgImage: "/images/hero-forest-bg.png",
  },
  {
    id: 3,
    title: "One Tree Can Change the World",
    buttonText: "DONATE NOW",
    bgImage:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2000&q=80",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    startAutoPlay();
  };

  const slide = heroSlides[current];

  return (
    <div
      className="h-[604px] bg-cover bg-center bg-no-repeat relative transition-all duration-700"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 13, 38, 0.30), rgba(0, 13, 38, 0.30)), url(${slide.bgImage})`,
      }}
    >
      <div className="w-full mx-auto relative md:px-8 px-4 pt-[258px]">
        <div className="sm:max-w-[582px] max-w-[276px]">
          <h1 className="sm:text-[64px] font-bold sm:leading-[1.2] text-white mb-10 text-[38px] leading-[36px] sm:mb-6">
            {slide.title}
          </h1>
          <button className="bg-[#003399] text-white font-bold text-base sm:py-3 py-[6px] rounded max-w-[370px] w-full hover:bg-[#002080]">
            {slide.buttonText}
          </button>
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === current ? "bg-[#003399]" : "bg-white"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute right-8 bottom-0 sm:flex gap-3 hidden">
          <button
            onClick={prevSlide}
            className="w-[42px] h-[42px] rounded-full border border-white/60 text-white/80 bg-transparent transition-all hover:bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="w-[42px] h-[42px] rounded-full bg-white text-black transition-all hover:bg-white/80 flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
