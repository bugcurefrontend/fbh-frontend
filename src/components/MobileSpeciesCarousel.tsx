"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import { SpeciesSimplified } from "@/types/species";
import { generateSlug } from "@/services/species";

interface MobileSpeciesCarouselProps {
  species: SpeciesSimplified[];
}

const MobileSpeciesCarousel: React.FC<MobileSpeciesCarouselProps> = ({
  species,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = species.length;
  const visibleSlides = 1;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  if (species.length === 0) {
    return null;
  }

  return (
    <div className="sm:hidden mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex gap-6 w-max">
        {species.map((item) => (
          <Link
            key={item.documentId}
            href={`/species/${generateSlug(item.name)}`}
          >
            <div className="flex-1 max-w-[314px] min-w-[314px] max-h-[274px] border border-gray-200 rounded-[16px] flex-shrink-0 overflow-hidden">
              <div className="pt-3 px-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={280}
                  height={194}
                  className="rounded-[8px] object-cover max-h-[160px]"
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
  );
};

export default MobileSpeciesCarousel;
