"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const heroSlides = [
  {
    id: 1,
    title: "Putting heart back into the Earth",
    buttonText: "PLANT A TREE",
    bgImage: "/images/hero-water-bg.avif",
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
    bgImage: "/images/hero-girls-bg.avif",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [activeButton, setActiveButton] = useState<"left" | "right">("right");
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
    setActiveButton("right");
    startAutoPlay();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    setActiveButton("left");
    startAutoPlay();
  };

  return (
    <div className="md:h-[540px] h-[403px] relative overflow-hidden">
      {/* Background with fade */}
      <motion.div
        key={heroSlides[current].id}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 13, 38, 0.30), rgba(0, 13, 38, 0.30)), url(${heroSlides[current].bgImage})`,
        }}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.9 }}
        transition={{ duration: 1 }}
      />

      <div className="relative w-full max-w-7xl mx-auto md:px-16 px-4 md:pt-[194px] pt-[102px]">
        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
          key={heroSlides[current].id}
          className="sm:max-w-[582px] max-w-[276px]"
        >
          <h1 className="sm:text-[64px] font-bold text-white mb-4 text-[38px] leading-[1.2] sm:mb-6">
            {heroSlides[current].title}
          </h1>
          <button className="bg-[#003399] text-white font-bold text-base sm:py-3 py-[6px] rounded md:w-[370px] md:h-12 md:py-[11px] md:px-[22px] md:rounded-lg md:text-base md:font-bold md:leading-[26px] md:text-[#FFFFFF] max-w-[370px] w-full hover:bg-[#002080]">
            {heroSlides[current].buttonText}
          </button>
        </motion.div>

        {/* Mobile Dots */}
        <div className="md:hidden absolute top-[334px] left-1/2 -translate-x-1/2 flex gap-3">
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
        <div className="absolute right-16 bottom-0 sm:flex gap-3 hidden">
          <button
            onClick={prevSlide}
            className={`w-[42px] h-[42px] rounded-full transition-all flex items-center justify-center ${
              activeButton === "left"
                ? "bg-white text-black hover:bg-white/80"
                : "border border-white/60 text-white/80 bg-transparent hover:bg-white/20"
            }`}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className={`w-[42px] h-[42px] rounded-full transition-all flex items-center justify-center ${
              activeButton === "right"
                ? "bg-white text-black hover:bg-white/80"
                : "border border-white/60 text-white/80 bg-transparent hover:bg-white/20"
            }`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
