"use client";

import { useState } from "react";
import { Search, Filter, SortAsc, FileDown, ArrowLeft } from "lucide-react";
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
import PlantedTrees from "@/components/PlantedTrees";

interface DonationDetail {
  id: number;
  hrIdTo: string;
  donorName: string;
  emailAddress: string;
  phoneNo: string;
  amount: number;
  account: string;
  geoTagged: string;
}

interface Donation {
  id: number;
  reference: string;
  name: string;
  trees: number;
  donationFor: string;
  donationForColor: string;
  date: string;
  accent: string;
  logoSrc: string;
  location: string;
  status: string;
  statusAccent: string;
  geoTagged: string;
  recipientName: string;
  certificateUrl?: string;
  receiptUrl?: string;
  giftedBy?: any;
}

const donationDetailsData: DonationDetail[] = [
  {
    id: 1,
    hrIdTo: "3512/V/21",
    donorName: "xyz@gmail.com",
    emailAddress: "9087410120",
    phoneNo: "850",
    amount: 700,
    account: "700",
    geoTagged: "true",
  },
  {
    id: 2,
    hrIdTo: "FBHPT345",
    donorName: "xyz@gmail.com",
    emailAddress: "9087410120",
    phoneNo: "650",
    amount: 420,
    account: "420",
    geoTagged: "false",
  },
  {
    id: 3,
    hrIdTo: "FBHPT345",
    donorName: "xyz@gmail.com",
    emailAddress: "9087410120",
    phoneNo: "500",
    amount: 350,
    account: "250",
    geoTagged: "true",
  },
];

const mockDonationForTree: Donation = {
  id: 1,
  reference: "FBHPT345",
  name: "Kanha Shanti Vanam",
  trees: 117,
  donationFor: "SELF",
  donationForColor: "#0D824B",
  date: "Jan 15, 2024",
  accent: "#0D824B",
  logoSrc: "/images/treelogo.png",
  location: "India",
  status: "ALIVE",
  statusAccent: "#0D824B",
  geoTagged: "true",
  recipientName: "John Doe",
  certificateUrl: "#",
  receiptUrl: "#",
};

export const DonationTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details" | "trees">("list");
  const [selectedDetail, setSelectedDetail] = useState<DonationDetail | null>(null);
  const ITEMS_PER_PAGE = 3;

  const totalPages = Math.ceil(donationDetailsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = donationDetailsData.slice(startIndex, endIndex);

  // If viewing planted trees
  if (viewMode === "trees" && selectedDonation) {
    return (
      <div>
        <PlantedTrees
          onBack={() => {
            setViewMode("details");
            setSelectedDonation(null);
          }}
          donation={selectedDonation}
        />
      </div>
    );
  }

  // If viewing donation details
  if (viewMode === "details" && selectedDetail) {
    return (
      <div className="space-y-6">
        {/* Back Button and Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setViewMode("list");
              setSelectedDetail(null);
            }}
            className="flex items-center gap-2 text-[#003399] hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Donation Details</span>
          </button>
        </div>

        {/* Donation Info Cards */}
        <div className="grid grid-cols-4 gap-4 bg-white border border-[#E6E6E6] rounded-2xl p-6">
          <div>
            <p className="text-xs text-[#6B7280] mb-2">HR Rcpt No</p>
            <p className="text-base font-bold text-[#111827]">{selectedDetail.hrIdTo}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] mb-2">Donor Name</p>
            <p className="text-base font-bold text-[#111827]">Promila Koli</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] mb-2">Email Address</p>
            <p className="text-base font-bold text-[#111827]">xyz@gmail.com</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] mb-2">Phone No</p>
            <p className="text-base font-bold text-[#111827]">9322254445555</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] mb-2">Amount</p>
            <p className="text-base font-bold text-[#111827]">{selectedDetail.amount}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280] mb-2">Gen-Geo-Tagged</p>
            <div className="flex items-center gap-2">
              {selectedDetail.geoTagged === "true" ? (
                <div className="flex items-center justify-center w-6 h-6 bg-[#0D824B] rounded-full">
                  <Image
                    src="/images/check-white.png"
                    alt="Check"
                    width={12}
                    height={12}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-6 h-6 bg-[#F59E0B] rounded-full">
                  <Image
                    src="/images/warning-white.png"
                    alt="Warning"
                    width={12}
                    height={12}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by recipient name, etc..."
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

        {/* Details Table */}
        <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E6E6E6]">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Rcpt Name
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Phone No
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Trees Allocated
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Trees Planted
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Certificate Id
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Account
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Download
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={
                      index !== currentData.length - 1
                        ? "border-b border-[#E6E6E6]"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 text-sm text-[#111827]">Absalacy</td>
                    <td className="px-6 py-4 text-sm text-[#111827]">
                      xyz@gmail.com
                    </td>
                    <td className="px-6 py-4 text-sm text-[#111827]">9087410120</td>
                    <td className="px-6 py-4 text-sm text-[#111827]">{item.phoneNo}</td>
                    <td className="px-6 py-4 text-sm text-[#111827]">{item.amount}</td>
                    <td className="px-6 py-4 text-sm text-[#111827]">{item.account}</td>
                    <td className="px-6 py-4">
                      {item.geoTagged === "true" ? (
                        <div className="flex items-center justify-center w-6 h-6 bg-[#0D824B] rounded-full">
                          <Image
                            src="/images/check-white.png"
                            alt="Check"
                            width={12}
                            height={12}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-6 h-6 bg-[#F59E0B] rounded-full">
                          <Image
                            src="/images/warning-white.png"
                            alt="Warning"
                            width={12}
                            height={12}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2">
                        <FileDown className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedDonation(mockDonationForTree);
                          setViewMode("trees");
                        }}
                        className="text-sm font-semibold text-[#003399] hover:underline"
                      >
                        Click Here
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
  }

  // Default list view
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
                  HR Rcpt No
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Donor Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Phone No
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Trees Allocated
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Trees Planted
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Geo-Tagged
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-[#6B7280]">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((donation, index) => (
                <tr
                  key={donation.id}
                  className={
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }
                >
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {donation.hrIdTo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {donation.donorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {donation.emailAddress}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {donation.phoneNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {donation.phoneNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#111827]">
                    {donation.amount}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#111827]">
                    {donation.account}
                  </td>
                  <td className="px-6 py-4">
                    {donation.geoTagged === "true" ? (
                      <div className="flex items-center justify-center w-6 h-6 bg-[#0D824B] rounded-full">
                        <Image
                          src="/images/check-white.png"
                          alt="Check"
                          width={12}
                          height={12}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-6 h-6 bg-[#F59E0B] rounded-full">
                        <Image
                          src="/images/warning-white.png"
                          alt="Warning"
                          width={12}
                          height={12}
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedDetail(donation);
                        setViewMode("details");
                      }}
                      className="text-sm font-semibold text-[#003399] hover:underline"
                    >
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
