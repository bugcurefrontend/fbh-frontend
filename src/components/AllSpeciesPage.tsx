"use client";

import React, { useMemo, useState, useEffect } from "react";
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
import { generateSlug } from "@/lib/slug";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface AllSpeciesPageProps {
  initialSpecies?: SpeciesSimplified[];
  initialPagination?: PaginationData;
  initialSearchQuery?: string;
}

const ITEMS_PER_PAGE = 9;

const AllSpeciesPage: React.FC<AllSpeciesPageProps> = ({
  initialSpecies,
  initialPagination,
  initialSearchQuery = "",
}) => {
  const [allSpecies, setAllSpecies] = useState<SpeciesSimplified[]>(initialSpecies || []);
  const [loading, setLoading] = useState(!initialSpecies);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [currentPage, setCurrentPage] = useState(initialPagination?.currentPage || 1);

  useEffect(() => {
    if (initialSpecies) return; // Skip if data already provided

    const fetchSpecies = async () => {
      try {
        // Try static pre-built data first
        const response = await fetch('/data/species.json');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setAllSpecies(data);
            setLoading(false);
            return;
          }
        }

        // Fallback to API
        const { getSpecies } = await import('@/lib/api');
        const apiData = await getSpecies();
        setAllSpecies(apiData);
      } catch (error) {
        console.error("Failed to load species:", error);
        try {
          const { getSpecies } = await import('@/lib/api');
          const apiData = await getSpecies();
          setAllSpecies(apiData);
        } catch (apiError) {
          console.error("API fallback also failed:", apiError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [initialSpecies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  // 🔍 Filter species based on search query
  const filteredSpecies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allSpecies.filter((item) =>
      item.name.toLowerCase().includes(query) ||
      item.scientificName.toLowerCase().includes(query)
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading species...</p>
          </div>
        ) : (
          <>
            {/* Species Grid */}
            <div className="mt-6 gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
              {paginatedSpecies.length > 0 ? (
                paginatedSpecies.map((item) => (
                  <Link key={item.documentId} href={`/species/${generateSlug(item.name)}`}>
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
                className="pt-5"
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AllSpeciesPage;
