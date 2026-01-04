"use client";
import React from "react";
import Image from "next/image";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";
import EndangeredSpeciesIcon from "./icons/EndangeredSpeciesIcon";
import Co2OffsetIcon from "./icons/Co2OffsetIcon";
import StatesProjectsIcon from "./icons/StatesProjectsIcon";
import LakesRestoredIcon from "./icons/LakesRestoredIcon";
import { MetricSimplified } from "@/types/metric";
import PlantingSites from "./icons/PlantingSites";
import VolunteerEngaged from "./icons/VolunteersEngaged";
import PartnerOrganization from "./icons/PartnerOrganization";

interface StatisticsSectionProps {
  metrics?: MetricSimplified[];
  aboutStats?: {
    trees?: string;
    plantingSites?: string;
    volunteers?: string;
    partners?: string;
  };
}

// Helper to format number with commas and + suffix
const formatNumber = (value: number): string => {
  return value.toLocaleString() + "+";
};

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  metrics: apiMetrics,
  aboutStats,
}) => {
  const fallbackTopRowStats = [
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

  const fallbackBottomRowStats = [
    {
      icon: <Co2OffsetIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <Co2OffsetIcon width={32} height={32} color="#206f32" />,
      number: "64,000+",
      label: (
        <>
          Tons of CO<sub>2</sub> Offset
        </>
      ),
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

  // Use API data if available (even 1), otherwise use fallback
  const hasApiData = apiMetrics && apiMetrics.length > 0;

  // Local typed shape for stats used in UI
  type StatItem = {
    icon: JSX.Element;
    mobileIcon: JSX.Element;
    number: string;
    label: string | JSX.Element;
    order?: number;
  };

  // Convert API metrics to display format and keep their order for layout
  const apiStatsFromApi: StatItem[] = hasApiData
    ? apiMetrics.map((m) => ({
        icon: <Image src={m.icon} alt={m.label} width={40} height={40} />,
        mobileIcon: <Image src={m.icon} alt={m.label} width={32} height={32} />,
        number: formatNumber(m.value),
        label: m.label,
        order: m.order ?? 0,
      }))
    : [];

  // Unified apiStats typed as StatItem[] (fallback cast to StatItem[])
  const apiStats: StatItem[] = hasApiData
    ? apiStatsFromApi
    : ([...fallbackTopRowStats, ...fallbackBottomRowStats] as StatItem[]);

  // If we have API data, sort by the `order` field so positions follow the CMS order.
  // Desktop layout: rows of 3 (first 3 = first row; next 3 = second row)
  // Mobile layout: rows of 2
  const orderedApiStats: StatItem[] = hasApiData
    ? apiStatsFromApi.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : apiStats;

  // If aboutStats provided, render a single row of 4 stats instead of the default layout
  const hasAboutStats =
    aboutStats &&
    (aboutStats.trees ||
      aboutStats.plantingSites ||
      aboutStats.volunteers ||
      aboutStats.partners);

  const aboutRowStats = hasAboutStats
    ? [
        {
          icon: <TreeSpeciesIcon width={36} height={36} color="#206f32" />,
          mobileIcon: (
            <TreeSpeciesIcon width={28} height={28} color="#206f32" />
          ),
          number: aboutStats?.trees || "-",
          label: "Trees planted",
        },
        {
          icon: <PlantingSites width={40} height={40} color="#206f32" />,
          mobileIcon: <PlantingSites width={32} height={32} color="#206f32" />,
          number: aboutStats?.plantingSites || "-",
          label: "Planting sites",
        },
        {
          icon: <VolunteerEngaged width={36} height={40} color="#206f32" />,
          mobileIcon: (
            <VolunteerEngaged width={28} height={32} color="#206f32" />
          ),
          number: aboutStats?.volunteers || "-",
          label: "Volunteers",
        },
        {
          icon: <PartnerOrganization width={40} height={40} color="#206f32" />,
          mobileIcon: (
            <PartnerOrganization width={32} height={32} color="#206f32" />
          ),
          number: aboutStats?.partners || "-",
          label: "Partner organisations",
        },
      ]
    : [];

  // Split into top and bottom rows using the ordered metrics
  // Desktop: first 3 -> first row, next 3 -> second row
  const topRowStats = orderedApiStats.slice(0, 3);
  const bottomRowStats = orderedApiStats.slice(3, 6);

  return (
    <div className="px-4 max-w-7xl md:px-14 mx-auto mb-6 md:mb-4">
      <div className="border border-[#E4E4E4] rounded-[8px] relative -top-4.5 sm:top-[-48px] z-10 bg-white sm:rounded-[16px] shadow-[0_12px_24px_-4px_rgba(133,133,133,0.12)] p-5 sm:p-8 flex flex-col gap-8 sm:gap-16 sm:mx-auto sm:max-w-[1400px]">
        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-col gap-14">
          {hasAboutStats ? (
            <div className="flex justify-between items-center">
              {aboutRowStats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center gap-5 w-[25%]">
                    <div className="w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <p className="text-4xl font-semibold text-black sm:text-[40px]">
                      {stat.number}
                    </p>
                    <p className="md:text-base md:font-normal md:leading-6 md:text-center md:align-middle md:text-[#454950] text-base text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                  {idx < aboutRowStats.length - 1 && (
                    <div className="h-[152px] w-[0.5px] bg-[#D1D5DB]"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <>
              {topRowStats.length > 0 && (
                <div className="flex justify-around items-center">
                  {topRowStats.map((stat, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center text-center gap-5 w-[33.33%]">
                        <div className="w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center">
                          {stat.icon}
                        </div>
                        <p className="text-4xl font-semibold text-black sm:text-[40px]">
                          {stat.number}
                        </p>
                        <p className="md:text-base md:font-normal md:leading-6 md:text-center md:align-middle md:text-[#454950] text-base text-gray-500">
                          {stat.label}
                        </p>
                      </div>
                      {idx < topRowStats.length - 1 && (
                        <div className="h-[152px] w-[0.5px] bg-[#D1D5DB]"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {bottomRowStats.length > 0 && (
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
                        <p className="md:text-base md:font-normal md:leading-6 md:text-center md:align-middle md:text-[#454950] text-base text-gray-500">
                          {stat.label}
                        </p>
                      </div>
                      {idx < bottomRowStats.length - 1 && (
                        <div className="h-[152px] w-[0.5px] bg-[#D1D5DB]"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Layout - Dynamic rows of 2 items each (aboutStats overrides) */}
        <div className="flex flex-col sm:hidden gap-12">
          {hasAboutStats
            ? Array.from({ length: 2 }).map((_, rowIdx) => {
                const leftItem = aboutRowStats[rowIdx * 2];
                const rightItem = aboutRowStats[rowIdx * 2 + 1];
                return (
                  <div
                    key={rowIdx}
                    className="flex justify-between items-center gap-4"
                  >
                    {leftItem && (
                      <div className="flex flex-col items-center gap-3 text-center flex-1">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {leftItem.mobileIcon}
                        </div>
                        <p className="text-lg text-[#090C0F] font-bold">
                          {leftItem.number}
                        </p>
                        <p className="text-[10px] max-[500px]:w-20 font-semibold text-[#454950]">
                          {leftItem.label}
                        </p>
                      </div>
                    )}
                    {leftItem && rightItem && (
                      <div className="h-[96px] w-[0.5px] bg-[#D1D5DB] rounded" />
                    )}
                    {rightItem && (
                      <div className="flex flex-col items-center gap-3 text-center flex-1">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {rightItem.mobileIcon}
                        </div>
                        <p className="text-lg text-[#090C0F] font-bold">
                          {rightItem.number}
                        </p>
                        <p className="text-[10px] max-[500px]:w-26 font-semibold text-[#454950]">
                          {rightItem.label}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            : Array.from({ length: Math.ceil(apiStats.length / 2) }).map(
                (_, rowIdx) => {
                  const leftItem = apiStats[rowIdx * 2];
                  const rightItem = apiStats[rowIdx * 2 + 1];
                  return (
                    <div
                      key={rowIdx}
                      className="flex justify-between items-center gap-4"
                    >
                      {leftItem && (
                        <div className="flex flex-col items-center gap-3 text-center flex-1">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {leftItem.mobileIcon}
                          </div>
                          <p className="text-lg text-[#090C0F] font-bold">
                            {leftItem.number}
                          </p>
                          <p className="text-[10px] max-[500px]:w-20 font-semibold text-[#454950]">
                            {leftItem.label}
                          </p>
                        </div>
                      )}
                      {leftItem && rightItem && (
                        <div className="h-[96px] w-[0.5px] bg-[#D1D5DB] rounded"></div>
                      )}
                      {rightItem && (
                        <div className="flex flex-col items-center gap-3 text-center flex-1">
                          <div className="w-8 h-8 flex items-center justify-center">
                            {rightItem.mobileIcon}
                          </div>
                          <p className="text-lg text-[#090C0F] font-bold">
                            {rightItem.number}
                          </p>
                          <p className="text-[10px] max-[500px]:w-26 font-semibold text-[#454950]">
                            {rightItem.label}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
