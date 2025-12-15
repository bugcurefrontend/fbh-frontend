"use client";

import { stats } from "./mock-data";

export const DashboardTab = () => {
  return (
    <div className="pt-6 space-y-8">
      <p className="md:text-xl text-lg font-medium text-[#454950]">
        Track your environmental contribution
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#B7B9BB] rounded-2xl px-8 py-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-[#454950]">{stat.label}</p>
              <div>{stat.icon}</div>
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
    </div>
  );
};
