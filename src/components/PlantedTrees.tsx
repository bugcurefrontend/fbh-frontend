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
import { ArrowLeft } from "lucide-react";
import { donations, tableData } from "./account/mock-data";
import { Donation } from "./account/types";
import { TreeUpdate } from "./account/TreeUpdate";

interface PlantedTreesProps {
  onBack: () => void;
  donation: {
    reference: string;
    geoTagged: string;
    [key: string]: any;
  };
}

const PlantedTrees = ({ onBack, donation }: PlantedTreesProps) => {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = tableData.slice(startIndex, endIndex);

  const [selectedTree, setSelectedTree] = useState<Donation | null>(null);

  if (selectedTree) {
    return (
      <div className="">
        <TreeUpdate tree={selectedTree} onBack={() => setSelectedTree(null)} />
      </div>
    );
  }

  const DataTable = () => {
    return (
      <div className="md:w-[60%] h-full bg-white shadow-sm rounded-[12px] border border-gray-200 overflow-x-scroll justify-between flex flex-col">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th
                className="w-[20%] text-center py-3 px-6 text-xs font-medium"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#454950",
                }}
              >
                Tree Code
              </th>
              <th
                className="w-[20%] py-3 px-6 text-xs font-medium"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#454950",
                }}
              >
                Project
              </th>
              <th
                className="w-[20%] py-3 px-6 text-xs font-medium"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#454950",
                }}
              >
                Species
              </th>
              <th
                className="w-[20%] py-3 px-6 text-xs font-medium"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#454950",
                }}
              >
                Updates
              </th>
              <th
                className="w-[20%] py-3 px-6 text-xs font-medium"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "#454950",
                }}
              >
                Directions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((donor, index) => (
              <tr key={startIndex + index}>
                <td
                  className="h-18 text-center px-3.5 truncate"
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "#090C0F",
                  }}
                >
                  {donor.treeCode}
                </td>

                <td className="text-center h-18 px-3.5">
                  <div
                    className="truncate"
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#454950",
                    }}
                  >
                    {donor.projectName}
                  </div>
                </td>

                <td className="text-center h-18 px-3.5">
                  <div
                    className="truncate"
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#454950",
                    }}
                  >
                    {donor.species}
                  </div>
                </td>
                <td className="text-center h-18 px-3.5">
                  <button
                    onClick={() => setSelectedTree(donations[index])}
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#003399",
                    }}
                  >
                    View
                  </button>
                </td>
                <td className="text-center h-18 px-3.5">
                  <button
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#003399",
                    }}
                  >
                    click here
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination className="h-18 px-6 w-full border-t border-gray-200">
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

  return (
    <main className="md:px-4 space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={onBack}>
          <ArrowLeft strokeWidth="3px" className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2"></div>
        <h1 className="font-semibold text-xl md:text-2xl leading-9">
          Planted Trees{" "}
        </h1>
        <p className="bg-[#F4E9F6] px-3 py-1 rounded-md text-[#8C249E] font-semibold text-sm md:text-base">
          {donation.reference}
        </p>
      </div>

      {donation.geoTagged === "true" ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex md:flex-row flex-col gap-4">
            <div className="bg-white border md:w-[40%] border-gray-200 rounded-2xl overflow-hidden">
              <div className="min-h-[360px] h-full w-full relative overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.9814570275257!2d78.21631687473341!3d17.1752898088815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbc68ae81e7a79%3A0x3e82438832073e9d!2sKanha%20Shanti%20Vanam!5e1!3m2!1sen!2sin!4v1765172898898!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="rounded-lg border-0 min-h-[360px] h-full"
                  allowFullScreen
                />
              </div>
            </div>

            <DataTable />
          </div>

          <p className="leading-6 text-[#090C0F] mt-4 max-md:hidden">
            Few trees are in the planting queue and will be planted shortly.
            Their locations will appear here once planting is complete. Thank
            you for your patience.
          </p>
        </div>
      ) : (
        <DataTable />
      )}
    </main>
  );
};
export default PlantedTrees;
