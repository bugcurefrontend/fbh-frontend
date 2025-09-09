"use client";
import React from "react";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      date: "15 JAN",
      title: "Gym Facilities for practitioners",
      description:
        "Kanha Gym is equipped with world-class fitness facilities. Gym offers the options to workout pla…",
      image: "/images/gym-facilities.png",
    },
    {
      date: "15 JAN",
      title: "Kanha Sports Centre inaugurated",
      description:
        "An Kanha Sports Centre at Kanha Shanti Vanam, established by the Ministry of Sports, Khelo India, …",
      image: "/images/sports-centre.jpg",
    },
    {
      date: "15 JAN",
      title: "Talent Identification, Physical Literacy key to",
      description:
        "India's Chief National Badminton Coach Pullela Gopichand says…",
      image: "/images/badminton-coach.jpg",
    },
  ];

  return (
    <section className="relative">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black">
          FBG Activities
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase">
          View All
        </button>
      </div>

      {/* Activities Grid */}
      <div className="flex justify-center gap-5 flex-col md:flex-row mb-4">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden"
          >
            <Image
              src={activity.image}
              alt={activity.title}
              width={350}
              height={194}
              className="w-full"
            />
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-bold text-black">
                  {activity.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#333333]">
                {activity.title}
              </h3>
              <p className="text-sm font-normal text-gray-600">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="md:flex hidden justify-between items-center md:flex-row flex-col">
        <div className="flex w-full">
          <div className="w-full max-w-[48%] h-1 md:h-[4px] bg-[#003399] rounded-[2px]"></div>
          <div className="w-full max-w-[48%] h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px]"></div>
        </div>

        <div className="flex gap-2 md:gap-1">
          <div className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer">
            <ChevronLeft fontSize="small" />
          </div>
          <div className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer">
            <ChevronRight fontSize="small" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
