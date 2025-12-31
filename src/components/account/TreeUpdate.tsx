"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Donation } from "./types";
import { fetchTreeUpdates, treeUpdates } from "./mock-data";
import Update from "../icons/update";

export const TreeUpdate = ({
  tree,
  onBack,
}: {
  tree: Donation;
  onBack: () => void;
}) => {
  const [updates, setUpdates] = useState<typeof treeUpdates>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

  useEffect(() => {
    const getUpdates = async () => {
      setIsLoading(true);
      const fetchedUpdates = await fetchTreeUpdates(tree.id);
      setUpdates(fetchedUpdates);
      setIsLoading(false);
    };

    getUpdates();
  }, [tree.id]);

  useEffect(() => {
    const uniqueYears = Array.from(new Set(updates.map((u) => u.year))).sort(
      (a, b) => b - a
    );
    setYears(uniqueYears);
    if (uniqueYears.length > 0) {
      setSelectedYear(uniqueYears[0].toString());
    }
  }, [updates]);

  const filteredUpdates = selectedYear
    ? updates.filter((u) => u.year.toString() === selectedYear)
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={onBack}>
          <ArrowLeft strokeWidth="3px" className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2"></div>
        <h1 className="font-semibold text-xl md:text-2xl leading-9">
          Trees Updates
        </h1>
        <p className="bg-[#F4E9F6] px-3 py-1 rounded-md text-[#8C249E] font-semibold text-sm md:text-base">
          {tree.reference}
        </p>
      </div>
      <div className="w-full px-0 md:px-14 space-y-10 relative">
        {years.length > 0 && (
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="absolute -top-1.5 right-0 md:right-14 gap-10 py-[9px] px-[13px] rounded-md border-[#D1D5DB] text-[#333333] text-sm w-auto">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        )}
        {isLoading ? (
          <p className="text-gray-500 text-center py-8">Loading updates...</p>
        ) : filteredUpdates.length === 0 ? (
          <div className="sm:p-15 p-4 flex items-center justify-center flex-col space-y-4 text-[#B7B9BB]">
            <Update strokeWidth={0.5} className="sm:w-50 w-10 h-10 sm:h-50" />
            <p className="font-semibold sm:text-2xl leading-6">
              No updates Available
            </p>
          </div>
        ) : (
          filteredUpdates.map((update) => (
            <div key={update.id} className="space-y-4">
              <h3 className="font-bold md:leading-[30px] text-xl text-[#454950]">
                {update.month}
              </h3>

              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="flex justify-center gap-4 md:gap-8 w-full lg:w-auto">
                  {update.images.slice(0, 2).map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full sm:w-[241px] h-[125px] sm:h-[185px] rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`Update image ${i + 1}`}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>

                <div className="w-full lg:w-[45%]">
                  <p className="text-sm md:text-base">{update.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
