"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchBar from "@/components/SearchBar";
import { TableActions, FilterOption, SortOption } from "./TableActions";
import Image from "next/image";

interface Transaction {
  id: number;
  refNo: string;
  utrNo: string;
  hfiRcptNo: string;
  paymentMode: string;
  name: string;
  amount: number;
  currency: string;
  status: "SUCCESSFUL" | "FAILED";
  statusColor: string;
  timestamp: string;
}

const transactionData: Transaction[] = [
  {
    id: 1,
    refNo: "FBHP2T345",
    utrNo: "FBHP2T345",
    hfiRcptNo: "FBHP2T345",
    paymentMode: "Razorpay",
    name: "Prerana Koli",
    amount: 3454,
    currency: "INR",
    status: "SUCCESSFUL",
    statusColor: "#0D824B",
    timestamp: "09-10-25 00:22",
  },
  {
    id: 2,
    refNo: "FBHP2T345",
    utrNo: "FBHP2T345",
    hfiRcptNo: "FBHP2T345",
    paymentMode: "Gpay",
    name: "Suyash Kamble",
    amount: 54684898,
    currency: "INR",
    status: "FAILED",
    statusColor: "#DC2626",
    timestamp: "09-10-25 00:22",
  },
  {
    id: 3,
    refNo: "FBHP2T345",
    utrNo: "FBHP2T345",
    hfiRcptNo: "FBHP2T345",
    paymentMode: "Razorpay",
    name: "Prerana Koli",
    amount: 3454,
    currency: "INR",
    status: "SUCCESSFUL",
    statusColor: "#0D824B",
    timestamp: "09-10-25 00:22",
  },
  {
    id: 4,
    refNo: "FBHP2T345",
    utrNo: "FBHP2T345",
    hfiRcptNo: "FBHP2T345",
    paymentMode: "Gpay",
    name: "Suyash Kamble",
    amount: 54684898,
    currency: "INR",
    status: "FAILED",
    statusColor: "#DC2626",
    timestamp: "09-10-25 00:22",
  },
  {
    id: 5,
    refNo: "FBHP2T345",
    utrNo: "FBHP2T345",
    hfiRcptNo: "FBHP2T345",
    paymentMode: "Razorpay",
    name: "Prerana Koli",
    amount: 3454,
    currency: "INR",
    status: "SUCCESSFUL",
    statusColor: "#0D824B",
    timestamp: "09-10-25 00:22",
  },
];

const filterOptions: FilterOption[] = [
  { label: "Successful", value: "SUCCESSFUL" },
  { label: "Failed", value: "FAILED" },
  { label: "Razorpay", value: "Razorpay" },
  { label: "Gpay", value: "Gpay" },
];

const sortOptions: SortOption[] = [
  { label: "Latest to Oldest", value: "timestamp", direction: "desc" },
  { label: "Oldest to Latest", value: "timestamp", direction: "asc" },
  { label: "Amount: Low to High", value: "amount", direction: "asc" },
  { label: "Amount: High to Low", value: "amount", direction: "desc" },
];

export const TransactionTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(
    sortOptions[0],
  );
  const ITEMS_PER_PAGE = 5;

  const filteredData = transactionData
    .filter((item) => {
      // Search logic
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.refNo.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.utrNo.toLowerCase().includes(query);

      // Filter logic
      // Assuming filters are currently mixed status and payment mode.
      // A more robust solution would separate filter groups, but for now we check if ANY selected filter matches the item properties.
      // However, usually filters are AND across groups and OR within groups.
      // Since we just have a flat list of checkboxes, let's assume if "SUCCESSFUL" is checked, we only show successful.
      // If "Razorpay" is also checked, we might show (Successful OR Razorpay) or (Successful AND Razorpay).
      // Let's implement OR logic for simplicity within same type, but that requires knowing types.
      // For this specific UI pattern (single list), usually it implies OR or simple inclusion.

      // Let's split filters by type for better logic:
      const statusFilters = selectedFilters.filter((f) =>
        ["SUCCESSFUL", "FAILED"].includes(f),
      );
      const paymentFilters = selectedFilters.filter((f) =>
        ["Razorpay", "Gpay"].includes(f),
      );

      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(item.status);
      const matchesPayment =
        paymentFilters.length === 0 ||
        paymentFilters.includes(item.paymentMode);

      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;

      const { value, direction } = selectedSort;
      let comparison = 0;

      if (value === "amount") {
        comparison = a.amount - b.amount;
      } else if (value === "timestamp") {
        // Simple string compare for now since format is "09-10-25 00:22", which needs parsing if we want real date sort
        // But for this format YY-MM-DD would sort correctly as strings.
        // The provided format "09-10-25" is ambiguous (DD-MM-YY or YY-MM-DD or MM-DD-YY).
        // Given "25", it's distinct. Let's assume it's comparable or just use string compare.
        comparison = a.timestamp.localeCompare(b.timestamp);
      }

      return direction === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Payment ID, etc ..."
          />
        </div>
        <TableActions
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          filterLabel="Filter by Status/Mode"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Ref No.
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  UTR No
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  HFI Rcpt No
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Payment Mode
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
                  Status
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }`}
                >
                  <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                    {transaction.refNo}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                    {transaction.utrNo}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                    {transaction.hfiRcptNo}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                    {transaction.paymentMode}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                    {transaction.name}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#090C0F] text-center">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#454950] text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Image
                        src="/images/flag.png"
                        alt={transaction.currency}
                        width={28}
                        height={28}
                      />
                      <p className="text-sm font-medium text-[#454950]">
                        {transaction.currency}
                      </p>
                    </div>{" "}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-3 py-2 rounded-full leading-6 text-sm font-semibold ${
                        transaction.status === "SUCCESSFUL"
                          ? "bg-[#E7F8F0] text-[#0D824B]"
                          : "bg-[##FEEDEC] text-[#F04438]"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#454950] text-center">
                    {transaction.timestamp}
                  </td>
                </tr>
              ))}
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
