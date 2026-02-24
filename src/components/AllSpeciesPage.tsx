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
import { SpeciesSimplified } from "@/types/species";
import { generateSlug } from "@/services/species";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface AllSpeciesPageProps {
  initialSpecies: SpeciesSimplified[];
  initialPagination?: PaginationData;
  initialSearchQuery?: string;
  headerImageUrl?: string | null;
}

const ITEMS_PER_PAGE = 9;

const AllSpeciesPage: React.FC<AllSpeciesPageProps> = ({
  initialSpecies,
  initialPagination,
  initialSearchQuery = "",
  headerImageUrl = null,
}) => {
  const [allSpecies] = useState<SpeciesSimplified[]>(initialSpecies);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [currentPage, setCurrentPage] = useState(
    initialPagination?.currentPage || 1,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  // 🔍 Filter species based on search query
  const filteredSpecies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allSpecies.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.scientificName.toLowerCase().includes(query),
    );
  }, [searchQuery, allSpecies]);

  // 📄 Paginate filtered species
  const paginatedSpecies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredSpecies.slice(startIndex, endIndex);
  }, [filteredSpecies, currentPage]);

  // Calculate pagination data
  const totalPages = Math.ceil(filteredSpecies.length / ITEMS_PER_PAGE);
  const pagination: PaginationData = {
    currentPage,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrevious: currentPage > 1,
  };

  return (
    <div className="min-h-screen bg-white space-y-8">
      {/* Hero Section */}
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${
            headerImageUrl ??
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=srgb&fm=jpg&q=85"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 md:px-8 md:space-y-12 space-y-8 text-white">
          <Breadcrumb>
            <BreadcrumbList className="text-white font-semibold md:text-base text-sm leading-[18px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Homepage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="font-bold" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/species">All Species</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="font-[Playfair_Display] text-[22px] md:text-[32px] font-semibold">
            All Species
          </h1>
        </div>
      </section>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto md:px-8 px-4 space-y-8 pb-4">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Species name..."
        />

        {/* Species Grid */}
        <div className="mt-6 gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
          {paginatedSpecies.length > 0 ? (
            paginatedSpecies.map((item) => (
              <Link
                key={item.documentId}
                href={`/species/${generateSlug(item.name)}`}
              >
                <div className="flex-1 min-w-0 border border-gray-200 rounded-[16px] flex-shrink-0 hover:shadow-[0_1px_8px_rgba(0,0,0,0.1)] transition-all duration-200">
                  <div className="overflow-hidden w-full p-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={350}
                      height={194}
                      className="w-full object-cover rounded-[8px] md:rounded-[8px] max-h-[194px]"
                    />
                  </div>
                  <div className="p-4 md:pt-2 pt-0 flex justify-between items-center">
                    <p className="text-lg font-semibold text-black truncate md:text-lg md:font-bold md:text-[#19212C]">
                      {item.name}
                    </p>
                    <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer md:mr-4 mr-2">
                      Know More
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
            ))
          ) : (
            <p className="text-center col-span-full min-h-20 md:min-h-64 flex items-center justify-center text-gray-500">
              {searchQuery
                ? `No species found matching "${searchQuery}"`
                : "No species available at the moment."}
            </p>
          )}
        </div>

        {/* Pagination */}
        {filteredSpecies.length > ITEMS_PER_PAGE && (
          <ProjectsPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            hasNext={pagination.hasNext}
            hasPrevious={pagination.hasPrevious}
            onPageChange={handlePageChange}
            className="md:pt-5 pt-3"
          />
        )}
      </main>
    </div>
  );
};

export default AllSpeciesPage;
