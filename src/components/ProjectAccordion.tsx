"use client";

import React from "react";
import { BarChart3, Clock, Leaf, Users } from "lucide-react";
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

interface ProjectAccordionProps {
  projectDescription: string;
  projectDetails: string[];
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

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
  projectDescription,
  projectDetails,
}) => {
  return (
    <div className="w-full md:hidden">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {/* Overview */}
        <AccordionItem value="overview">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-inherit" />
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
          </AccordionContent>
        </AccordionItem>

        {/* Updates */}
        <AccordionItem value="updates">
          <AccordionTrigger className="flex items-center justify-between py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-inherit" />
              <span className="font-semibold text-base">Updates</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="py-3">
            <div className="w-full mx-auto space-y-6 relative">
              <Select defaultValue="2025">
                <SelectTrigger className="absolute top-0 right-0 gap-3 hover:rounded border-2 max-h-6 px-3">
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
                          className="relative w-full h-40 md:h-48 lg:h-60 rounded-lg overflow-hidden"
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
                    <p className="text-xs text-[#454950] leading-[18px]">
                      {update.text}
                    </p>
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
              <Leaf className="w-5 h-5 text-inherit" />
              <span className="font-semibold text-base">Species</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-900">
              Tree Species
            </h3>
            <p className="text-sm text-gray-600">
              Information about tree species will be displayed here.
            </p>
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
          <AccordionContent className="px-4 py-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-900">
              Project Donors
            </h3>
            <p className="text-sm text-gray-600">
              Donor information and contributions will be displayed here.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectAccordion;
