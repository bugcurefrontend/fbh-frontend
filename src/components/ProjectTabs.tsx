"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { BarChart3, Clock, Leaf, Users } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProjectTabsProps {
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

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  projectDescription,
  projectDetails,
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
              <BarChart3 className="w-4 h-4" />
              <span className="font-bold text-base">Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Clock className="w-4 h-4" />
              <span className="font-bold text-base">Updates</span>
            </TabsTrigger>
            <TabsTrigger
              value="species"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Leaf className="w-4 h-4" />
              <span className="font-bold text-base">Species</span>
            </TabsTrigger>
            <TabsTrigger
              value="donors"
              className="flex items-center gap-2 px-4 py-4 border-b-2 border-transparent bg-transparent text-gray-600 hover:text-[#003399] rounded-none data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent"
            >
              <Users className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="updates" className="mt-6 space-y-4">
          <div className="w-full container mx-auto px-4 md:px-6 py-6 space-y-10 relative">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-4 col-span-2">
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
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {update.text}
                  </p>
                </div>
              </div>
            ))}
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
