import { useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RecentDonationRow } from "./types";

interface RecentDonationsProps {
  data: RecentDonationRow[];
}

export const RecentDonations = ({ data }: RecentDonationsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      <h1 className="text-[#454950] font-semibold text-2xl leading-9">
        Recent Donations
      </h1>

      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  HFI Rept No
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Name
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Trees
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Donated For
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  DEP
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Geotagged
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Currency
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Amount
                </th>
                <th className="text-center px-3.5 py-3 text-xs font-medium text-[#454950]">
                  Rcpt URL
                </th>
                <th className="px-3.5 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-6 py-10 text-center text-gray-500 font-medium italic">
                    No donations found.
                  </td>
                </tr>
              ) : (
                currentData.map((donation, index) => (
                  <tr
                    key={donation.id}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                      index !== currentData.length - 1
                        ? "border-b border-[#E6E6E6]"
                        : ""
                    }`}
                  >
                    <td className="px-3.5 py-4.5 text-sm font-semibold text-[#090C0F]">
                      {donation.hrIdTo}
                    </td>
                    <td className="px-3.5 py-4.5 text-sm font-semibold text-center text-[#454950]">
                      {donation.name}
                    </td>
                    <td className="px-3.5 py-4.5 text-sm font-semibold text-center text-[#454950]">
                      {donation.trees}
                    </td>
                    <td className="px-3.5 py-4.5 text-center">
                      <Badge
                        className="h-8 font-semibold text-sm leading-4 border-0 rounded-full px-3 py-1"
                        style={{
                          backgroundColor: `${donation.donationForColor}1A`,
                          color: donation.donationForColor,
                        }}
                      >
                        {donation.donationFor}
                      </Badge>
                    </td>
                    <td className="px-3.5 py-4.5 text-sm font-semibold text-center text-[#454950]">
                      {donation.cat}
                    </td>
                    <td className="px-3.5 py-4">
                      <div className="flex items-center justify-center">
                        {donation.geoTagged ? (
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
                    </td>
                    <td className="px-3.5 py-4">
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
                    <td className="px-3.5 py-4.5 text-sm font-semibold text-center text-[#454950]">
                      {donation.amount}
                    </td>
                    <td className="px-3.5 py-4.5 text-center text-sm font-bold text-[#003399] hover:underline">
                      <a href={donation.fundUrl}>Click Here</a>
                    </td>
                    <td className="px-3.5 py-4.5 text-center">
                      <button className="hover:text-[#454950]">
                        <MoreVertical size={20} />
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
    </div>
  );
};
