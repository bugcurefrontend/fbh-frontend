import { User } from "lucide-react";
import ProjectsPagination from "./ProjectsPagination";
import React from "react";
import Image from "next/image";

interface Donor {
  id: string;
  name: string;
  location: string;
  date: string;
  donationType: "For Self" | "For Gifting";
  treesPlanted: number;
  avatar?: string;
}

const donorsData: Donor[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    location: "Prakasam",
    date: "Jan 6, 2024",
    donationType: "For Self",
    treesPlanted: 177,
    avatar: "/images/profile.png",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    location: "Anantapur",
    date: "Jan 6, 2024",
    donationType: "For Gifting",
    treesPlanted: 994,
  },
  {
    id: "3",
    name: "Lana Steiner",
    location: "Chittoor",
    date: "Jan 6, 2024",
    donationType: "For Self",
    treesPlanted: 492,
    avatar: "/images/profile.png",
  },
  {
    id: "4",
    name: "Anonymous",
    location: "Anonymous",
    date: "Jan 5, 2024",
    donationType: "For Gifting",
    treesPlanted: 447,
  },
  {
    id: "5",
    name: "Candice Wu",
    location: "Srikakulam",
    date: "Jan 5, 2024",
    donationType: "For Self",
    treesPlanted: 583,
    avatar: "/images/profile.png",
  },
  {
    id: "6",
    name: "Natali Craig",
    location: "Vizianagaram",
    date: "Jan 5, 2024",
    donationType: "For Gifting",
    treesPlanted: 357,
    avatar: "/images/profile.png",
  },
  {
    id: "7",
    name: "Drew Cano",
    location: "Sri Potti Sriramulu Nellore",
    date: "Jan 4, 2024",
    donationType: "For Self",
    treesPlanted: 196,
    avatar: "/images/profile.png",
  },
  {
    id: "8",
    name: "Orlando Diggs",
    location: "YSR Kadapa",
    date: "Jan 3, 2024",
    donationType: "For Self",
    treesPlanted: 540,
    avatar: "/images/profile.png",
  },
  {
    id: "9",
    name: "Andi Lane",
    location: "Krishna",
    date: "Jan 3, 2024",
    donationType: "For Self",
    treesPlanted: 738,
    avatar: "/images/profile.png",
  },
  {
    id: "10",
    name: "Kate Morrison",
    location: "West Godavari",
    date: "Jan 3, 2024",
    donationType: "For Self",
    treesPlanted: 561,
    avatar: "/images/profile.png",
  },
];

const UserAvatar: React.FC<{
  name: string;
  avatar: string;
  isAnonymous?: boolean;
}> = ({ name, avatar, isAnonymous }) => {
  if (isAnonymous || !avatar) {
    return (
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <User className="w-5 h-5 text-blue-600" />
      </div>
    );
  }

  return (
    <img
      src={avatar}
      alt={name}
      className="w-8 h-8 rounded-full object-cover"
    />
  );
};

const DonorsTable = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const donorsPerPage = 1;
  const totalPages = Math.ceil(donorsData.length / donorsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
              {donorsData.map((donor, index) => (
                <tr
                  key={donor.id}
                  className={`hover:bg-[#F9FAFB] ${
                    (index + 1) % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"
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
                    {index + 1}
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
                      className={`inline-flex px-2 py-1 rounded-full ${
                        donor.donationType === "For Self"
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
                          donor.donationType === "For Self"
                            ? "#12B569"
                            : "#F78F08",
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
              ))}
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
        {donorsData.slice(0, 8).map((donor) => (
          <div
            key={donor.id}
            className="p-2 border rounded-lg hover:bg-gray-50"
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
                    fontSize: "14px",
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
                      className="mr-1"
                    />
                    <span
                      style={{
                        fontFamily: "'Public Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "22px",
                        color: "#454950",
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
