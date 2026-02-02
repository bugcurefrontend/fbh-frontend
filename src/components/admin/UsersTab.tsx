"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface User {
  id: number;
  hrId: string;
  name: string;
  email: string;
  phone: string;
  treesPlanted: number;
  lastDonation: string;
  details: string;
}

const usersData: User[] = [
  {
    id: 1,
    hrId: "FBHPT345",
    name: "Kavita Bharti Vasani",
    email: "kavita@example.com",
    phone: "+91 9876543210",
    treesPlanted: 145,
    lastDonation: "Jan 15, 2024",
    details: "View",
  },
  {
    id: 2,
    hrId: "FBHPT346",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543211",
    treesPlanted: 89,
    lastDonation: "Jan 10, 2024",
    details: "View",
  },
  {
    id: 3,
    hrId: "FBHPT347",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543212",
    treesPlanted: 234,
    lastDonation: "Jan 20, 2024",
    details: "View",
  },
  {
    id: 4,
    hrId: "FBHPT348",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 9876543213",
    treesPlanted: 67,
    lastDonation: "Jan 5, 2024",
    details: "View",
  },
  {
    id: 5,
    hrId: "FBHPT349",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 9876543214",
    treesPlanted: 178,
    lastDonation: "Jan 18, 2024",
    details: "View",
  },
];

export const UsersTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = usersData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Search and Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by user name, email, HR ID ..."
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
                  HR ID
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Phone
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Trees Planted
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Last Donation
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {user.hrId}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#111827]">
                    {user.treesPlanted}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {user.lastDonation}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm font-semibold text-[#003399] hover:underline">
                      {user.details}
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
