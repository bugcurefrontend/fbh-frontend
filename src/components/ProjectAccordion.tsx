"use client";

import React from "react";
import { BarChart3, Clock, Leaf, Users } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

interface ProjectAccordionProps {
  projectDescription: string;
  projectDetails: string[];
}

const ProjectAccordion: React.FC<ProjectAccordionProps> = ({
  projectDescription,
  projectDetails,
}) => {
  return (
    <div className="w-full md:hidden">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {/* Overview */}
        <AccordionItem value="overview">
          <AccordionTrigger className="flex items-center justify-between px-4 py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-inherit" />
              <span className="font-semibold text-base">Overview</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 space-y-4">
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
          <AccordionTrigger className="flex items-center justify-between px-4 py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-inherit" />
              <span className="font-semibold text-base">Updates</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 space-y-2">
            <h3 className="text-base font-semibold text-gray-900">
              Project Updates
            </h3>
            <p className="text-sm text-gray-600">
              Updates and progress reports will be displayed here.
            </p>
          </AccordionContent>
        </AccordionItem>

        {/* Species */}
        <AccordionItem value="species">
          <AccordionTrigger className="flex items-center justify-between px-4 py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
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
          <AccordionTrigger className="flex items-center justify-between px-4 py-3 font-medium text-[#454950] data-[state=open]:text-[#003399]">
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
