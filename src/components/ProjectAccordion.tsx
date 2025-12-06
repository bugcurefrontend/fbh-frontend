"use client";

import React from "react";
import { CircleArrowRight, Users } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
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
import DonorsTable from "./DonorsTable";
import RelatedProjects from "./RelatedProjects";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface ProjectAccordionProps {
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
];

const species = [
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
];

const images = [
  "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
];

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
  projectDescription,
  projectDetails,
  relatedProjects,
  onPlantTree,
  onViewAll,
}) => {
  return (
    <div className="w-full md:hidden">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {/* Overview */}
        <AccordionItem value="overview">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Overview className="w-5 h-5" />
              <span className="font-semibold text-base">Overview</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3 space-y-4">
            <h3 className="text-base font-semibold text-gray-900">
              Project Description:
            </h3>
            <p className="text-sm leading-6 text-gray-700">
              {projectDescription}
            </p>
            {projectDetails.map((detail, index) => (
              <p key={index} className="text-sm leading-6 text-gray-700">
                {detail}
              </p>
            ))}

            {/* Related Projects Section - Only shown in Overview */}
            <div className="mt-8">
              <RelatedProjects
                projects={relatedProjects}
                onPlantTree={onPlantTree}
                onViewAll={onViewAll}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Updates */}
        <AccordionItem value="updates">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Update className="w-5 h-5" />
              <span className="font-semibold text-base">Updates</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3">
            <div className="w-full mx-auto space-y-6 relative">
              <Select defaultValue="2025">
                <SelectTrigger className="absolute top-0 right-0 gap-3 hover:rounded rounded border-2 max-h-6 px-3">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              {updates.map((update) => (
                <div key={update.id} className="space-y-3">
                  <h3 className="font-semibold text-base text-[#454950]">
                    {update.month}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    {/* Images */}
                    <div className="grid grid-cols-2 gap-3 col-span-2">
                      {update.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative w-full h-31 md:h-48 lg:h-60 rounded-lg overflow-hidden"
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

                    <div className="space-y-2">
                      {/* Text */}
                      <p className="text-xs text-[#454950] leading-[18px]">
                        {update.text}
                      </p>
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
                        <DialogContent className="px-0">
                          <DialogTitle className="border-b pb-3 px-4">
                            Gallery
                          </DialogTitle>
                          <div className="px-4 max-h-[600px] overflow-y-auto h-full space-y-6 pb-2">
                            {images.map((img, i) => (
                              <div
                                key={i}
                                className="relative w-full h-44 sm:h-52 md:h-60 rounded-xl overflow-hidden"
                              >
                                <Image
                                  src={img}
                                  alt="img"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Species */}
        <AccordionItem value="species">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Species className="w-5 h-5" />
              <span className="font-semibold text-base">Species</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3 gap-4 grid grid-cols-1 sm:grid-cols-2 items-center">
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
                    height={160}
                    className="w-full rounded-lg max-h-[160px] object-cover"
                  />
                </div>
                <div className="px-4 pt-2 pb-4 space-y-2">
                  <p className="text-base truncate font-semibold md:leading-[26px] md:align-middle text-[#19212C]">
                    {item.name}
                  </p>
                  <button className="pt-2 flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                    Know More
                    <CircleArrowRight width={22} height={22} color="#003399" />
                  </button>
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Donors */}
        <AccordionItem value="donors">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-inherit" />
              <span className="font-semibold text-base">Donors</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3 md:py-4">
            <DonorsTable />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectAccordion;
