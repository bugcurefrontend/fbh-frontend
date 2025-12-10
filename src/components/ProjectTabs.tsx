"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { CircleArrowRight, Users, X, XIcon } from "lucide-react";
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
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Gallery from "./Gallery";
import { DialogClose } from "@radix-ui/react-dialog";

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
    text: "Lorem ipsum dolor sit amet consectetur. Suspendisse tortor cras vitae ultrices. Magna amet scelerisque pellentesque penatibus ullamcorper lacinia nisl ante. Imperdiet et cursus proin dui congue scelerisque. Nec dui diam nulla.",
  },
  {
    id: 2,
    month: "July 2025",
    images: [
      "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    ],
    text: "Lorem ipsum dolor sit amet consectetur. Suspendisse tortor cras vitae ultrices. Magna amet scelerisque pellentesque penatibus ullamcorper lacinia nisl ante. Imperdiet et cursus proin dui congue scelerisque. Nec dui diam nulla.",
  },
  {
    id: 3,
    month: "July 2025",
    images: [
      "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    ],
    text: "Lorem ipsum dolor sit amet consectetur. Suspendisse tortor cras vitae ultrices. Magna amet scelerisque pellentesque penatibus ullamcorper lacinia nisl ante. Imperdiet et cursus proin dui congue scelerisque. Nec dui diam nulla.",
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
          <TabsList className="flex bg-transparent p-0 h-auto w-full justify-start gap-8">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 pl-2 pr-1 py-4 border-b-2 border-transparent bg-transparent text-[#63676C] hover:text-[#003399] rounded-none relative data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Overview className="w-6 h-6 mr-0.5" />
              <span className="font-bold text-base">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="flex items-center gap-2 pl-2 pr-1 py-4 border-b-2 border-transparent bg-transparent text-[#63676C] hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Update className="w-6 h-6 mr-0.5" />
              <span className="font-bold text-base">Updates</span>
            </TabsTrigger>
            <TabsTrigger
              value="species"
              className="flex items-center gap-2 pl-2 pr-1 py-4 border-b-2 border-transparent bg-transparent text-[#63676C] hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Species className="w-6 h-6" />
              <span className="font-bold text-base">Species</span>
            </TabsTrigger>
            <TabsTrigger
              value="donors"
              className="flex items-center gap-2 pl-2 pr-1 py-4 border-b-2 border-transparent bg-transparent text-[#63676C] hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Users className="w-6 h-6" />
              <span className="font-bold text-base">Donors</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-8 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-[#454950] mb-4 font-public-sans leading-[30px]">
              Project Description:
            </h3>
            <div className="space-y-4 text-[#454950]">
              <p className="font-public-sans">{projectDescription}</p>
              {projectDetails.map((detail, index) => (
                <p key={index} className="font-inter">
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

        <TabsContent value="updates" className="md:mt-11 mt-8 space-y-4">
          <div className="w-full px-4 md:px-14 space-y-10 relative">
            <Select defaultValue="2025">
              <SelectTrigger className="absolute -top-1.5 right-14 gap-10 py-[9px] px-[13px] rounded-md border-[#D1D5DB] text-[#333333] text-sm">
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
                <h3 className="font-bold md:leading-[30px] text-xl text-[#454950]">
                  {update.month}
                </h3>

                <div className="flex justify-between items-center">
                  {/* Images */}
                  <div className="flex gap-8">
                    {update.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-[241px] h-[185px] rounded-lg overflow-hidden"
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
                  <div className="w-[45%] space-y-6">
                    <p className=" max-md:text-sm">{update.text}</p>
                    <Dialog>
                      <DialogTrigger className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer md:font-bold md:text-xs md:leading-[18px] md:uppercase md:text-[#003399]">
                        View all images{" "}
                        <CircleArrowRight
                          width={22}
                          height={22}
                          color="#003399"
                          className="max-sm:w-4"
                        />
                      </DialogTrigger>
                      <DialogContent
                        showCloseButton={false}
                        className="min-w-4xl px-0"
                      >
                        <DialogTitle className="uppercase font-bold text-2xl px-6">
                          Gallery
                        </DialogTitle>
                        <DialogClose asChild>
                          <button className="absolute right-5 top-5 p-2 rounded-full hover:bg-gray-100 transition">
                            <X size={20} className="text-black" />
                          </button>
                        </DialogClose>
                        <div className="px-6">
                          <Gallery />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
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
            <Link key={index} href="/project-detail">
              <div className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0">
                <div className="overflow-hidden w-full md:p-4 p-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={350}
                    height={194}
                    className="w-full object-cover rounded-lg max-h-[194px]"
                  />
                </div>
                <div className="p-4 pt-2 flex justify-between items-center">
                  <p className="text-lg font-bold text-black truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#19212C]">
                    {item.name}
                  </p>
                  <button className="mr-4 flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                    Know More
                    <CircleArrowRight width={22} height={22} color="#003399" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="donors" className="mt-8 px-10">
          <DonorsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTabs;
