"use client";

import React, { useMemo, useState } from "react";
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
import Link from "next/link";

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

// Sample data
const speciesData: Species[] = [
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
];

const AllSpeciesPage: React.FC<AllSpeciesPageProps> = ({
  initialSpecies,
  initialPagination,
  initialSearchQuery = "",
}) => {
  // Use provided species or fallback to default data
  const [allSpecies] = useState<Species[]>(initialSpecies || speciesData);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [pagination, setPagination] =
    useState<PaginationData>(initialPagination);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
      hasNext: page < prev.totalPages,
      hasPrevious: page > 1,
    }));
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 🔍 Filter species based on search query
  const filteredSpecies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allSpecies.filter((item) => item.name.toLowerCase().includes(query));
  }, [searchQuery, allSpecies]);

  return (
    <div className="min-h-screen bg-white space-y-8">
      {/* Hero Section */}
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=srgb&fm=jpg&q=85')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8 md:space-y-12 space-y-8 text-white">
          <Breadcrumb>
            <BreadcrumbList className="text-white font-normal md:text-base text-sm leading-[18px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Homepage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="font-bold" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/species">All Species</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-4">
            <h1 className="font-[Playfair_Display] text-[22px] md:text-[32px] font-semibold">
              All Species
            </h1>
            <p className="max-md:hidden md:text-lg text-[10px] md:font-bold font-semibold leading-4 md:leading-[26px] w-[85%] md:w-[70%]">
              Explore our collection of tree species, each with unique
              environmental, cultural, and medicinal value. Learn about their
              impact on biodiversity, carbon absorption, and communities—and
              choose to donate or gift a tree that creates a lasting difference.
            </p>
            <p className="md:hidden md:text-lg text-[10px] md:font-bold font-semibold leading-4 md:leading-[26px] w-[85%] md:w-[70%]">
              Explore our collection of tree species, each with unique
              environmental, cultural, and medicinal value. Learn about their
              impact on biodiversity, carbon absorption.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto md:px-8 px-4 space-y-8 pb-4">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search a species..."
        />

        {/* Species Grid */}
        <div className="mt-6 gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
          {filteredSpecies.length > 0 ? (
            filteredSpecies.map((item, index) => (
              <Link key={index} href="/species-detail">
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
                    <p className="text-lg font-bold text-black truncate md:text-lg md:font-bold md:text-[#19212C]">
                      {item.name}
                    </p>
                    <button className="mr-4 flex items-center gap-2 text-[#003399] font-bold text-xs uppercase cursor-pointer">
                      Know More
                      <ArrowRightIcon width={22} height={22} color="#003399" />
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full min-h-20 md:min-h-64 flex items-center justify-center text-gray-500">
              No species found matching "{searchQuery}"
            </p>
          )}
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
