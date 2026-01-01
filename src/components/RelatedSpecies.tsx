"use client";

import { useEffect, useState } from "react";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import Link from "next/link";
import Image from "next/image";
import { SpeciesSimplified } from "@/types/species";
import { generateSlug } from "@/services/species";

interface RelatedSpeciesProps {
  currentSpeciesId?: string;
  limit?: number;
}

const RelatedSpecies: React.FC<RelatedSpeciesProps> = ({
  currentSpeciesId,
  limit = 3,
}) => {
  const [species, setSpecies] = useState<SpeciesSimplified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedSpecies = async () => {
      try {
        const { fetchAllSpecies } = await import("@/services/species");
        const allSpecies = await fetchAllSpecies();

        // Filter out current species
        const filtered = allSpecies.filter(
          (s) => s.documentId !== currentSpeciesId
        );

        // Separate popular and non-popular
        const popular = filtered.filter((s) => s.popular);
        const nonPopular = filtered.filter((s) => !s.popular);

        // Take popular first, fill remaining with non-popular
        const result: SpeciesSimplified[] = [];

        // Add popular species (up to limit)
        result.push(...popular.slice(0, limit));

        // If not enough popular, fill with non-popular
        if (result.length < limit) {
          const remaining = limit - result.length;
          result.push(...nonPopular.slice(0, remaining));
        }

        setSpecies(result);
      } catch (error) {
        console.error("Failed to load related species:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedSpecies();
  }, [currentSpeciesId, limit]);

  if (loading || species.length === 0) {
    return null;
  }
  return (
    <div className="md:space-y-8 space-y-6">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Explore other species{" "}
        </h2>
        <Link href="/species">
          <button className="absolute right-0 md:top-4 top-2.5 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
            View All
          </button>
        </Link>
      </div>

      <div className="hidden mt-6 md:gap-8 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
        {species.map((item) => (
          <Link
            key={item.documentId}
            href={`/species/${generateSlug(item.name)}`}
          >
            <div className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0 hover:shadow-md transition-all duration-200">
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
        ))}
      </div>

      <div className="sm:hidden mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-6 w-max">
          {species.map((item) => (
            <Link
              key={item.documentId}
              href={`/species/${generateSlug(item.name)}`}
            >
              <div className="flex-1 border border-gray-200 rounded-[16px] flex-shrink-0 overflow-hidden">
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
    </div>
  );
};
export default RelatedSpecies;
