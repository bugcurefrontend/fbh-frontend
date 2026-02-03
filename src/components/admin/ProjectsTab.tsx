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
import { ProjectDetailsView } from "./project-details";

interface Project {
  id: number;
  project: string;
  address: string;
  geoTagged: number;
  geoTaggedPlanted: number;
  nonGeoTagged: number;
  nonGeoTaggedPlanted: number;
}

const projectsData: Project[] = [
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
    address: "Satna, Madhya Pradesh",
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
  { label: "Geo-Tagged: Low to High", value: "geoTagged", direction: "asc" },
  { label: "Geo-Tagged: High to Low", value: "geoTagged", direction: "desc" },
  { label: "Planted: Low to High", value: "geoTaggedPlanted", direction: "asc" },
  { label: "Planted: High to Low", value: "geoTaggedPlanted", direction: "desc" },
  { label: "Project Name: A-Z", value: "project", direction: "asc" },
];

export const ProjectsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ITEMS_PER_PAGE = 5;

  // Extract unique addresses for filter
  const uniqueAddresses = Array.from(new Set(projectsData.map(p => p.address)));
  const filterOptions: FilterOption[] = uniqueAddresses.map(addr => ({
    label: addr,
    value: addr
  }));

  const filteredData = projectsData
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.project.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query);

      const matchesFilter = 
        selectedFilters.length === 0 || selectedFilters.includes(item.address);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;
      
      const { value, direction } = selectedSort;
      let comparison = 0;

      if (value === "geoTagged") {
        comparison = a.geoTagged - b.geoTagged;
      } else if (value === "geoTaggedPlanted") {
        comparison = a.geoTaggedPlanted - b.geoTaggedPlanted;
      } else if (value === "project") {
        comparison = a.project.localeCompare(b.project);
      }

      return direction === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  // If viewing project details, show the ProjectDetailsView component
  if (selectedProject) {
    return (
      <ProjectDetailsView
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by project name..."
          />
        </div>
        <TableActions
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterLabel="Filter by Address"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Project
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Address
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Geo-Tagged
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Geo-Tagged Planted
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Non-Geo tagged
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Non Geo-Tagged Planted
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((project, index) => (
                <tr
                  key={project.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }`}
                >
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
                    {project.project}
                  </td>
                  <td className="px-6 py-5.5 text-sm font-semibold text-[#454950] text-center">
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
                  <td className="px-6 py-5.5 text-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-bold text-[#003399] hover:underline"
                    >
                      View
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
