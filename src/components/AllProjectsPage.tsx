"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import ProjectCard from "./ProjectCard";
import SearchBar from "./SearchBar";
import ProjectsPagination from "./ProjectsPagination";

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
  const [projects] = useState<Project[]>(initialProjects);
  const [pagination, setPagination] = useState<PaginationData>(initialPagination);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const handlePlantTree = (projectId: string) => {
    console.log(`Plant tree for project: ${projectId}`);
    // Handle plant tree action
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page,
      hasNext: page < prev.totalPages,
      hasPrevious: page > 1,
    }));
    // In a real app, this would trigger a new API call
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger a new API call with search params
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1655985313952-4a182841d6e3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxmb3Jlc3QlMjBsYW5kc2NhcGUlMjB3aWRlfGVufDB8MHx8Z3JlZW58MTc1Nzc2MTE3M3ww&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          {/* Breadcrumb */}
          <div className="mb-12">
            <p className="text-base font-semibold">
              <span className="hover:underline cursor-pointer">Homepage</span>
              <span className="mx-2">{">"}</span>
              <span>All Projects</span>
            </p>
          </div>
          
          {/* Title and Description */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold">
              All Projects
            </h1>
            <p className="text-lg md:text-xl font-bold leading-relaxed max-w-3xl mx-auto">
              Our projects create healthier ecosystems while fostering a culture of care, 
              sustainability, and humanity for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Search Section */}
        <div className="mb-16">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Project name..."
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              location={project.location}
              plantedCount={project.plantedCount}
              category={project.category}
              imageUrl={project.imageUrl}
              imageAlt={project.imageAlt}
              onPlantTree={handlePlantTree}
            />
          ))}
        </div>

        {/* Pagination */}
        <ProjectsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNext={pagination.hasNext}
          hasPrevious={pagination.hasPrevious}
          onPageChange={handlePageChange}
        />
      </main>

      <Footer />
    </div>
  );
};

export default AllProjectsPage;