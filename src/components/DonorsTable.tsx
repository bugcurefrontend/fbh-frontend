import { User } from "lucide-react";
import ProjectsPagination from "./ProjectsPagination";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProjectDonors, ProjectDonor } from "@/services/allocations";
import { logger } from "@/lib/logger";

interface Donor {
  id: string;
  name: string;
  location: string;
  date: string;
  donationType: "Self" | "Gifting";
  treesPlanted: number;
  avatar?: string;
}

const UserAvatar: React.FC<{
  name: string;
  avatar: string;
  isAnonymous?: boolean;
}> = ({ name, avatar, isAnonymous }) => {
  if (isAnonymous || !avatar) {
    return (
      <div className="md:w-8 md:h-8 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
        <User className="w-5 h-5 text-blue-600" />
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      className="md:w-8 md:h-8 w-12 h-12 rounded-full object-cover"
    />
  );
};

const DonorsTable = ({ projectId }: { projectId?: string | number }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const donorsPerPage = 10;
  // const totalItems = donors.length; // Or use count from API if pagination is server-side
  // Note: The previous logic relied on client-side pagination of the *fetched* list? 
  // Wait, fetchProjectDonors takes page parameters. 
  // If API returns paged results, `response.results` is just that page. 
  // So `donors.length` would be just 10 (or less).
  // We need `totalItems` state to calculate `totalPages`.

  // Let me check the API response interface again.
  // interface ProjectDonorsResponse { count: number; ... }
  // So we need to store `count` in state.

  const [totalCount, setTotalCount] = useState(0);

  // Calculate total pages based on TOTAL count from API
  const totalPages = Math.ceil(totalCount / donorsPerPage);

  // Fetch donors data from API when projectId changes
  useEffect(() => {
    if (!projectId) {
      setDonors([]);
      setLoading(false);
      return;
    }

    const fetchDonors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProjectDonors(projectId, currentPage, donorsPerPage);
        if (response && response.results) {
          // Map API response to Donor interface
          const mappedDonors: Donor[] = response.results.map((donor: ProjectDonor, index: number) => ({
            id: `${projectId}-${index}`,
            name: donor.donor_name,
            location: donor.city,
            date: new Date(donor.donation_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            donationType: donor.donation_for,
            treesPlanted: donor.trees_planted,
          }));
          setDonors(mappedDonors);
          setTotalCount(response.count); // Update total count from API
        }
      } catch (err) {
        logger.error("Error fetching donors", err);
        setError("Failed to load donors data");
        setDonors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [projectId, currentPage, donorsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Show fallback data if no projectId or error
  if (!projectId || error) {
    return (
      <main className="flex">
        <div className="w-full text-center py-8 text-gray-500">
          {error ? "Failed to load donors data" : "No donors data available"}
        </div>
      </main>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <main className="flex">
        <div className="w-full text-center py-8 text-gray-500">
          Loading donors...
        </div>
      </main>
    );
  }
  return (
    <main className="flex">
      {/* Donors Table */}
      <div className="md:block hidden w-full  bg-white shadow-sm rounded-[12px] border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
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
                  S No.
                </th>
                <th
                  className="w-[20%] text-left py-3 px-6 text-xs font-medium"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#454950",
                  }}
                >
                  Donor Name
                </th>
                <th
                  className="w-[20%] text-left py-3 px-6 text-xs font-medium"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#454950",
                  }}
                >
                  Date
                </th>
                <th
                  className="w-[20%] text-left py-3 px-6 text-xs font-medium"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#454950",
                  }}
                >
                  Donation For
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
                  Trees Planted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-500 font-medium italic">
                    No donors found for this project.
                  </td>
                </tr>
              ) : (
                donors.map((donor, index) => (
                  <tr
                    key={donor.id}
                    className={`hover:bg-[#F9FAFB] ${(index + 1) % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"
                      }`}
                  >
                    <td
                      className="text-center py-3.5 px-3.5"
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "22px",
                        color: "#090C0F",
                      }}
                    >
                      {(currentPage - 1) * donorsPerPage + index + 1}
                    </td>
                    <td className="py-3.5 pl-3.5 overflow-hidden">
                      <div className="flex items-center space-x-3">
                        <UserAvatar
                          name={donor.name}
                          avatar={donor.avatar ?? ""}
                          isAnonymous={donor.name === "Anonymous"}
                        />

                        <div>
                          <div
                            style={{
                              fontFamily: "'Public Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "22px",
                              color: "#090C0F",
                            }}
                          >
                            {donor.name}
                          </div>
                          <div
                            className="truncate"
                            style={{
                              fontFamily: "'Public Sans', sans-serif",
                              fontWeight: 400,
                              fontSize: "14px",
                              lineHeight: "22px",
                              color: "#454950",
                              maxWidth: "160px",
                            }}
                          >
                            {donor.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <div
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "22px",
                          color: "#454950",
                        }}
                      >
                        {donor.date}
                      </div>
                    </td>
                    <td className="py-3.5 px-3.5">
                      <span
                        className={`inline-flex uppercase px-2 py-1 rounded-full ${donor.donationType === "Self"
                          ? "bg-green-100"
                          : "bg-orange-100"
                          }`}
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "12px",
                          lineHeight: "18px",
                          letterSpacing: "0px",
                          color:
                            donor.donationType === "Self" ? "#12B569" : "#F78F08",
                          textAlign: "center",
                        }}
                      >
                        {donor.donationType}
                      </span>
                    </td>
                    <td className="text-center py-3.5 px-3.5">
                      <div
                        style={{
                          fontFamily: "'Public Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "14px",
                          lineHeight: "22px",
                          color: "#454950",
                        }}
                      >
                        {donor.treesPlanted}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <ProjectsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={currentPage < totalPages}
          hasPrevious={currentPage > 1}
          onPageChange={handlePageChange}
          className="pt-3 pb-4 px-6"
        />
      </div>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden w-full">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="p-2 border rounded-[8px] hover:bg-gray-50 h-16"
          >
            <div className="flex items-center space-x-3">
              <UserAvatar
                name={donor.name}
                avatar={donor.avatar ?? ""}
                isAnonymous={donor.name === "Anonymous"}
              />
              <div className="flex-1">
                <div
                  style={{
                    fontFamily: "'Public Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "22px",
                    color: "#090C0F",
                  }}
                >
                  {donor.name}
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center text-[#0D824B]">
                    <Image
                      src="/images/leaf.png"
                      alt="tree"
                      width={18}
                      height={18}
                      className="mr-1 max-w-4.5 max-h-4.5"
                    />
                    <span
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "22px",
                      }}
                    >
                      {donor.treesPlanted} Trees Planted
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Public Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "10px",
                      color: "#63676C",
                      lineHeight: "22px",
                    }}
                  >
                    {donor.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination */}
        <ProjectsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={currentPage < totalPages}
          hasPrevious={currentPage > 1}
          onPageChange={handlePageChange}
          className="pt-3 px-6"
        />
      </div>
    </main>
  );
};
export default DonorsTable;
