"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CircleArrowRight, Users, X } from "lucide-react";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface Project {
  id: string;
  title: string;
  location: string;
  plantedCount: number;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface ProjectUpdateUI {
  id: number;
  month: string;
  date: string;
  year: number;
  images: string[];
  text: string;
}

interface ProjectSpeciesUI {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface ProjectAccordionProps {
  projectDescription: string;
  projectDetails: string[];
  relatedProjects: Project[];
  onPlantTree: (projectId: string) => void;
  onViewAll: () => void;
  projectUpdates?: ProjectUpdateUI[];
  projectSpecies?: ProjectSpeciesUI[];
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
  projectDescription,
  projectDetails,
  relatedProjects,
  onPlantTree,
  onViewAll,
  projectUpdates = [],
  projectSpecies = [],
}) => {
  // Get unique years from updates for the dropdown
  const years = Array.from(new Set(projectUpdates.map((u) => u.year))).sort(
    (a, b) => b - a
  );
  const [selectedYear, setSelectedYear] = React.useState<string>(
    years.length > 0 ? years[0].toString() : new Date().getFullYear().toString()
  );

  // Filter updates by selected year
  const filteredUpdates = projectUpdates.filter(
    (u) => u.year.toString() === selectedYear
  );

  const [activeItem, setActiveItem] = useState<string | undefined>("overview");

  return (
    <div className="w-full md:hidden">
      <Accordion
        type="single"
        collapsible
        value={activeItem}
        onValueChange={setActiveItem}
        className="w-full space-y-2"
      >
        {/* Overview */}
        <AccordionItem value="overview">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Overview className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-base">Overview</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3 md:space-y-4 space-y-2.5">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              Project Description:
            </h3>
            <div className="space-y-4 text-[#454950]">
              <div className="font-public-sans whitespace-pre-line">
                {projectDescription}
              </div>
              {projectDetails.map((detail, index) => (
                <p
                  key={index}
                  className="font-inter text-sm leading-6 text-gray-700"
                >
                  {detail}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Updates */}
        <AccordionItem value="updates">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Update className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-base">Updates</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3">
            <div className="w-full mx-auto space-y-6 relative">
              {years.length > 0 && (
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="absolute top-0 right-0 gap-3 hover:rounded rounded border-2 max-h-6 px-3">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {filteredUpdates.length === 0 ? (
                <div className="p-4 flex items-center justify-center flex-col space-y-4 text-[#B7B9BB]">
                  <Update strokeWidth={1} className="w-10 h-10" />
                  <p className="font-semibold leading-6">
                    No Updates Available
                  </p>
                </div>
              ) : (
                filteredUpdates.map((update) => (
                  <div key={update.id} className="space-y-3">
                    <h3 className="font-semibold text-base text-[#454950]">
                      {update.month}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                      {/* Images */}
                      <div className="grid grid-cols-2 gap-3 col-span-2">
                        {update.images.slice(0, 2).map((img, i) => (
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
                        {update.images.length > 0 && (
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
                              className="px-0"
                            >
                              <DialogTitle className="px-4">
                                Gallery
                              </DialogTitle>
                              <DialogClose asChild>
                                <button className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition">
                                  <X size={18} className="text-black" />
                                </button>
                              </DialogClose>
                              <div className="px-4 max-h-[600px] overflow-y-auto h-full space-y-6 pb-2">
                                {update.images.map((img, i) => (
                                  <div
                                    key={i}
                                    className="relative w-full h-44 sm:h-52 md:h-60 rounded-xl overflow-hidden"
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
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Species */}
        <AccordionItem value="species">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Species className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-base">Species</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3 gap-4 grid grid-cols-1 sm:grid-cols-2 items-center">
            {projectSpecies.length === 0 ? (
              <div className="p-4 flex items-center justify-center flex-col space-y-4 text-[#B7B9BB]">
                <Species strokeWidth={1} className="w-10 h-10" />
                <p className="font-semibold leading-6">No Species Available</p>
              </div>
            ) : (
              projectSpecies.map((item) => (
                <Link
                  key={item.id}
                  href={`/species/${item.slug}`}
                  className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0"
                >
                  <div className="overflow-hidden w-full md:p-4 p-2">
                    <Image
                      src={item.image || "/images/placeholder-species.jpg"}
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
                      <CircleArrowRight
                        width={22}
                        height={22}
                        color="#003399"
                      />
                    </button>
                  </div>
                </Link>
              ))
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Donors */}
        <AccordionItem value="donors">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-inherit" />
              <span className="font-semibold text-base">Donors</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3 md:py-4">
            <DonorsTable />
          </AccordionContent>
        </AccordionItem>

        {/* Related Projects Section - Only shown in Overview */}
        {activeItem === "overview" && (
          <div className="mt-8">
            <RelatedProjects
              projects={relatedProjects}
              onPlantTree={onPlantTree}
              onViewAll={onViewAll}
            />
          </div>
        )}
      </Accordion>
    </div>
  );
};

export default ProjectAccordion;
