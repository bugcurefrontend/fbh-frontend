"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, FileDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TreeDetail {
  id: number;
  project: string;
  species: string;
  treesPlanted: number;
  updated: string;
}

interface Tree {
  id: number;
  treeCode: string;
  project: string;
  species: string;
  lifespan: string;
  direction: string;
}

const treesData: Tree[] = [
  {
    id: 1,
    treeCode: "FBHPT345",
    project: "Kanha Shanti Vanam",
    species: "Mango",
    lifespan: "117",
    direction: "View",
  },
  {
    id: 2,
    treeCode: "FBHPT345",
    project: "Shivagath Project",
    species: "Banana",
    lifespan: "90",
    direction: "View",
  },
  {
    id: 3,
    treeCode: "FBHPT345",
    project: "Kanha Shanti Vanam",
    species: "Spade Wood",
    lifespan: "45",
    direction: "View",
  },
  {
    id: 4,
    treeCode: "FBHPT345",
    project: "Satna Project",
    species: "Arjuna",
    lifespan: "44",
    direction: "View",
  },
  {
    id: 5,
    treeCode: "FBHPT345",
    project: "Kanha Shanti Vanam",
    species: "Banyan",
    lifespan: "50",
    direction: "View",
  },
];

const treeDetailsData: TreeDetail[] = [
  {
    id: 1,
    project: "Kanha Shanti Vanam",
    species: "Mango",
    treesPlanted: 117,
    updated: "View",
  },
  {
    id: 2,
    project: "Shivagath Project",
    species: "Banana",
    treesPlanted: 90,
    updated: "View",
  },
  {
    id: 3,
    project: "Kanha Shanti Vanam",
    species: "Spade Wood",
    treesPlanted: 45,
    updated: "View",
  },
];

export const TreesTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const ITEMS_PER_PAGE = 5;

  const data = viewMode === "list" ? treesData : treeDetailsData;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  if (viewMode === "details") {
    return (
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode("list")}
            className="flex items-center gap-2 text-[#003399] hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Tree Details</span>
          </button>
        </div>

        {/* Map Section */}
        <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6">
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/map.png"
              alt="Map"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-[#6B7280] mt-4">
            Few trees are in the planting queue and will be planted shortly. Their locations will appear here once planting is complete. Thank you for your patience.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E6E6E6]">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Project
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Species
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Trees Planted
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {(currentData as TreeDetail[]).map((tree, index) => (
                  <tr
                    key={tree.id}
                    className={
                      index !== currentData.length - 1
                        ? "border-b border-[#E6E6E6]"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 text-sm text-[#111827]">
                      {tree.project}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111827]">
                      {tree.species}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111827]">
                      {tree.treesPlanted}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm font-semibold text-[#003399] hover:underline">
                        {tree.updated}
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
  }

  return (
    <div className="space-y-6">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tree code ..."
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
                  Tree Code
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Project
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Species
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Lifespan
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Direction
                </th>
              </tr>
            </thead>
            <tbody>
              {(currentData as Tree[]).map((tree, index) => (
                <tr
                  key={tree.id}
                  className={
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {tree.treeCode}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {tree.project}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {tree.species}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {tree.lifespan}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setViewMode("details")}
                      className="text-sm font-semibold text-[#003399] hover:underline"
                    >
                      {tree.direction}
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
