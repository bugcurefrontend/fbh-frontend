import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchBar from "@/components/SearchBar";
import { TableActions, SortOption, FilterOption } from "../TableActions";

interface RecipientData {
  id: number;
  rcptName: string;
  email: string;
  phoneNo: string;
  treesAllocated: number;
  treesPlanted: number;
  certificateId: string;
  account: string;
  geoTagged: string;
}

interface RecipientTableProps {
  recipients: RecipientData[];
  onViewDetails: (recipient: RecipientData) => void;
}

const sortOptions: SortOption[] = [
  { label: "Name: A-Z", value: "rcptName", direction: "asc" },
  { label: "Trees Allocated: High to Low", value: "treesAllocated", direction: "desc" },
  { label: "Trees Allocated: Low to High", value: "treesAllocated", direction: "asc" },
  { label: "Trees Planted: High to Low", value: "treesPlanted", direction: "desc" },
];

const filterOptions: FilterOption[] = [
  { label: "Account: Active", value: "true" },
  { label: "Account: Inactive", value: "false" },
];

export const RecipientTable = ({
  recipients,
  onViewDetails,
}: RecipientTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState<SortOption | null>(sortOptions[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const ITEMS_PER_PAGE = 4;

  const filteredData = recipients
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.rcptName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.certificateId.toLowerCase().includes(query);

      // Filter by geoTagged status (using the 'account' column logic)
      const matchesStatus =
        selectedFilters.length === 0 || selectedFilters.includes(item.geoTagged);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!selectedSort) return 0;
      
      const { value, direction } = selectedSort;
      let comparison = 0;

      if (value === "rcptName") {
        comparison = a.rcptName.localeCompare(b.rcptName);
      } else if (value === "treesAllocated") {
        comparison = a.treesAllocated - b.treesAllocated;
      } else if (value === "treesPlanted") {
        comparison = a.treesPlanted - b.treesPlanted;
      }

      return direction === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-[400px]">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by recipient name, etc ..."
          />
        </div>
        <TableActions
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          filterLabel="Filter by Account Status"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E6E6E6]">
              <tr>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Rcpt Name
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Email
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Phone No.
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Trees Allocated
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Trees Planted
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Certificate ID
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Account
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Download
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-[#454950] whitespace-nowrap">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((recipient, index) => (
                <tr
                  key={recipient.id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                    index !== currentData.length - 1
                      ? "border-b border-[#E6E6E6]"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#090C0F] text-center">
                    {recipient.rcptName}
                  </td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#090C0F] text-center">
                    {recipient.email}
                  </td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#090C0F] text-center">
                    {recipient.phoneNo}
                  </td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#090C0F] text-center">
                    {recipient.treesAllocated}
                  </td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#090C0F] text-center">
                    {recipient.treesPlanted}
                  </td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#090C0F] text-center">
                    {recipient.certificateId}
                  </td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-[#454950] text-center">
                    {recipient.geoTagged === "true" ? (
                      <Image
                        src="/images/check.png"
                        alt="Check"
                        width={17}
                        height={17}
                        className="mx-auto"
                      />
                    ) : (
                      <Image
                        src="/images/warning.png"
                        alt="Warning"
                        width={17}
                        height={17}
                        className="mx-auto"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4.5 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4.5 text-center">
                    <button
                      onClick={() => onViewDetails(recipient)}
                      className="text-sm font-bold text-[#003399] hover:underline"
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
