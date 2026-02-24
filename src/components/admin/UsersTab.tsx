"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchBar from "@/components/SearchBar";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const usersData: User[] = [
  {
    id: 1,
    name: "Prerana Koli",
    email: "3454",
    phone: "3454",
  },
  {
    id: 2,
    name: "Suyash Kamble",
    email: "54684898",
    phone: "54684898",
  },
  {
    id: 3,
    name: "Prerana Koli",
    email: "3454",
    phone: "3454",
  },
  {
    id: 4,
    name: "Suyash Kamble",
    email: "54684898",
    phone: "54684898",
  },
  {
    id: 5,
    name: "Prerana Koli",
    email: "3454",
    phone: "3454",
  },
];

export const UsersTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 5;

  const filteredData = usersData.filter((item) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query);

    return matchesSearch;
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
            placeholder="Search by species name, etc ..."
          />
        </div>
        <button className="flex items-center gap-1.5 text-[#090C0F] font-medium text-base hover:opacity-80 transition-opacity">
          <Upload className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="w-1/3 text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Name
                </th>
                <th className="w-1/3 text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Email
                </th>
                <th className="w-1/3 text-center px-3.5 py-3 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentData.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                      index !== currentData.length - 1
                        ? "border-b border-[#E6E6E6]"
                        : ""
                    }`}
                  >
                    <td className="w-1/3 px-6 py-6 text-sm font-semibold text-[#090C0F] text-center">
                      {user.name}
                    </td>
                    <td className="w-1/3 px-6 py-6 text-sm font-semibold text-[#454950] text-center">
                      {user.email}
                    </td>
                    <td className="w-1/3 px-6 py-6 text-sm font-semibold text-[#454950] text-center">
                      {user.phone}
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
