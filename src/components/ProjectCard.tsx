"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Leaf } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ProjectCardProps {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
  onPlantTree: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  location,
  plantedCount,
  category,
  imageUrl,
  imageAlt,
  onPlantTree,
}) => {
  const formatPlantedCount = (count: number): string => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k+ planted`;
    }
    return `${count}+ planted`;
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-2xl">
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Badges overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-gray-800 font-semibold text-sm px-3 py-1"
          >
            {formatPlantedCount(plantedCount)}
          </Badge>
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-gray-800 font-semibold text-sm px-3 py-1"
          >
            {category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-base font-semibold">{location}</span>
          </div>
        </div>

        <Button 
          onClick={() => onPlantTree(id)}
          className="w-full bg-[#003399] hover:bg-[#002266] text-white font-bold text-base py-3 h-12 rounded-lg flex items-center justify-center gap-2"
        >
          <span>PLANT A TREE</span>
          <Leaf className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;