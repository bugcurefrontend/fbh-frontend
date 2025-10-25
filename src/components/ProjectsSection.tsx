"use client";
import React from "react";
import Image from "next/image";
import LocationPinIcon from "./icons/LocationPinIcon";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: "1",
      title: "K & S Associate",
      location: "Indore",
      plantedCount: 150,
      category: "Reforestation",
      imageUrl: "/images/test2.jpg",
      imageAlt:
        "Dense green forest with tall trees, natural lighting, reforestation project - Anthony Mucci on Unsplash",
    },
    {
      id: "2",
      title: "K & S Associate",
      location: "Indore",
      plantedCount: 200,
      category: "Reforestation",
      imageUrl:
        "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Mountain forest landscape with evergreen trees, conservation area - Cale Benefield on Unsplash",
    },
    {
      id: "3",
      title: "K & S Associate",
      location: "Indore",
      plantedCount: 300,
      category: "Reforestation",
      imageUrl:
        "https://images.unsplash.com/photo-1629138416134-e548f78cbc95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxmb3Jlc3QlMjBzdW5saWdodCUyMHBhdGh8ZW58MHwwfHx8MTc1Nzc2MTE3MHww&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Sunlit forest path with golden light filtering through trees - Peter Neumann on Unsplash",
    },
    {
      id: "4",
      title: "Forests By Heartfulness",
      location: "Mumbai",
      plantedCount: 500,
      category: "Reforestation",
      imageUrl:
        "https://images.unsplash.com/photo-1566230724891-75ea7213175a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtaXN0JTIwcGluZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Misty forest with tall pine trees, atmospheric nature scene - Sébastien Goldberg on Unsplash",
    },
    {
      id: "5",
      title: "Forests By Heartfulness",
      location: "Delhi",
      plantedCount: 750,
      category: "Reforestation",
      imageUrl:
        "https://images.unsplash.com/photo-1700686257511-98b32cf377da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYW5vcHklMjBncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Lush green forest canopy view, biodiversity conservation - Wolfgang Hasselmann on Unsplash",
    },
    {
      id: "6",
      title: "Forests By Heartfulness",
      location: "Bangalore",
      plantedCount: 400,
      category: "Reforestation",
      imageUrl:
        "https://images.unsplash.com/photo-1657027574524-2b95d6301ab9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxhbmNpZW50JTIwZm9yZXN0JTIwb2xkJTIwdHJlZXN8ZW58MHwwfHxncmVlbnwxNzU3NzYxMTcwfDA&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Ancient forest with old growth trees, natural habitat - Yuriy Mayatnikov on Unsplash",
    },
  ];

  const handlePlantTree = (projectId: string) => {
    console.log(`Plant tree for project: ${projectId}`);
    // Handle plant tree action
  };

  const formatPlantedCount = (count: number): string => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}k+ planted`;
    }
    return `${count}+ planted`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Projects
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
          View All
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        {projects.map((project) => (
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
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-4 pb-2 w-max">
          {projects.map((project, idx) => (
            <Link key={idx} href="/project-detail">
              <div className="flex-1 min-w-[314px] max-w-[314px] border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                <div className="relative h-52">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover rounded-t-[16px]"
                  />
                  <div className="absolute top-4 left-4 flex gap-1">
                    <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]">
                      {formatPlantedCount(project.plantedCount)}
                    </div>
                    <div className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]">
                      {project.category}
                    </div>
                  </div>
                </div>
                <div className="px-2 py-3 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate md:font-bold md:text-lg md:leading-[26px] md:align-middle text-[#090C0F]">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <LocationPinIcon width={13} height={16} color="#19212c" />
                      <span className="font-semibold md:font-semibold md:leading-6 md:align-middle text-[#19212C]">
                        {project.location}
                      </span>
                    </div>
                  </div>
                  <button className="bg-[#003399] text-white font-bold text-base py-2 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center md:font-bold md:text-base md:leading-[26px] md:text-[#FFFFFF]">
                    PLANT A TREE
                    <Image
                      src="/images/donate.png"
                      alt="donate"
                      width={24}
                      height={24}
                      className=""
                    />{" "}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
