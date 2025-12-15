"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Trees } from "lucide-react";
import { donations } from "./mock-data";

export const DonationsTab = () => {
  return (
    <div className="pt-6 space-y-4">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white border border-[#E6E6E6] rounded-2xl"
          >
            <div className="flex items-center gap-2.5 sm:px-6 px-3 py-4 border-b border-[#E5E7EB]">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${donation.accent}1A` }}
              >
                <Trees className="w-5 h-5" style={{ color: donation.accent }} />
              </div>
              <p className="sm:text-2xl text-xl font-semibold text-[#111827] leading-5.5">
                {donation.name}
              </p>
            </div>

            <div className="sm:p-6 p-3 space-y-6">
              <div className="flex gap-3 justify-between items-center font-semibold text-[#94979A]">
                <div className="space-y-4 w-fit">
                  <div className="sm:space-y-2">
                    <h1>Reference No.</h1>
                    <p className="text-lg font-bold text-[#19212C]">
                      {donation.reference}
                    </p>
                  </div>
                  <div className="sm:space-y-2">
                    <h1> Donation For</h1>
                    <Badge
                      className="text-[10px] font-semibold border-0 items-center justify-center flex rounded-full w-16 h-8"
                      style={{
                        backgroundColor: `${donation.accent}1A`,
                        color: donation.accent,
                      }}
                    >
                      {donation.donationFor}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 w-fit">
                  <div className="sm:space-y-2">
                    <h1>Trees Planted</h1>
                    <p className="text-lg font-bold text-[#19212C]">
                      {donation.trees}
                    </p>
                  </div>

                  <div className="sm:space-y-2">
                    <h1> Date</h1>

                    <p className="text-lg font-bold text-[#19212C]">
                      {donation.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button className="bg-[#003399] hover:bg-[#062d7b] text-white font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1">
                  <Download className="w-4 h-4" />
                  <span className="max-md:hidden">Download</span>Certificate
                </Button>
                <Button
                  variant="outline"
                  className="border-[#003399] text-[#003399] font-semibold h-11 px-5 py-3 rounded-md w-[50%] gap-1"
                >
                  See Receipt
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
