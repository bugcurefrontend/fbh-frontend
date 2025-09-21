"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

interface SpeciesCardProps {
  id: string;
  name: string;
  scientificName: string;
  carbonAbsorption: number;
  environmentalBenefits: string[];
  imageUrl: string;
  imageAlt: string;
  onLearnMore: (speciesId: string) => void;
  onDonate: (speciesId: string) => void;
}

const SpeciesCard: React.FC<SpeciesCardProps> = ({
  id,
  name,
  scientificName,
  carbonAbsorption,
  environmentalBenefits,
  imageUrl,
  imageAlt,
  onLearnMore,
  onDonate,
}) => {
  return (
    <div className="rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col">
      <div className="relative h-52">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover rounded-t-md"
        />
        <div className="absolute top-4 left-4 flex gap-3">
          <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">
            {carbonAbsorption}kg CO₂/year
          </div>
          <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">
            {environmentalBenefits[0]}
          </div>
        </div>
      </div>
      <div className="max-md:px-2.5 max-md:py-4 md:p-6 flex flex-col md:gap-6 gap-4">
        <div className="space-y-2">
          <h3 className="md:font-bold font-semibold md:text-lg text-black">
            {name}
          </h3>
          <p className="text-sm text-gray-600 italic">{scientificName}</p>
          <div className="flex flex-wrap gap-1">
            {environmentalBenefits.slice(1, 3).map((benefit, index) => (
              <span
                key={index}
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onLearnMore(id)}
            className="flex-1 border border-[#003399] text-[#003399] font-bold md:text-base text-sm md:py-3 py-1.5 rounded-[8px] hover:bg-blue-50 gap-2 flex items-center justify-center"
          >
            Learn More
            <ArrowRightIcon width={16} height={16} />
          </button>
          <button
            onClick={() => onDonate(id)}
            className="flex-1 bg-[#003399] text-white font-bold md:text-base text-sm md:py-3 py-1.5 rounded-[8px] hover:bg-[#002080] gap-2 flex items-center justify-center"
          >
            Donate Tree
            <Image
              src="/images/donate.png"
              alt="donate"
              width={20}
              height={20}
              className=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeciesCard;