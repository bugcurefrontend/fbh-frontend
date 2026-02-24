"use client";

import { useState, useEffect } from "react";
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
import { fetchProjectById } from "@/services/projects";
import { SpeciesRef } from "@/types/project";
import { logger } from "@/lib/logger";

interface Project {
  id: number;
  project: string;
  address: string;
  geoTagged: number;
  geoTaggedPlanted: number;
  nonGeoTagged: number;
  nonGeoTaggedPlanted: number;
}

interface SpeciesDetail {
  id: number;
  commonName: string;
  scientificName: string;
  geoTagged: number;
  geoTaggedPlanted: number;
  nonGeoTagged: number;
  nonGeoTaggedPlanted: number;
}

interface TreeCountData {
  id: number;
  documentId: string;
  total: number;
  specie?: {
    id: number;
    documentId: string;
    common_name: string;
    scientific_name?: string;
  };
}

interface ProjectDetailsViewProps {
  project: Project;
  onBack: () => void;
}

const sortOptions: SortOption[] = [
  { label: "Common Name: A-Z", value: "commonName", direction: "asc" },
  { label: "Common Name: Z-A", value: "commonName", direction: "desc" },
  { label: "Geo-Tagged: High to Low", value: "geoTagged", direction: "desc" },
  { label: "Geo-Tagged: Low to High", value: "geoTagged", direction: "asc" },
];

export const ProjectDetailsView = ({
  project,
  onBack,
}: ProjectDetailsViewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [speciesData, setSpeciesData] = useState<SpeciesDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 6;

  // Fetch project species data
  useEffect(() => {
    const loadSpeciesData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch full project details with species and tree_counts
        const projectData = await fetchProjectById(project.id.toString());

        if (projectData && projectData.species && Array.isArray(projectData.species)) {
          // Transform species data
          // Note: Real geotagged/non-geotagged breakdown would require a dedicated API endpoint
          // For now, we'll use available data and show what we can
          const transformedSpecies: SpeciesDetail[] = projectData.species.map((species: SpeciesRef, index: number) => ({
            id: species.id || index,
            commonName: species.common_name || "Unknown",
            scientificName: species.scientific_name || "N/A",
            // These would need to come from a dedicated API endpoint for real data
            geoTagged: 0,
            geoTaggedPlanted: 0,
            nonGeoTagged: 0,
            nonGeoTaggedPlanted: 0,
          }));

          setSpeciesData(transformedSpecies);
        } else {
          setSpeciesData([]);
        }
      } catch (err) {
        logger.error("Error loading species data", err);
        setError("Failed to load species details. Please try again later.");
        setSpeciesData([]);
      } finally {
        setLoading(false);
      }
    };

    loadSpeciesData();
  }, [project.id]);

  // Extract unique common names for filter
  const uniqueCommonNames = Array.from(new Set(speciesData.map(s => s.commonName)));
  const filterOptions: FilterOption[] = uniqueCommonNames.map(name => ({
    label: name,
    value: name
  }));

  const filteredData = speciesData
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.commonName.toLowerCase().includes(query) ||
        item.scientificName.toLowerCase().includes(query);

      const matchesFilter = 
         selectedFilters.length === 0 || selectedFilters.includes(item.commonName);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;
      
      const { value, direction } = selectedSort;
      let comparison = 0;

      if (value === "commonName") {
        comparison = a.commonName.localeCompare(b.commonName);
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
          {project.project} ( Species Details )
        </h1>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by species name, etc ..."
          />
        </div>
        <TableActions
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterLabel="Filter by Species"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Common Name
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Scientific Name
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    Loading species details...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <p className="text-red-600 font-medium mb-2">Error Loading Species Data</p>
                    <p className="text-gray-500 text-sm">{error}</p>
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    No species details found.
                  </td>
                </tr>
              ) : (
                currentData.map((species, index) => (
                  <tr
                    key={species.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                      index !== currentData.length - 1
                        ? "border-b border-[#E6E6E6]"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {species.commonName}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {species.scientificName}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {species.geoTagged}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {species.geoTaggedPlanted}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {species.nonGeoTagged}
                    </td>
                    <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                      {species.nonGeoTaggedPlanted}
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
