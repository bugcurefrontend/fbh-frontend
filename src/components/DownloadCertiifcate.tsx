import React from "react";
import { Download, DownloadIcon, Eye, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Donor {
  id: string;
  name: string;
  location: string;
  date: string;
  donationType: "Self" | "Gifting";
  treesPlanted: number;
  avatar?: string;
}

const donorsData: Donor[] = [
  {
    id: "1",
    name: "Olivia Rhye",
    location: "Prakasam",
    date: "Jan 6, 2024",
    donationType: "Self",
    treesPlanted: 177,
    avatar: "/images/profile.png",
  },
  {
    id: "2",
    name: "Phoenix Baker",
    location: "Anantapur",
    date: "Jan 6, 2024",
    donationType: "Gifting",
    treesPlanted: 994,
  },
  {
    id: "3",
    name: "Lana Steiner",
    location: "Chittoor",
    date: "Jan 6, 2024",
    donationType: "Self",
    treesPlanted: 492,
    avatar: "/images/profile.png",
  },
  {
    id: "4",
    name: "Anonymous",
    location: "Anonymous",
    date: "Jan 5, 2024",
    donationType: "Gifting",
    treesPlanted: 447,
  },
  {
    id: "5",
    name: "Candice Wu",
    location: "Srikakulam",
    date: "Jan 5, 2024",
    donationType: "Self",
    treesPlanted: 583,
    avatar: "/images/profile.png",
  },
  {
    id: "6",
    name: "Natali Craig",
    location: "Vizianagaram",
    date: "Jan 5, 2024",
    donationType: "Gifting",
    treesPlanted: 357,
    avatar: "/images/profile.png",
  },
  {
    id: "7",
    name: "Drew Cano",
    location: "Sri Potti Sriramulu Nellore",
    date: "Jan 4, 2024",
    donationType: "Self",
    treesPlanted: 196,
    avatar: "/images/profile.png",
  },
  {
    id: "8",
    name: "Orlando Diggs",
    location: "YSR Kadapa",
    date: "Jan 3, 2024",
    donationType: "Self",
    treesPlanted: 540,
    avatar: "/images/profile.png",
  },
  {
    id: "9",
    name: "Andi Lane",
    location: "Krishna",
    date: "Jan 3, 2024",
    donationType: "Self",
    treesPlanted: 738,
    avatar: "/images/profile.png",
  },
  {
    id: "10",
    name: "Kate Morrison",
    location: "West Godavari",
    date: "Jan 3, 2024",
    donationType: "Self",
    treesPlanted: 561,
    avatar: "/images/profile.png",
  },
];

const DownloadCertificate: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer gap-2 items-center justify-center bg-[#003399] hover:bg-[#062d7b] text-white font-semibold h-11 px-5 py-3 rounded-md w-[50%]">
          <span className="max-md:hidden">Download</span>Certificate
          <Download className="w-4 h-4" />
        </div>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="max-w-4xl px-0 ">
        <DialogTitle className="uppercase font-bold text-2xl px-6">
          Download Certificate
        </DialogTitle>
        <DialogClose asChild>
          <button className="absolute right-5 top-5 p-2 rounded-full hover:bg-gray-100 transition">
            <X size={20} className="text-black" />
          </button>
        </DialogClose>
        <div className="flex justify-end px-6 gap-2 text-[#003399] cursor-pointer font-medium">
          <p>Download All </p>
          <DownloadIcon size={20} />
        </div>
        <div className="h-[344px] px-4 overflow-y-scroll">
          <div className="space-y-4 w-full">
            {donorsData.map((donor) => (
              <div
                key={donor.id}
                className="p-2 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
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

                    <div className="mt-1 flex items-center text-[#0D824B]">
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
                          color: "#0D824B",
                        }}
                      >
                        {donor.treesPlanted} Trees Planted
                      </span>
                    </div>
                  </div>
                  <DownloadIcon
                    className="text-[#003399] cursor-pointer"
                    size={20}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadCertificate;
