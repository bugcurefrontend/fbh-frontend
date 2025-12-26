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
import Map from "./Map";
import Image from "next/image";

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
      <div className="max-md:hidden max-md:overflow-x-scroll md:w-[60%] mx-auto h-full bg-white shadow-sm rounded-[12px] border border-gray-200 justify-between flex flex-col">
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
              {donation.geoTagged === "true" && (
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
              )}
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
                {donation.geoTagged === "true" && (
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
                )}
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
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <button onClick={onBack}>
          <ArrowLeft strokeWidth="3px" className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-xl md:text-2xl leading-9">
          Planted Trees{" "}
        </h1>
        <p className="bg-[#F4E9F6] px-3 py-1 rounded-md text-[#8C249E] font-semibold text-sm md:text-base">
          {donation.reference}
        </p>
      </div>

      {donation.geoTagged === "true" ? (
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex md:flex-row flex-col gap-6 md:gap-4">
            <div className="bg-white border md:w-[40%] border-gray-200 rounded-2xl overflow-hidden">
              <div className="md:min-h-[360px] h-full w-full relative overflow-hidden rounded-lg">
                <Map />
              </div>
            </div>

            <DataTable />

            <div className="md:hidden flex flex-col gap-6 w-full">
              {currentData.map((donor, index) => (
                <div
                  key={startIndex + index}
                  className="border border-[#E8E8E9] rounded-2xl overflow-hidden bg-white"
                >
                  <div className="border-b py-3 px-4 border-[#E8E8E9] flex items-center justify-between">
                    <h2 className="text-lg font-bold">{donor.species} Tree</h2>
                    <div className="flex items-center justify-center rounded-full h-8 w-8 bg-[#003399]">
                      <Image
                        src="/images/direction.png"
                        alt="map"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>

                  <div className="space-y-6 p-4">
                    <div className="text-[#4C4748] flex justify-between">
                      <div className="space-y-2 text-sm">
                        <h1 className="text-sm font-semibold">Project</h1>
                        <p className="text-[#19212C] font-bold">
                          {donor.projectName}
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <h1 className="text-sm font-semibold">Tree Code:</h1>
                        <p className="text-[#19212C] font-bold">
                          {donor.treeCode}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedTree(donations[startIndex + index])
                      }
                      className=" w-full border border-[#003399] rounded-sm py-3"
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontWeight: 700,
                        lineHeight: "22px",
                        color: "#003399",
                      }}
                    >
                      Updates
                    </button>
                  </div>
                </div>
              ))}
              <Pagination className="h-18 px-0 w-full">
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
