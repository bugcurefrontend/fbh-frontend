"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation, Trees } from "lucide-react";
import { useState } from "react";
import { donations } from "./mock-data";
import { Donation } from "./types";
import { TreeUpdate } from "./TreeUpdate";

export const TreesTab = () => {
  const [selectedTree, setSelectedTree] = useState<Donation | null>(null);

  if (selectedTree) {
    return (
      <div className="pt-6 space-y-4">
        <TreeUpdate tree={selectedTree} onBack={() => setSelectedTree(null)} />
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-4">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="min-h-[360px] h-full w-full relative overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.9814570275257!2d78.21631687473341!3d17.1752898088815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbc68ae81e7a79%3A0x3e82438832073e9d!2sKanha%20Shanti%20Vanam!5e1!3m2!1sen!2sin!4v1765172898898!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="rounded-lg border-0 min-h-[360px] h-full"
              allowFullScreen
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {donations.slice(0, 2).map((donation) => (
            <div
              key={donation.id}
              className="bg-white border border-[#E6E6E6] rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedTree(donation)}
            >
              <div className="flex items-center gap-2.5 sm:px-6 px-3 py-4 border-b border-[#E5E7EB]">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${donation.accent}1A` }}
                >
                  <Trees
                    className="w-5 h-5"
                    style={{ color: donation.accent }}
                  />
                </div>
                <p className="sm:text-2xl text-xl font-semibold text-[#111827] leading-5.5">
                  {donation.name}
                </p>
              </div>

              <div className="sm:p-6 p-3 space-y-6">
                <div className="flex gap-3 justify-between items-center font-semibold text-[#94979A]">
                  <div className="space-y-4 w-fit">
                    <div className="sm:space-y-2">
                      <h1>Planted On:</h1>

                      <p className="text-lg font-bold text-[#19212C]">
                        {donation.date}
                      </p>
                    </div>
                    <div className="sm:space-y-2">
                      <h1>Project Name:</h1>

                      <p className="text-lg font-bold text-[#19212C]">
                        {donation.location}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 w-fit">
                    <div className="sm:space-y-2">
                      <h1>Tree Code:</h1>
                      <p className="text-lg font-bold text-[#19212C]">
                        {donation.reference}
                      </p>
                    </div>
                    <div className="sm:space-y-2">
                      <h1>Status:</h1>
                      <Badge
                        className="text-[10px] font-semibold border-0 items-center justify-center flex rounded-full w-16 h-8"
                        style={{
                          backgroundColor: `${donation.statusAccent}1A`,
                          color: donation.statusAccent,
                        }}
                      >
                        {donation.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <Button className="bg-[#003399] hover:bg-[#062d7b] text-white font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1">
                    <span className="max-md:hidden">Get</span>
                    Direction
                    <Navigation className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#003399] text-[#003399] font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1"
                  >
                    <span className="max-md:hidden">View</span>
                    Update
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
