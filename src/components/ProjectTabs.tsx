"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ArrowRightIcon, Users } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Overview from "./icons/overview";
import Update from "./icons/update";
import Species from "./icons/Species";
import RelatedProjects from "./RelatedProjects";
import DonorsTable from "./DonorsTable";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface ProjectTabsProps {
  projectDescription: string;
  projectDetails: string[];
  relatedProjects: Project[];
  onPlantTree: (projectId: string) => void;
  onViewAll: () => void;
}

const updates = [
  {
    id: 1,
    month: "July 2025",
    images: [
      "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    ],
    text: "In 2023, the Honourable Chief Minister of Madhya Pradesh, Shri. Mohan Yadav invited FBH to afforest an initial parcel of 12 sites in Satna aggregating 650 HA. This project was kicked off in 2023 by the Dy. Chief Minister, Shri Rajendra Shukla.",
  },
  {
    id: 2,
    month: "July 2025",
    images: [
      "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    ],
    text: "Lorem ipsum dolor sit amet consectetur. Suspendisse tortor cras vitae ultrices. Magna amet scelerisque pellentesque penatibus ullamcorper lacinia nisl ante.",
  },
  {
    id: 3,
    month: "July 2025",
    images: [
      "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    ],
    text: "Lorem ipsum dolor sit amet consectetur. Suspendisse tortor cras vitae ultrices. Magna amet scelerisque pellentesque penatibus ullamcorper lacinia nisl ante.",
  },
];

const species = [
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
];

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  projectDescription,
  projectDetails,
  relatedProjects,
  onPlantTree,
  onViewAll,
}) => {
  return (
    <div className="w-full max-md:hidden">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-gray-200">
          <TabsList className="flex bg-transparent p-0 h-auto w-full justify-start">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none relative data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Overview className="w-6 h-6" />
              <span className="font-bold text-base">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Update className="w-6 h-6" />
              <span className="font-bold text-base">Updates</span>
            </TabsTrigger>
            <TabsTrigger
              value="species"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Species className="w-6 h-6" />
              <span className="font-bold text-base">Species</span>
            </TabsTrigger>
            <TabsTrigger
              value="donors"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Users className="w-6 h-6" />
              <span className="font-bold text-base">Donors</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-8 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-public-sans">
              Project Description:
            </h3>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-6 font-public-sans">
                {projectDescription}
              </p>
              {projectDetails.map((detail, index) => (
                <p key={index} className="text-lg leading-6 font-inter">
                  {detail}
                </p>
              ))}
            </div>
          </div>

          {/* Related Projects Section - Only shown in Overview */}
          <div className="mt-16">
            <RelatedProjects
              projects={relatedProjects}
              onPlantTree={onPlantTree}
              onViewAll={onViewAll}
            />
          </div>
        </TabsContent>

        <TabsContent value="updates" className="mt-8 space-y-4">
          <div className="w-full container mx-auto px-4 md:px-6 space-y-10 relative">
            <Select defaultValue="2025">
              <SelectTrigger className="absolute top-6 right-6 gap-10 hover:rounded-[5xl] border-2 py-[10px] px-[6px] rounded-[5px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            {updates.map((update) => (
              <div key={update.id} className="space-y-4">
                <h3 className="font-bold text-xl">{update.month}</h3>

                <div className="flex justify-between items-center">
                  {/* Images */}
                  <div className="w-1/2 grid grid-cols-2 gap-2 col-span-2">
                    {update.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-full h-[185px] rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`Update image ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Text */}
                  <p className="w-[45%] text-sm text-gray-700 leading-relaxed">
                    {update.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="species"
          className="mt-8 gap-8 grid grid-cols-3 items-center"
        >
          {species.map((item, index) => (
            <div
              key={index}
              className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0"
            >
              <div className="overflow-hidden w-full md:p-4 p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={350}
                  height={194}
                  className="w-full rounded-xl"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-lg font-bold text-black truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#19212C]">
                  {item.name}
                </p>
                <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                  Know More
                  <ArrowRightIcon width={22} height={22} color="#003399" />
                </button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="donors" className="mt-8 px-6">
          <DonorsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTabs;
