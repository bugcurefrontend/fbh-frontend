"use client";
import React from "react";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";
import EndangeredSpeciesIcon from "./icons/EndangeredSpeciesIcon";
import Co2OffsetIcon from "./icons/Co2OffsetIcon";
import StatesProjectsIcon from "./icons/StatesProjectsIcon";
import LakesRestoredIcon from "./icons/LakesRestoredIcon";

const StatisticsSection: React.FC = () => {
  const topRowStats = [
    {
      icon: <LandscapeIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <LandscapeIcon width={32} height={32} color="#206f32" />,
      number: "10,000+",
      label: "Acres Afforested",
    },
    {
      icon: <TreeSpeciesIcon width={36} height={36} color="#206f32" />,
      mobileIcon: <TreeSpeciesIcon width={28} height={28} color="#206f32" />,
      number: "330+",
      label: "Native Tree Species Planted",
    },
    {
      icon: <EndangeredSpeciesIcon width={36} height={36} color="#206f32" />,
      mobileIcon: (
        <EndangeredSpeciesIcon width={28} height={28} color="#206f32" />
      ),
      number: "80+",
      label: "Endangered Species Curated",
    },
  ];

  const bottomRowStats = [
    {
      icon: <Co2OffsetIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <Co2OffsetIcon width={32} height={32} color="#206f32" />,
      number: "64,000+",
      label: "Tons of CO2 Offset",
    },
    {
      icon: <StatesProjectsIcon width={36} height={40} color="#206f32" />,
      mobileIcon: <StatesProjectsIcon width={28} height={32} color="#206f32" />,
      number: "12+",
      label: "States with Implemented Projects",
    },
    {
      icon: <LakesRestoredIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <LakesRestoredIcon width={32} height={32} color="#206f32" />,
      number: "35+",
      label: "Lakes Created and Restored",
    },
  ];

  return (
    <div className="relative -top-12 sm:top-[-48px] z-10 bg-white rounded-xl sm:rounded-[16px] shadow-[0_8px_32px_rgba(133,133,133,0.1)] p-5 sm:p-8 flex flex-col gap-8 sm:gap-16">
      {/* Desktop Layout */}
      <div className="hidden sm:flex flex-col gap-14">
        <div className="flex justify-around items-center">
          {topRowStats.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center text-center gap-4 w-[33.33%]">
                <div className="w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <p className="text-4xl font-semibold text-black sm:text-[40px]">
                  {stat.number}
                </p>
                <p className="text-base text-gray-500">{stat.label}</p>
              </div>
              {idx < topRowStats.length - 1 && (
                <div className="h-[97px] w-[0.5px] bg-[#D1D5DB]"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-around items-center">
          {bottomRowStats.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center text-center gap-4 w-[33.33%]">
                <div className="w-10 h-10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <p className="text-4xl font-semibold text-black sm:text-[40px]">
                  {stat.number}
                </p>
                <p className="text-base text-gray-500">{stat.label}</p>
              </div>
              {idx < bottomRowStats.length - 1 && (
                <div className="h-[97px] w-[0.5px] bg-[#D1D5DB]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden gap-8">
        {/* Row 1 */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="w-8 h-8 flex items-center justify-center">
              {topRowStats[0].mobileIcon}
            </div>
            <p className="text-2xl font-bold">{topRowStats[0].number}</p>
            <p className="text-xs te font-semiboldxt-gray-500">
              {topRowStats[0].label}
            </p>
          </div>
          <div className="h-[80px] w-[1px] bg-gray-300"></div>
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="w-7 h-7 flex items-center justify-center">
              {topRowStats[1].mobileIcon}
            </div>
            <p className="text-2xl font-bold">{topRowStats[1].number}</p>
            <p className="text-xs te font-semiboldxt-gray-500">
              {topRowStats[1].label}
            </p>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="w-7 h-7 flex items-center justify-center">
              {topRowStats[2].mobileIcon}
            </div>
            <p className="text-2xl font-bold">{topRowStats[2].number}</p>
            <p className="text-xs te font-semiboldxt-gray-500">
              {topRowStats[2].label}
            </p>
          </div>
          <div className="h-[80px] w-[1px] bg-gray-300"></div>
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="w-8 h-8 flex items-center justify-center">
              {bottomRowStats[0].mobileIcon}
            </div>
            <p className="text-2xl font-bold">{bottomRowStats[0].number}</p>
            <p className="text-xs font-semibold text-gray-500">
              {bottomRowStats[0].label}
            </p>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="w-7 h-8 flex items-center justify-center">
              {bottomRowStats[1].mobileIcon}
            </div>
            <p className="text-2xl font-bold">{bottomRowStats[1].number}</p>
            <p className="text-xs font-semibold text-gray-500">
              {bottomRowStats[1].label}
            </p>
          </div>
          <div className="h-[80px] w-[1px] bg-gray-300"></div>
          <div className="flex flex-col items-center gap-3 text-center flex-1">
            <div className="w-8 h-8 flex items-center justify-center">
              {bottomRowStats[2].mobileIcon}
            </div>
            <p className="text-2xl font-bold">{bottomRowStats[2].number}</p>
            <p className="text-xs font-semibold text-gray-500">
              {bottomRowStats[2].label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
