"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { TableActions, SortOption, FilterOption } from "../TableActions";
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
  commonName: string;
  scientificName: string;
  geoTagged: number;
  geoTaggedPlanted: number;
  nonGeoTagged: number;
  nonGeoTaggedPlanted: number;
}

interface ProjectDetail {
  id: number;
  project: string;
  address: string;
  geoTagged: number;
  geoTaggedPlanted: number;
  nonGeoTagged: number;
  nonGeoTaggedPlanted: number;
}

interface SpeciesDetailsViewProps {
  species: Species;
  onBack: () => void;
}

// Mock project data for the selected species
const mockProjectData: ProjectDetail[] = [
  {
    id: 1,
    project: "Kanha Shanti Vanam",
    address: "Shivagarh, Madhya Pradesh",
    geoTagged: 455,
    geoTaggedPlanted: 860,
    nonGeoTagged: 700,
    nonGeoTaggedPlanted: 450,
  },
  {
    id: 2,
    project: "Shivgarh Project",
    address: "Shivagarh, Madhya Pradesh",
    geoTagged: 650,
    geoTaggedPlanted: 600,
    nonGeoTagged: 420,
    nonGeoTaggedPlanted: 300,
  },
  {
    id: 3,
    project: "Kanha Shanti Vanam",
    address: "Shivagarh, Madhya Pradesh",
    geoTagged: 700,
    geoTaggedPlanted: 500,
    nonGeoTagged: 250,
    nonGeoTaggedPlanted: 200,
  },
  {
    id: 4,
    project: "Satna Project",
    address: "Shivagarh, Madhya Pradesh",
    geoTagged: 350,
    geoTaggedPlanted: 500,
    nonGeoTagged: 150,
    nonGeoTaggedPlanted: 650,
  },
  {
    id: 5,
    project: "Kanha Shanti Vanam",
    address: "Shivagarh, Madhya Pradesh",
    geoTagged: 400,
    geoTaggedPlanted: 200,
    nonGeoTagged: 80,
    nonGeoTaggedPlanted: 200,
  },
];

const sortOptions: SortOption[] = [
  { label: "Project: A-Z", value: "project", direction: "asc" },
  { label: "Project: Z-A", value: "project", direction: "desc" },
  { label: "Geo-Tagged: High to Low", value: "geoTagged", direction: "desc" },
  { label: "Geo-Tagged: Low to High", value: "geoTagged", direction: "asc" },
];

export const SpeciesDetailsView = ({
  species,
  onBack,
}: SpeciesDetailsViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const ITEMS_PER_PAGE = 5;

  // Extract unique projects for filter
  const uniqueProjects = Array.from(new Set(mockProjectData.map(p => p.project)));
  const filterOptions: FilterOption[] = uniqueProjects.map(p => ({
    label: p,
    value: p
  })); 

  const filteredData = mockProjectData
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.project.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query);

      const matchesFilter =
        selectedFilters.length === 0 || selectedFilters.includes(item.project);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;
      
      const { value, direction } = selectedSort;
      let comparison = 0;

      if (value === "project") {
        comparison = a.project.localeCompare(b.project);
      } else if (value === "geoTagged") {
        comparison = a.geoTagged - b.geoTagged;
      }

      return direction === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="flex items-center px-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold">
          {species.commonName} ( Project Details )
        </h1>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by project name, etc ..."
          />
        </div>
        <TableActions
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterLabel="Filter by Project"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Project
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Address
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Geo-Tagged
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Geo-Tagged Planted
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Non-Geo tagged
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Non Geo-Tagged Planted
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    No project details found.
                  </td>
                </tr>
              ) : (
                currentData.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                      index !== currentData.length - 1
                        ? "border-b border-[#E6E6E6]"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#090C0F] text-center">
                      {project.project}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#090C0F] text-center">
                      {project.address}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {project.geoTagged}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {project.geoTaggedPlanted}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {project.nonGeoTagged}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {project.nonGeoTaggedPlanted}
                    </td>
                  </tr>
                ))
              )}
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
