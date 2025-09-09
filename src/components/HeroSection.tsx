"use client";
import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div
      className="h-[604px] bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(0, 13, 38, 0.30), rgba(0, 13, 38, 0.30)), url("/images/hero-forest-bg.png")',
      }}
    >
      <div className="max-w-7xl w-full mx-auto relative md:px-8 px-4 pt-[258px]">
        <div className="sm:max-w-[582px] max-w-[276px]">
          <h1 className="sm:text-[64px] font-bold sm:leading-[1.2] text-white mb-10 text-[38px] leading-[36px] sm:mb-6">
            Putting heart back into the Earth
          </h1>
          <button className="bg-[#003399] text-white font-bold text-base sm:py-3 py-[6px] rounded max-w-[370px] w-full hover:bg-[#002080]">
            PlANT A TREE
          </button>
        </div>

        <div className="md:hidden absolute -bottom-20 left-1/2 -translate-x-1/2">
          <Image src="/images/dots.png" alt="dots" width={48} height={8} />
        </div>

        <div className="absolute right-8 bottom-0 sm:flex gap-3 hidden">
          <button className="w-[42px] h-[42px] rounded-full border border-white/60 text-white/80 bg-transparent transition-all hover:bg-white/20 flex items-center justify-center">
            <ChevronLeft />
          </button>
          <button className="w-[42px] h-[42px] rounded-full bg-white text-black transition-all hover:bg-white/80 flex items-center justify-center">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
