"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donations } from "./mock-data";
import DownloadCertificate from "@/components/DownloadCertiifcate";
import Image from "next/image";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PlantedTrees from "../PlantedTrees";
import { Donation } from "./types";

export const DonationsTab = () => {
  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(donations.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = donations.slice(startIndex, endIndex);
  const [selectedTree, setSelectedTree] = useState<Donation | null>(null);

  if (selectedTree) {
    return (
      <div className="pt-6">
        <PlantedTrees
          onBack={() => setSelectedTree(null)}
          donation={selectedTree}
        />
      </div>
    );
  }
  return (
    <div className="pt-6 space-y-4">
      <div className="grid gap-4 sm:gap-8 sm:grid-cols-2">
        {currentData.map((donation) => (
          <div
            key={donation.id}
            className="bg-white border border-[#E6E6E6] rounded-2xl"
          >
            <div className="flex items-center justify-between sm:px-6 px-3 py-4 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${donation.accent}1A` }}
                >
                  <Image
                    src={donation.logoSrc}
                    alt="Icon"
                    width={32}
                    height={32}
                  />
                </div>
                <p className="sm:text-2xl text-xl font-semibold text-[#111827] leading-5.5">
                  {donation.name}
                </p>
              </div>
              {donation.donationFor === "RECEIVED" ? (
                <Tooltip>
                  <TooltipTrigger>
                    <Badge
                      className="font-semibold text-base leading-6 border-0 items-center justify-center flex rounded-full px-3 py-1"
                      style={{
                        backgroundColor: `${donation.accent}1A`,
                        color: donation.accent,
                      }}
                    >
                      {donation.donationFor}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent
                    align={"end"}
                    className="bg-[#E7F8F0] px-4 py-3"
                  >
                    <p className="text-[#0D824B] text-xs md:font-semibold max-sm:max-w-36 text-center">
                      Gifted to you by Kalpit Chandekar
                    </p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Badge
                  className="font-semibold text-base leading-6 border-0 items-center justify-center flex rounded-full px-3 py-1"
                  style={{
                    backgroundColor: `${donation.accent}1A`,
                    color: donation.accent,
                  }}
                >
                  {donation.donationFor}
                </Badge>
              )}
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
                    <h1> Date</h1>

                    <p className="text-lg font-bold text-[#19212C]">
                      {donation.date}
                    </p>
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
                    <div className="flex gap-2 items-center">
                      <h2>Geo-Tagged</h2>
                      {donation.geoTagged === "true" ? (
                        <Image
                          src="/images/check.png"
                          alt="Icon"
                          width={17}
                          height={17}
                        />
                      ) : (
                        <Image
                          src="/images/warning.png"
                          alt="Icon"
                          width={17}
                          height={17}
                        />
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedTree(donation)}
                      className="text-lg border-b-2 border-[#003399] leading-6 font-bold text-[#003399]"
                    >
                      View Trees
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col items-center justify-between sm:gap-2 gap-4">
                <DownloadCertificate />
                <Button
                  variant="outline"
                  className="border-[#95AAD5] hover:text-[#003399] text-[#003399] font-bold text-base h-11 px-5 py-3 rounded-md sm:w-[50%] w-full gap-1"
                >
                  See Receipt
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination className="h-18 px-6 w-full">
        <PaginationContent className="w-full flex items-center justify-between">
          {/* Previous */}
          <PaginationItem className="border rounded-l-md">
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer hover:rounded-r-none"
              }
            />
          </PaginationItem>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </div>

          {/* Next */}
          <PaginationItem className="border rounded-r-md">
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer hover:rounded-l-none"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
