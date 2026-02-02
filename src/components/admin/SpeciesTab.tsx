"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Species {
  id: number;
  species: string;
  project: string;
  lifespan: number;
  height: string;
  details: string;
}

const speciesData: Species[] = [
  {
    id: 1,
    species: "Mango",
    project: "Kanha Shanti Vanam",
    lifespan: 117,
    height: "15-30m",
    details: "View",
  },
  {
    id: 2,
    species: "Banana",
    project: "Shivagath Project",
    lifespan: 90,
    height: "5-9m",
    details: "View",
  },
  {
    id: 3,
    species: "Spade Wood",
    project: "Kanha Shanti Vanam",
    lifespan: 45,
    height: "20-25m",
    details: "View",
  },
  {
    id: 4,
    species: "Arjuna",
    project: "Satna Project",
    lifespan: 44,
    height: "20-30m",
    details: "View",
  },
  {
    id: 5,
    species: "Banyan",
    project: "Kanha Shanti Vanam",
    lifespan: 50,
    height: "20-25m",
    details: "View",
  },
];

export const SpeciesTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(speciesData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = speciesData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by species name ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
          >
            <SortAsc className="w-4 h-4" />
            Sort
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
          >
            <FileDown className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E6E6E6]">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Species
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Project
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Lifespan
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Height
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((species, index) => (
                <tr
                  key={species.id}
                  className={
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {species.species}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {species.project}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {species.lifespan} years
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {species.height}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm font-semibold text-[#003399] hover:underline">
                      {species.details}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination className="py-4 px-6 border-t border-[#E6E6E6]">
          <PaginationContent className="w-full flex items-center justify-between">
            <PaginationItem className="border rounded-l-md">
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:rounded-r-none"
                }
              />
            </PaginationItem>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </div>

            <PaginationItem className="border rounded-r-md">
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:rounded-l-none"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
