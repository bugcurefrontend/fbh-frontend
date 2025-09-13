"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { BarChart3, Clock, Leaf, Users } from "lucide-react";

interface ProjectTabsProps {
  projectDescription: string;
  projectDetails: string[];
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  projectDescription,
  projectDetails,
}) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-gray-200">
          <TabsList className="flex bg-transparent p-0 h-auto w-full justify-start">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] bg-transparent text-gray-600 hover:text-[#003399] rounded-none relative"
            >
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-bold text-base">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] bg-transparent text-gray-600 hover:text-[#003399] rounded-none"
            >
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-bold text-base">Updates</span>
            </TabsTrigger>
            <TabsTrigger
              value="species"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] bg-transparent text-gray-600 hover:text-[#003399] rounded-none"
            >
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-base">Species</span>
            </TabsTrigger>
            <TabsTrigger
              value="donors"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] bg-transparent text-gray-600 hover:text-[#003399] rounded-none"
            >
              <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-bold text-base">Donors</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-public-sans">
              Project Description:
            </h3>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-6 font-public-sans">{projectDescription}</p>
              {projectDetails.map((detail, index) => (
                <p key={index} className="text-lg leading-6 font-inter">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="updates" className="mt-8">
          <div className="text-center py-12">
            <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Project Updates
            </h3>
            <p className="text-gray-500">
              Updates and progress reports will be displayed here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="species" className="mt-8">
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tree Species
            </h3>
            <p className="text-gray-500">
              Information about tree species will be displayed here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="donors" className="mt-8">
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Project Donors
            </h3>
            <p className="text-gray-500">
              Donor information and contributions will be displayed here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTabs;