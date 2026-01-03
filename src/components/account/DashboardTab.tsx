"use client";

import Image from "next/image";
import { stats } from "./mock-data";

export const DashboardTab = () => {
  return (
    <div className="pt-6 space-y-8">
      <p className="md:text-xl text-lg font-medium text-[#454950]">
        Track your environmental contribution
      </p>
      <div className="space-y-1">
        <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#B7B9BB] rounded-2xl px-8 py-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-[#454950]">{stat.label}</p>
                <Image src={stat.icon} alt="icon" width={28} height={28} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className="text-5xl font-bold leading-16"
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
