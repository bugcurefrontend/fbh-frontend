"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchBar from "@/components/SearchBar";
import { TableActions, SortOption, FilterOption } from "./TableActions";

interface Tree {
  id: number;
  treeCode: string;
  project: string;
  species: string;
  longitude: string;
  latitude: string;
}

const treesData: Tree[] = [
  {
    id: 1,
    treeCode: "54684898",
    project: "Kanha Shanti Vanam",
    species: "Mango",
    longitude: "3454",
    latitude: "3454",
  },
  {
    id: 2,
    treeCode: "54684898",
    project: "Shivgarh Project",
    species: "Banana",
    longitude: "54684898",
    latitude: "54684898",
  },
  {
    id: 3,
    treeCode: "54684898",
    project: "Kanha Shanti Vanam",
    species: "Sandle Wood",
    longitude: "3454",
    latitude: "3454",
  },
  {
    id: 4,
    treeCode: "54684898",
    project: "Satna Project",
    species: "Arjuna",
    longitude: "54684898",
    latitude: "54684898",
  },
  {
    id: 5,
    treeCode: "54684898",
    project: "Kanha Shanti Vanam",
    species: "Banyan",
    longitude: "3454",
    latitude: "3454",
  },
];

const sortOptions: SortOption[] = [
  { label: "Tree Code: A-Z", value: "treeCode", direction: "asc" },
  { label: "Tree Code: Z-A", value: "treeCode", direction: "desc" },
  { label: "Project: A-Z", value: "project", direction: "asc" },
  { label: "Species: A-Z", value: "species", direction: "asc" },
];

export const TreesTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const ITEMS_PER_PAGE = 5;

  // Extract unique projects and species for filters
  const uniqueProjects = Array.from(new Set(treesData.map(t => t.project)));
  const uniqueSpecies = Array.from(new Set(treesData.map(t => t.species)));

  const filterOptions: FilterOption[] = [
    ...uniqueProjects.map(p => ({ label: p, value: p })),
    ...uniqueSpecies.map(s => ({ label: s, value: s })),
  ];

  const filteredData = treesData
    .filter((item) => {
      // Search logic
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.treeCode.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query) ||
        item.species.toLowerCase().includes(query);

      // Filter logic
      // In this case, since we mix Project and Species in one filter list, we check if the selected filters include EITHER the project OR the species.
      // If no filters selected, match all.
      const matchesFilter = selectedFilters.length === 0 || 
                           selectedFilters.includes(item.project) || 
                           selectedFilters.includes(item.species);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;
      
      const { value, direction } = selectedSort;
      let comparison = 0;

      if (value === "treeCode") {
        comparison = a.treeCode.localeCompare(b.treeCode);
      } else if (value === "project") {
        comparison = a.project.localeCompare(b.project);
      } else if (value === "species") {
        comparison = a.species.localeCompare(b.species);
      }

      return direction === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by tree code, project, etc ..."
          />
        </div>
        <TableActions
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterLabel="Filter by Project/Species"
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Tree Code
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Project
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Species
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Longitude
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Latitude
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Updates
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Directions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((tree, index) => (
                <tr
                  key={tree.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }`}
                >
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                    {tree.treeCode}
                  </td>
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                    {tree.project}
                  </td>
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                    {tree.species}
                  </td>
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                    {tree.longitude}
                  </td>
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                    {tree.latitude}
                  </td>
                  <td className="px-6 py-5.5 text-center">
                    <button className="text-sm font-bold text-[#003399] hover:underline">
                      View
                    </button>
                  </td>
                  <td className="px-6 py-5.5 text-center">
                    <button className="text-sm font-bold text-[#003399] hover:underline">
                      Click Here
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
