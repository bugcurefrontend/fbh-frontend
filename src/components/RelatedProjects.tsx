"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Leaf } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface RelatedProjectsProps {
  projects: Project[];
  onPlantTree: (projectId: string) => void;
  onViewAll: () => void;
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({
  projects,
  onPlantTree,
  onViewAll,
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-playfair font-semibold text-gray-900">
          Explore other projects
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm font-bold text-[#003399] hover:text-[#002266] uppercase tracking-wide"
        >
          VIEW ALL
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-white/90 text-gray-800 font-semibold text-sm px-3 py-1 rounded-full">
                  {project.plantedCount >= 100 ? "100+ planted" : `${project.plantedCount}+ planted`}
                </div>
                <div className="bg-white/90 text-gray-800 font-semibold text-sm px-3 py-1 rounded-full">
                  {project.category}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-base font-semibold">{project.location}</span>
                </div>
              </div>

              <Button 
                onClick={() => onPlantTree(project.id)}
                className="w-full bg-[#003399] hover:bg-[#002266] text-white font-bold text-base py-3 h-12 rounded-lg flex items-center justify-center gap-2 uppercase"
              >
                <span>PLANT A TREE</span>
                <Leaf className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;