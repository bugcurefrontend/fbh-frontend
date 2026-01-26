"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donations } from "./mock-data";
import DownloadCertificate from "@/components/DownloadCertiifcate";
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
import { Donation } from "./types";
import { useAuth } from "@/lib/auth-context";

export const DonationsTab = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [allDonationsData, setAllDonationsData] = useState<any[]>([]); // Store ALL data
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false); // Track if data is loaded

  // Get logged-in user from auth context
  const { userProfile, isAuthenticated } = useAuth();

  // Fetch ALL donation data ONCE on mount (not on page change)
  useEffect(() => {
    // Skip if already loaded or not authenticated
    if (dataLoaded) return;

    const loadAllDonations = async () => {
      setLoading(true);

      // Only fetch if user is authenticated and has email
      if (!isAuthenticated || !userProfile?.email) {
        setAllDonationsData(donations); // Fallback to mock data
        setTotalItems(donations.length);
        setDataLoaded(true);
        setLoading(false);
        return;
      }

      try {
        // Fetch ALL data at once (backend returns everything anyway)
        const normalizedEmail = userProfile.email.toLowerCase();
        const response = await fetchDonationHistory(normalizedEmail, 1, 100); // Large page_size

        if (response && response.results) {
          // Map API response to component format
          const mapped = response.results.map((item: DonationHistoryItem) => ({
            id: item.donation_id,
            geoTagged: item.is_geotagged ? "true" : "false",
            logoSrc: item.dep_type === "PROJECT" ? "/images/treelogo.png" :
              item.dep_type === "SPECIES" ? "/images/specieslogo.png" : "/images/campainlogo.png",
            name: item.project_name || item.species_name || "Campaign",
            reference: item.reference_number,
            trees: item.trees_planted,
            donationFor: item.donation_type.toUpperCase(),
            date: new Date(item.donation_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            accent: "#0D824B",
            location: "India",
            status: "ALIVE",
            statusAccent: "#0D824B",
            recipientName: item.donation_type === "Received" ?
              (userProfile?.firstName + " " + userProfile?.lastName) :
              (item.recipient_details?.recipient_name || userProfile?.firstName + " " + userProfile?.lastName),
            certificateUrl: item.certificate_url,
            receiptUrl: item.receipt_url,
            giftedBy: item.gifted_by,
          }));
          setAllDonationsData(mapped);
          setTotalItems(response.count);
          setDataLoaded(true);
        } else {
          setAllDonationsData(donations);
          setTotalItems(donations.length);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error loading donations:", error);
        setAllDonationsData(donations);
        setTotalItems(donations.length);
        setDataLoaded(true);
      } finally {
        setLoading(false);
      }
    };

    loadAllDonations();
  }, [userProfile, isAuthenticated, dataLoaded]);

  // Client-side pagination: Calculate pages and slice data
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = allDonationsData.slice(startIndex, endIndex);
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
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
        {currentData.map((donation) => (
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
