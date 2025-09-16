"use client";
import React from "react";
import Image from "next/image";
import LocationPinIcon from "./icons/LocationPinIcon";

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      name: "K & S Associate",
      location: "Indore",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=forest",
      badges: ["100+ planted", "Reforestation"],
    },
    {
      name: "Green Valley Initiative",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=200&fit=crop",
      badges: ["250+ planted", "Conservation"],
    },
    {
      name: "Urban Forest Project",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
      badges: ["500+ planted", "Urban Forestry"],
    },
    {
      name: "Coastal Restoration",
      location: "Goa",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
      badges: ["150+ planted", "Coastal Care"],
    },
    {
      name: "Hill Station Revival",
      location: "Shimla",
      image:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=200&fit=crop",
      badges: ["300+ planted", "Mountain Forest"],
    },
    {
      name: "Desert Greening",
      location: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400&h=200&fit=crop",
      badges: ["80+ planted", "Desert Recovery"],
    },
  ];

  return (
    <section className="mt-16 md:mx-8">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Projects
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
          View All
        </button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-sm overflow-hidden border border-gray-200 flex flex-col"
          >
            <div className="relative h-52">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover rounded-t-md"
              />
              <div className="absolute top-4 left-4 flex gap-3">
                {project.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-black truncate md:font-bold md:text-lg md:leading-[26px] md:align-middle md:text-[#090C0F]">
                  {project.name}
                </p>
                <div className="flex items-center gap-2">
                  <LocationPinIcon width={13} height={16} color="#19212c" />
                  <span className="text-base font-semibold text-black md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#19212C]">
                    {project.location}
                  </span>
                </div>
              </div>
              <button className="bg-[#003399] text-white font-bold text-base py-3 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center md:w-[352px] md:h-12 md:gap-2 md:rounded-lg md:py-[11px] md:px-[22px] md:font-bold md:text-base md:leading-[26px] md:text-[#FFFFFF] md:bg-[#003399]">
                PLANT A TREE
                <Image
                  src="/images/donate.png"
                  alt="donate"
                  width={24}
                  height={24}
                  className=""
                />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden overflow-x-auto scrollbar-none">
        <div className="flex gap-4 pb-2 w-max">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[314px] max-w-[314px] border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden"
            >
              <div className="relative h-52">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover rounded-t-md"
                />
                <div className="absolute top-4 left-4 flex gap-1">
                  {project.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="bg-[#33533E8C] backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#FFFFFF]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-2 py-3 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg text-black truncate md:font-bold md:text-lg md:leading-[26px] md:align-middle md:text-[#090C0F]">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <LocationPinIcon width={13} height={16} color="#19212c" />
                    <span className="text-base font-semibold text-black md:text-base md:font-semibold md:leading-6 md:align-middle md:text-[#19212C]">
                      {project.location}
                    </span>
                  </div>
                </div>
                <button className="bg-[#003399] text-white font-bold text-base py-2 rounded-[8px] w-full hover:bg-[#002080] gap-2 flex items-center justify-center md:font-bold md:text-base md:leading-[26px] md:text-[#FFFFFF]">
                  PLANT A TREE
                  <Image
                    src="/images/donate.png"
                    alt="donate"
                    width={24}
                    height={24}
                    className=""
                  />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
