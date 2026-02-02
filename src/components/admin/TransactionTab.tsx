"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Transaction {
  id: number;
  selfNo: string;
  hrIdTo: string;
  hrIdFrom: string;
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
    selfNo: "FBHPT345",
    hrIdTo: "FBHPT345",
    hrIdFrom: "FBHPT345",
    name: "Rosemary",
    amount: 3454,
    currency: "INR",
    status: "SUCCESSFUL",
    statusColor: "#0D824B",
    timestamp: "99-02-25, 05:02",
  },
  {
    id: 2,
    selfNo: "FBHPT345",
    hrIdTo: "FBHPT345",
    hrIdFrom: "FBHPT345",
    name: "Silvy",
    amount: 54684898,
    currency: "INR",
    status: "FAILED",
    statusColor: "#DC2626",
    timestamp: "99-02-25, 05:02",
  },
  {
    id: 3,
    selfNo: "FBHPT345",
    hrIdTo: "FBHPT345",
    hrIdFrom: "FBHPT345",
    name: "Rosemary",
    amount: 3454,
    currency: "INR",
    status: "SUCCESSFUL",
    statusColor: "#0D824B",
    timestamp: "99-02-25, 05:02",
  },
  {
    id: 4,
    selfNo: "FBHPT345",
    hrIdTo: "FBHPT345",
    hrIdFrom: "FBHPT345",
    name: "Silvy",
    amount: 54684898,
    currency: "INR",
    status: "FAILED",
    statusColor: "#DC2626",
    timestamp: "99-02-25, 05:02",
  },
  {
    id: 5,
    selfNo: "FBHPT345",
    hrIdTo: "FBHPT345",
    hrIdFrom: "FBHPT345",
    name: "Rosemary",
    amount: 3454,
    currency: "INR",
    status: "SUCCESSFUL",
    statusColor: "#0D824B",
    timestamp: "99-02-25, 05:02",
  },
];

export const TransactionTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(transactionData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = transactionData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Hr id, Us id ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
          >
            <SortAsc className="w-4 h-4" />
            Sort
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
          >
            <FileDown className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E6E6E6]">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Self No
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  HR-Id-To
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  HR-Id-From
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Currency
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Timestamp
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {transaction.selfNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {transaction.hrIdTo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {transaction.hrIdFrom}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {transaction.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#111827]">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4">
                    <Image
                      src="/images/rupee-icon.png"
                      alt={transaction.currency}
                      width={20}
                      height={20}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className="font-semibold text-xs leading-4 border-0"
                      style={{
                        backgroundColor: `${transaction.statusColor}1A`,
                        color: transaction.statusColor,
                      }}
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {transaction.timestamp}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm font-semibold text-[#003399] hover:underline">
                      View
                    </button>
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
