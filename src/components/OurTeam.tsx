"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import LinkedInIcon from "./icons/LinkedinLogo";
import { TeamMemberSimplified } from "@/types/team";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
  description1: string;
  description2: string;
}

interface TeamTab {
  value: string;
  title: string;
  members: TeamMember[];
}

interface TeamSectionProps {
  teams: TeamMemberSimplified[];
}

const TeamSection = ({ teams }: TeamSectionProps) => {
  const [activeTab, setActiveTab] = useState("leadership");

  // Transform teams data by category
  const leadershipMembers = teams
    .filter((m) => m.category === "Leadership Team")
    .map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      image: m.image,
      linkedin: m.linkedin,
      description1: m.description,
      description2: "", // Keep for future use
    }));

  const deliveryMembers = teams
    .filter((m) => m.category === "Delivery Team")
    .map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      image: m.image,
      linkedin: m.linkedin,
      description1: m.description,
      description2: "",
    }));

  const expertMembers = teams
    .filter((m) => m.category === "Domain Experts")
    .map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      image: m.image,
      linkedin: m.linkedin,
      description1: m.description,
      description2: "",
    }));

  const teamData: TeamTab[] = [
    {
      value: "leadership",
      title: "Leadership Team",
      members: leadershipMembers,
    },
    { value: "delivery", title: "Delivery Team", members: deliveryMembers },
    { value: "experts", title: "Domain Experts", members: expertMembers },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* Mobile Select */}
      <div className="sm:hidden mb-6">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full min-h-12 hover:rounded-[8px] border-[#95AAD5] rounded-[8px] text-[#003399] font-bold">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent className="rounded-[8px] hover:rounded-[8px]">
            {teamData.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block w-fit mx-auto">
        <TabsList className="flex bg-transparent p-0 h-auto w-full justify-start">
          {teamData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center px-5 py-4 border-b-[2px] bg-transparent border-[#B7B9BB] text-[#63676C] hover:text-[#003399] rounded-none relative data-[state=active]:border-[#003399] data-[state=active]:text-[#003399] data-[state=active]:bg-transparent font-bold text-base"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Content */}
      {teamData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="sm:pt-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tab.members.map((member) => (
              <div
                key={member.id}
                className="rounded-[16px] overflow-hidden bg-white shadow-sm cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-[343px] sm:h-[412px] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />

                  {/* Blue Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-[#00246B] px-4 sm:px-6 pt-4 pb-4 sm:pb-6">
                    <div className="flex max-sm:items-center justify-between md:flex-col gap-4.5">
                      <div className="max-sm:border-r border-[#E5EBF5] w-full sm:space-y-1">
                        <h3 className="text-white tracking-wider font-[Playfair_Display] leading-6 truncate text-lg sm:text-xl">
                          {member.name}
                        </h3>
                        <p className="text-[#E4E4E4E5]/90 leading-6 font-light truncate max-sm:text-sm">
                          {member.role}
                        </p>
                      </div>

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 relative z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LinkedInIcon className="max-sm:h-8 max-sm:w-8" />
                      </a>
                    </div>
                    <Image
                      src="images/teamBg.svg"
                      alt="svg"
                      width={150}
                      height={110}
                      className="absolute bottom-0 left-0"
                    />
                    <Image
                      src="images/teamBg1.svg"
                      alt="svg"
                      width={150}
                      height={110}
                      className="absolute right-0 bottom-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TeamSection;
