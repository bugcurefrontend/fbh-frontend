"use client";
import React from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SpeciesSection: React.FC = () => {
  const species = [
    {
      name: "Neem (Azadirachta)",
      image: "/images/neem-tree.jpg",
    },
    {
      name: "Banyan Tree",
      image: "/images/neem-tree.jpg",
    },
    {
      name: "Mango Tree",
      image: "/images/neem-tree.jpg",
    },
  ];

  return (
    <section className="">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black">
          Species{" "}
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase">
          View All
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:flex gap-8 mb-8">
        {species.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0"
          >
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
                Know More{" "}
                <ArrowRightIcon width={22} height={22} color="#003399" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden mb-6 overflow-x-auto scrollbar-none">
        <div className="flex gap-4 pb-2 w-max">
          {species.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[280px] border border-gray-200 rounded-xl"
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

      <div className="md:flex hidden justify-between items-center md:flex-row flex-col">
        <div className="flex w-full">
          <div className="w-full max-w-[48%] h-1 md:h-[4px] bg-[#003399] rounded-[2px]"></div>
          <div className="w-full max-w-[48%] h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px]"></div>
        </div>

        <div className="flex gap-2 md:gap-1">
          <div className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer">
            <ChevronLeft fontSize="small" />
          </div>
          <div className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer">
            <ChevronRight fontSize="small" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeciesSection;
