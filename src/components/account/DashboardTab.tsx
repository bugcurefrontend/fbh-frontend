"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { stats } from "./mock-data";
import { useAuth } from "@/lib/auth-context";
import { fetchUserDashboardStats } from "@/services/dashboard";

export const DashboardTab = () => {
  const [statsData, setStatsData] = useState(stats);
  const { userProfile, isAuthenticated } = useAuth();

  useEffect(() => {
    const loadStats = async () => {
      if (isAuthenticated && userProfile?.email) {
        try {
          const fetchedStats = await fetchUserDashboardStats(userProfile.email);
          if (fetchedStats) {
            setStatsData([
              {
                label: "CO2 Sequested",
                value: fetchedStats.co2_sequestered.toLocaleString(),
                suffix: "kg",
                icon: "/images/leaf2.png",
                accent: "#0D824B",
              },
              {
                label: "Total Trees Planted",
                value: fetchedStats.total_trees_planted.toLocaleString(),
                suffix: "trees",
                icon: "/images/tree2.png",
                accent: "#12B569",
              },
              {
                label: "Projects Supported",
                value: fetchedStats.projects_supported.toLocaleString(),
                suffix: "projects",
                icon: "/images/like.png",
                accent: "#F78F08",
              },
            ]);
          }
        } catch (error) {
          console.error("Failed to load dashboard stats:", error);
        }
      }
    };

    loadStats();
  }, [userProfile, isAuthenticated]);

  return (
    <div className="pt-6 md:space-y-8 space-y-5">
      <p className="md:text-xl font-medium md:text-[#454950]">
        Track your environmental contribution
      </p>
      <div className="space-y-1">
        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="bg-white max-sm:h-30 border border-[#B7B9BB] rounded-[16px] sm:px-8 sm:py-6 max-sm: p-4 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="max-sm:text-lg font-semibold sm:font-bold text-[#454950]">
                  {stat.label} {""}
                  {stat.label === "CO2 Sequested" && (
                    <span className="text-red-500 md:hidden">*</span>
                  )}
                </p>
                <Image
                  src={stat.icon}
                  alt="icon"
                  width={28}
                  height={28}
                  className="max-sm:w-6 max-sm:h-6"
                />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-semibold sm:font-bold m:leading-16"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </span>
                <span className="text-base font-semibold text-gray-700">
                  {stat.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="md:pl-10 text-xs leading-5.5 font-medium text-[#19212C]">
          <span className="text-[#F04438]">* </span>These are only estimated
          values as per UN standards.
        </p>
      </div>
    </div>
  );
};
