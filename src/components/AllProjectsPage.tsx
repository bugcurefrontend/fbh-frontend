"use client";

import React, { useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";
import ProjectsPagination from "./ProjectsPagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface AllProjectsPageProps {
  initialProjects: Project[];
  initialPagination: PaginationData;
  initialSearchQuery?: string;
}

const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  initialProjects,
  initialPagination,
  initialSearchQuery = "",
}) => {
  // Keep original list for reference
  const [allProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [pagination, setPagination] =
    useState<PaginationData>(initialPagination);

  // Filter projects when searchQuery changes
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allProjects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allProjects]);

  const handlePlantTree = (projectId: string) => {
    console.log(`Plant tree for project: ${projectId}`);
  };

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

  return (
    <div className="min-h-screen bg-white space-y-8">
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1655985313952-4a182841d6e3?crop=entropy&cs=srgb&fm=jpg&q=85')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 md:px-12 md:space-y-12 space-y-8 text-white">
          <Breadcrumb>
            <BreadcrumbList className="text-white font-normal md:text-base text-sm leading-[18px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Homepage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="font-bold" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects">All Projects</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-4">
            <h1 className="font-[Playfair_Display] text-[22px] md:text-[32px] font-semibold">
              All Projects
            </h1>
            <p className="md:text-lg text-[10px] md:font-bold font-semibold leading-4 md:leading-[26px] w-[85%] md:w-[70%]">
              Our projects create healthier ecosystems while fostering a culture
              of care, sustainability, and humanity for future generations.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto md:px-8 px-4 space-y-8 pb-4">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search a project..."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link key={project.id} href="/project-detail">
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  location={project.location}
                  plantedCount={project.plantedCount}
                  category={project.category}
                  imageUrl={project.imageUrl}
                  imageAlt={project.imageAlt}
                  onPlantTree={handlePlantTree}
                />
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 min-h-20 md:min-h-64 flex items-center justify-center">
              No projects found matching "{searchQuery}"
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

export default AllProjectsPage;
