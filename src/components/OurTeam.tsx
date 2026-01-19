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
    { value: "leadership", title: "Leadership Team", members: leadershipMembers },
    { value: "delivery", title: "Delivery Team", members: deliveryMembers },
    { value: "experts", title: "Domain Experts", members: expertMembers },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* Mobile Select */}
      <div className="md:hidden mb-6">
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
      <div className="hidden md:block w-fit mx-auto">
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
        <TabsContent key={tab.value} value={tab.value} className="md:pt-6">
          <div className="space-y-8 md:hidden">
            {tab.members.map((member, index) => (
              <div
                key={member.id}
                className={`flex flex-col md:flex-row justify-center md:gap-8 gap-6 items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={343}
                  height={400}
                  className="object-cover md:rounded-[16px] rounded-[8px] md:max-w-[300px] md:min-w-[300px] max-sm:max-h-[343px] "
                />

                {/* Content */}
                <div className="space-y-4.5 md:p-4">
                  <div className="flex items-center gap-4">
                    <div className="max-[400px]:w-full border-r border-[#B7B9BB] pr-4 sm:space-y-2 space-y-1">
                      <h3 className="font-[Playfair_Display] sm:text-xl text-lg font-bold sm:leading-7.5 text-[#090C0F]">
                        {member.name}
                      </h3>
                      <p className="text-sm md:text-base sm:leading-6 text-[#94979A]">
                        {member.role}
                      </p>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[33.48px] h-8 relative z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LinkedInIcon fill="#003399" width={33.5} hanging={32} />
                    </a>
                  </div>
                  <div className="text-[#454950] leading-5.5 md:leading-6 text-sm md:text-base max-md:space-y-4">
                    <p>{member.description1}</p>
                    <p>{member.description2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:grid grid-cols-3 gap-8">
            {tab.members.map((member) => (
              <div
                key={member.id}
                className="rounded-[16px] overflow-hidden bg-white shadow-sm cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-[412px] w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />

                  {/* Blue Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-[#00246B] px-6 pt-4 pb-6">
                    <div className="flex flex-col gap-4.5">
                      <div>
                        <h3 className="text-white tracking-wider font-[Playfair_Display] leading-6">
                          {member.name}
                        </h3>
                        <p className="text-[#E4E4E4E5]/90 leading-6 font-light">
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
                        <LinkedInIcon />
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
