"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchBar from "@/components/SearchBar";
import { TableActions, SortOption, FilterOption } from "./TableActions";
import { DonationDetailsView } from "./donation-details";
import { fetchDonationList, exportDonations, DonationFilters } from "@/services/admin";
import { logger } from "@/lib/logger";

// Updated Interface based on Image
interface DonationDetail {
  id: number;
  hfiRcptNo: string;
  name: string;
  amount: number;
  currency: string;
  geoTagged: string;
}

const sortOptions: SortOption[] = [
  { label: "Amount: High to Low", value: "amount", direction: "desc" },
  { label: "Amount: Low to High", value: "amount", direction: "asc" },
  { label: "Name: A-Z", value: "name", direction: "asc" },
];

const filterOptions: FilterOption[] = [
  { label: "Geo-Tagged: Yes", value: "true" },
  { label: "Geo-Tagged: No", value: "false" },
];

export const DonationTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<DonationDetail | null>(
    null,
  );

  // API state
  const [apiDonations, setApiDonations] = useState<DonationDetail[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 5;

  // Fetch donations from API
  useEffect(() => {
    const loadDonations = async () => {
      setIsLoading(true);

      // Build filters for API
      const filters: DonationFilters = {
        page: currentPage,
        page_size: ITEMS_PER_PAGE,
      };

      // Add search filter (donor email search)
      if (searchQuery.trim()) {
        filters.donor_email = searchQuery.trim();
      }

      // Add geotagging filter (is_premium)
      if (selectedFilters.length > 0) {
        // Only one filter can be active: "true" or "false"
        filters.is_premium = selectedFilters[0] === "true";
      }

      const data = await fetchDonationList(filters);

      if (data && data.results) {
        // Transform API data to match UI format
        const transformedData: DonationDetail[] = data.results.map((donation) => ({
          id: donation.id,
          hfiRcptNo: donation.hfn_receipt_number || donation.external_donation_id,
          name: donation.donor?.user_name || "Unknown",
          amount: donation.amount,
          currency: donation.currency,
          geoTagged: donation.is_geotagged ? "true" : "false",
        }));

        setApiDonations(transformedData);
        setTotalCount(data.count);
      }

      setIsLoading(false);
    };

    loadDonations();
  }, [currentPage, searchQuery, selectedFilters]);

  // Handle export to CSV
  const handleExport = async () => {
    try {
      // Build filters for export (same as list filters, but without pagination)
      const filters: DonationFilters = {};

      // Add search filter (donor email search)
      if (searchQuery.trim()) {
        filters.donor_email = searchQuery.trim();
      }

      // Add geotagging filter (is_premium)
      if (selectedFilters.length > 0) {
        filters.is_premium = selectedFilters[0] === "true";
      }

      // Call export API
      const blob = await exportDonations(filters);

      if (blob) {
        // Create download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `donations_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        logger.error("Failed to export donations");
      }
    } catch (error) {
      logger.error("Error exporting donations", error);
    }
  };

  // Client-side sorting
  const sortedData = [...apiDonations].sort((a, b) => {
    if (!selectedSort) return 0;

    const { value, direction } = selectedSort;
    let comparison = 0;

    if (value === "amount") {
      comparison = a.amount - b.amount;
    } else if (value === "name") {
      comparison = a.name.localeCompare(b.name);
    }

    return direction === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const currentData = sortedData;

  // If viewing donation details, show the DonationDetailsView component
  if (selectedDetail) {
    return (
      <DonationDetailsView
        donation={selectedDetail}
        onBack={() => setSelectedDetail(null)}
      />
    );
  }

  // Default list view
  return (
    <div className="space-y-8">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by hfi rcpt no, name ..."
          />
        </div>
        <TableActions
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterLabel="Filter by Tagging"
          onExport={handleExport}
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  HFI Rcpt No
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Name
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Amount
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Currency
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Geo - Tagged
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    Loading donations...
                  </td>
                </tr>
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    No donations found.
                  </td>
                </tr>
              ) : (
                currentData.map((donation, index) => (
                  <tr
                    key={donation.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                      }`}
                  >
                    <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                      {donation.hfiRcptNo}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                      {donation.name}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-[#454950] text-center">
                      {donation.amount}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-1">
                        <Image
                          src="/images/flag.png"
                          alt={donation.currency}
                          width={28}
                          height={28}
                        />
                        <p className="text-sm font-medium text-[#454950]">
                          {donation.currency}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5 mt-1.5 flex justify-center">
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
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => {
                          setSelectedDetail(donation);
                        }}
                        className="text-sm font-bold text-[#003399] hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination className="py-4 px-6 border-t border-[#E6E6E6]">
          <PaginationContent className="w-full flex items-center justify-between">
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
    </div>
  );
};
