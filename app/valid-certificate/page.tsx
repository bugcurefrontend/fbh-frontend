"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Donation } from "@/components/account/types";
import { donations } from "@/components/account/mock-data";
import { TreeUpdate } from "@/components/account/TreeUpdate";
import Map from "@/components/Map";

interface Data {
  treeCode: number | string;
  projectName: string;
  species: string;
}

const tableData: Data[] = [
  {
    treeCode: "KSVM-2024",
    projectName: "Kanha Shanti Vanam",
    species: "Mango",
  },
  {
    treeCode: "KSVM-2024",
    projectName: "Kanha Shanti Vanam",
    species: "Neem",
  },
  {
    treeCode: "KSVM-2024",
    projectName: "Kanha Shanti Vanam",
    species: "Peepal",
  },
  {
    treeCode: "APRF-2024",
    projectName: "Andhra Pradesh Reforestation",
    species: "Banyan",
  },
  {
    treeCode: "APRF-2024",
    projectName: "Andhra Pradesh Reforestation",
    species: "Teak",
  },
  {
    treeCode: "MHRF-2024",
    projectName: "Maharashtra Green Drive",
    species: "Jamun",
  },
  {
    treeCode: "MHRF-2024",
    projectName: "Maharashtra Green Drive",
    species: "Amla",
  },
  {
    treeCode: "MHRF-2024",
    projectName: "Maharashtra Green Drive",
    species: "Bamboo",
  },
  {
    treeCode: "TNFR-2024",
    projectName: "Tamil Nadu Forest Revival",
    species: "Sandalwood",
  },
  {
    treeCode: "TNFR-2024",
    projectName: "Tamil Nadu Forest Revival",
    species: "Neem",
  },
  {
    treeCode: "RJGP-2024",
    projectName: "Rajasthan Green Plantation",
    species: "Khejri",
  },
  {
    treeCode: "RJGP-2024",
    projectName: "Rajasthan Green Plantation",
    species: "Babool",
  },
  {
    treeCode: "KLRF-2024",
    projectName: "Kerala Rainforest Restoration",
    species: "Jackfruit",
  },
  {
    treeCode: "KLRF-2024",
    projectName: "Kerala Rainforest Restoration",
    species: "Coconut",
  },
  {
    treeCode: "ODGP-2024",
    projectName: "Odisha Green Initiative",
    species: "Sal",
  },
];

const page = () => {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [valid, setValid] = useState(true);

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentData = tableData.slice(startIndex, endIndex);
  const [selectedTree, setSelectedTree] = useState<Donation | null>(null);

  if (selectedTree) {
    return (
      <div className="max-w-7xl mx-auto md:px-8 px-4  pt-6">
        <TreeUpdate tree={selectedTree} onBack={() => setSelectedTree(null)} />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto md:px-8 px-4 mt-8">
      {valid ? (
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center w-25 h-25">
            <Image
              src="/images/success.png"
              alt="success"
              width={100}
              height={100}
            />
          </div>

          <h1 className="mt-4 text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
            Your Certificate is Valid!
          </h1>

          <div className="mt-6 border border-[#E6E6E6] rounded-xl md:p-6 p-4 max-w-200 w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-5.5 md:flex-row flex-col">
            <div className="space-y-2">
              <h2 className="text-[#94979A] max-md:text-sm leading-6 font-semibold">
                Certificate ID
              </h2>
              <h1 className="text-[#19212C] leading-6.5 md:text-lg md:font-bold font-semibold">
                3SXNSK4
              </h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-[#94979A] max-md:text-sm leading-6 font-semibold">
                Name
              </h2>
              <h1 className="text-[#19212C] leading-6.5 md:text-lg md:font-bold font-semibold">
                Kalpit Bhai
              </h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-[#94979A] max-md:text-sm leading-6 font-semibold">
                Trees Planted
              </h2>
              <h1 className="text-[#19212C] leading-6.5 md:text-lg md:font-bold font-semibold">
                999
              </h1>
            </div>
            <div className="space-y-2">
              <h2 className="text-[#94979A] max-md:text-sm leading-6 font-semibold">
                Planted On
              </h2>
              <h1 className="text-[#19212C] leading-6.5 md:text-lg md:font-bold font-semibold">
                January 12th , 2026
              </h1>
            </div>
          </div>

          <h1 className="my-6 text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
            Your Planted Trees
          </h1>

          <div className="w-full flex md:flex-row flex-col gap-6 md:gap-4">
            <div className="bg-white border md:w-[40%] border-gray-200 rounded-2xl overflow-hidden">
              <Map />
            </div>

            <div className="max-md:hidden w-[60%] h-full bg-white shadow-sm rounded-[12px] border border-gray-200 overflow-hidden max-md:overflow-x-scroll justify-between flex flex-col">
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
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center w-25 h-25">
            <Image
              src="/images/failed.png"
              alt="failed"
              width={100}
              height={100}
            />
          </div>

          <h1 className="mt-4 text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
            Your Certificate is Invalid!
          </h1>

          <div className="flex gap-2 text-sm font-medium mt-4">
            <p className="text-[#454950]">Facing Issues?</p>
            <button className="underline text-[#003399] font-bold">
              <a href="contact-us">Contact Us</a>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
export default page;
