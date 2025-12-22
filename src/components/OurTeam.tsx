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

const teamData = [
  {
    value: "leadership",
    title: "Leadership Team",
    members: [
      {
        id: "lt-1",
        name: "Dr Sairam Reddy Palicherla",
        role: "Co-Founder, Heartfulness Movement",
        image: "/images/sangeeth.png",
        linkedin: "#",
        description1:
          "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India. Post his superannuation, he moved to Kanha Shanti Vanam and as a key member of the greening team he now holds the position of Director, Forests by Heartfulness.",
        description2:
          " He specializes in both ex-situ and in-situ conservation of red-listed species and has successfully created a swathe of rain-forest in the inhospitable soil conditions and dry / torrid climate of Ranga Reddy District of Telangana.",
      },
      {
        id: "lt-2",
        name: "Dr Sairam Reddy Palicherla",
        role: "Co-Founder, Heartfulness Movement",
        image: "/images/sangeeth.png",
        linkedin: "#",
        description1:
          "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India. Post his superannuation, he moved to Kanha Shanti Vanam and as a key member of the greening team he now holds the position of Director, Forests by Heartfulness.",
        description2:
          " He specializes in both ex-situ and in-situ conservation of red-listed species and has successfully created a swathe of rain-forest in the inhospitable soil conditions and dry / torrid climate of Ranga Reddy District of Telangana.",
      },
    ],
  },
  {
    value: "delivery",
    title: "Delivery Team",
    members: [
      {
        id: "dt-1",
        name: "Delivery Member Name",
        role: "Project Lead",
        image: "/images/sangeeth.png",
        linkedin: "#",
        description1:
          "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India. Post his superannuation, he moved to Kanha Shanti Vanam and as a key member of the greening team he now holds the position of Director, Forests by Heartfulness.",
        description2:
          " He specializes in both ex-situ and in-situ conservation of red-listed species and has successfully created a swathe of rain-forest in the inhospitable soil conditions and dry / torrid climate of Ranga Reddy District of Telangana.",
      },
    ],
  },
  {
    value: "experts",
    title: "Domain Experts",
    members: [
      {
        id: "de-1",
        name: "Domain Expert Name",
        role: "Ecology Specialist",
        image: "/images/sangeeth.png",
        linkedin: "#",
        description1:
          "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India. Post his superannuation, he moved to Kanha Shanti Vanam and as a key member of the greening team he now holds the position of Director, Forests by Heartfulness.",
        description2:
          " He specializes in both ex-situ and in-situ conservation of red-listed species and has successfully created a swathe of rain-forest in the inhospitable soil conditions and dry / torrid climate of Ranga Reddy District of Telangana.",
      },
    ],
  },
];

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState(teamData[0].value);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* Mobile Select */}
      <div className="md:hidden mb-6">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full h-12 hover:rounded-md border-[#95AAD5] rounded-md text-[#003399] font-bold">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent className="rounded-md hover:rounded-md">
            {teamData.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:flex justify-center mb-6">
        <TabsList className="bg-[#E6EBF580] rounded-[8px] h-18 px-3 gap-4">
          {teamData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-3 rounded-[8px] text-xl [state=active]:text-font-bold data-[state=active]:bg-[#003399] data-[state=active]:text-white text-[#454950] font-semibold"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Content */}
      {teamData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className="space-y-8 md:space-y-16">
            {tab.members.map((member, index) => (
              <div
                key={member.id}
                className={`flex flex-col md:flex-row justify-center md:gap-8 gap-6 items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={343}
                  height={400}
                  className="object-cover rounded-xl md:max-w-[300px] md:min-w-[300px] max-sm:max-h-[343px] "
                />

                {/* Content */}
                <div className="space-y-4.5 md:p-4">
                  <div className="flex items-center gap-4">
                    <div className="border-r border-[#B7B9BB] pr-4 sm:space-y-2 space-y-1">
                      <h3 className="font-[Playfair_Display] sm:text-xl font-bold sm:leading-7.5 text-[#090C0F]">
                        {member.name}
                      </h3>
                      <p className="max-sm:text-sm sm:leading-6 text-[#94979A]">
                        {member.role}
                      </p>
                    </div>
                    <a href={member.linkedin} target="_blank">
                      <Image
                        src="/images/linkedin.png"
                        alt="LinkedIn"
                        width={32}
                        height={32}
                      />
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
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TeamSection;
