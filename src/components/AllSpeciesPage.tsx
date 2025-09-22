"use client";

import React, { useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ProjectsPagination from "./ProjectsPagination";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface Species {
  name: string;
  image: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface AllSpeciesPageProps {
  initialSpecies: Species[];
  initialPagination: PaginationData;
  initialSearchQuery?: string;
}

// Species data matching ProjectTabs
const speciesData = [
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
];

const AllSpeciesPage: React.FC<AllSpeciesPageProps> = ({
  initialSpecies,
  initialPagination,
  initialSearchQuery = "",
}) => {
  const [species] = useState<Species[]>(initialSpecies);
  const [pagination, setPagination] =
    useState<PaginationData>(initialPagination);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
      hasNext: page < prev.totalPages,
      hasPrevious: page > 1,
    }));
    // In a real app, this would trigger a new API call
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger a new API call with search params
  };

  return (
    <div className="min-h-screen bg-white space-y-8">
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full mx-auto px-4 md:px-12 md:space-y-12 space-y-8 text-white">
          <Breadcrumb>
            <BreadcrumbList className="text-white font-semibold md:text-base text-sm leading-[18px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Homepage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/species">Species</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-4">
            <h1 className="font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
              Species
            </h1>
            <p className="md:text-lg text-[10px] md:font-bold font-semibold leading-4 md:leading-[26px] w-[85%] md:w-[70%]">
              Explore our collection of tree species, each with unique
              environmental, cultural, and medicinal value. Learn about their
              impact on biodiversity, carbon absorption, and communities—and
              choose to donate or gift a tree that creates a lasting difference.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto md:px-8 px-4 space-y-8">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by species name..."
        />

        {/* Species Grid - Same design as ProjectTabs */}
        <div className="mt-6 gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
          {speciesData.map((item, index) => (
            <div
              key={index}
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
                <p className="text-sm font-semibold text-black truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#19212C]">
                  {item.name}
                </p>
                <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                  Know More
                  <ArrowRightIcon width={22} height={22} color="#003399" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <ProjectsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNext}
          hasPrevious={pagination.hasPrevious}
          onPageChange={handlePageChange}
          className="pt-5"
        />
      </main>
    </div>
  );
};

export default AllSpeciesPage;
