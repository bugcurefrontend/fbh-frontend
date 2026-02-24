"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donations } from "./mock-data";
import DownloadCertificate from "@/components/DownloadCertificate";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchDonationHistory, DonationHistoryItem } from "@/services/donations";
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
import { Donation, DonationCard } from "./types";
import { useAuth } from "@/lib/auth-context";

interface DonationsTabProps {
  allDonationsData: DonationCard[];
  totalItems: number;
  loading: boolean;
  error?: string | null;
}

export const DonationsTab = ({
  allDonationsData = [],
  totalItems = 0,
  loading = false,
  error = null
}: DonationsTabProps) => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTree, setSelectedTree] = useState<Donation | null>(null);

  // Client-side pagination: Calculate pages and slice data
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = allDonationsData.slice(startIndex, endIndex);

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
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500 font-medium italic">
            Loading your donations...
          </div>
        ) : error ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-red-600 font-medium mb-2">Error Loading Donations</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        ) : currentData.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 font-medium italic">
            No donations found in your history.
          </div>
        ) : (
          currentData.map((donation) => (
            <div
              key={donation.id}
              className="bg-white border border-[#E6E6E6] rounded-2xl"
            >
              <div className="flex items-center justify-between sm:px-6 px-3 py-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${donation.accent}1A` }}
                  >
                    <Image
                      src={donation.logoSrc}
                      alt="Icon"
                      width={32}
                      height={32}
                      className="max-sm:w-6"
                    />
                  </div>
                  <p className="sm:text-2xl text-lg font-semibold text-[#111827] leading-5.5">
                    {donation.name}
                  </p>
                </div>
                {donation.donationFor === "RECEIVED" ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        className="font-semibold max-sm:h-6 text-sm sm:text-base leading-6 border-0 items-center justify-center flex rounded-[16px] sm:rounded-full px-3 py-1"
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
                        Gifted to you by {donation.giftedBy?.donor_name || "a donor"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Badge
                    className="font-semibold max-sm:h-6 text-sm sm:text-base leading-6 border-0 items-center justify-center flex rounded-[16px] sm:rounded-full px-3 py-1"
                    style={{
                      backgroundColor: `${donation.accent}1A`,
                      color: donation.accent,
                    }}
                  >
                    {donation.donationFor}
                  </Badge>
                )}
              </div>

              <div className="sm:p-6 p-4 space-y-6">
                <div className="max-sm:text-sm flex gap-4 sm:gap-3 justify-between items-center font-semibold text-[#94979A]">
                  <div className="space-y-4 w-fit">
                    <div className="space-y-2">
                      <h1>Reference No.</h1>
                      <p className="sm:text-lg font-bold text-[#19212C]">
                        {donation.reference}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h1> Date</h1>

                      <p className="sm:text-lg font-bold text-[#19212C]">
                        {donation.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 w-fit">
                    <div className="space-y-2">
                      <h1>Trees Planted</h1>
                      <p className="sm:text-lg font-bold text-[#19212C]">
                        {donation.trees}
                      </p>
                    </div>

                    <div className="space-y-2">
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
                        className="sm:text-lg border-b-2 border-[#003399] leading-6 font-bold text-[#003399]"
                      >
                        View Trees
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col items-center justify-between sm:gap-2 gap-4">
                  <DownloadCertificate
                    recipientName={donation.recipientName}
                    treesPlanted={donation.trees}
                    certificateUrl={donation.certificateUrl}
                  />
                  <Button
                    variant="outline"
                    onClick={() => donation.receiptUrl ? window.open(donation.receiptUrl, '_blank') : alert("Receipt not available.")}
                    className="border-[#95AAD5] hover:text-[#003399] text-[#003399] font-bold text-base h-11 px-5 py-3 rounded-[8px] sm:w-[50%] w-full gap-1"
                  >
                    See Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
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
