"use client";

import React from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import Link from "next/link";

interface GeoTagToggleAndActionsProps {
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
  variant?: "desktop" | "mobile";
}

const GeoTagToggleAndActions: React.FC<GeoTagToggleAndActionsProps> = ({
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
  variant = "desktop",
}) => {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "md:hidden bg-white fixed bottom-0 left-0 right-0 border-t border-gray-200 shadow-lg z-50 px-4 pt-3 pb-6 space-y-4 safe-area-inset-bottom"
          : "max-sm:hidden border border-[#E4E4E4] rounded-2xl px-4 py-6 space-y-4 bg-[#E6EBF54D]"
      }
    >
      {/* Geo-tagged Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={
              isMobile
                ? "text-gray-800 text-sm font-medium"
                : "text-gray-800 text-base"
            }
          >
            I want my trees to be geo-tagged{isMobile ? "" : "."}
          </span>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <Switch
          checked={isGeoTagged}
          onCheckedChange={onGeoTaggedChange}
          className={isGeoTagged ? "bg-[#003399]" : ""}
        />
      </div>

      {/* Action Buttons */}
      <div className={`flex ${isMobile ? "gap-3" : "gap-4"}`}>
        <Link href="/plant-tree" className="w-full">
          <Button
            onClick={onPlantTree}
            className={`flex-1 w-full bg-[#003399] hover:bg-[#002266] text-white font-bold py-3 h-12 rounded-lg uppercase ${
              isMobile ? "text-sm gap-2" : "text-base"
            }`}
          >
            PLANT A TREE
            <Image
              src="/images/donate.png"
              alt="donate"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
              className=""
            />
          </Button>
        </Link>
        <Link href="/plant-tree" className="w-full">
          <Button
            onClick={onGiftTree}
            variant="outline"
            className={`flex-1 w-full border-gray-300 font-bold py-3 h-12 rounded-lg hover:bg-gray-50 uppercase text-[#003399] hover:text-[#002266] ${
              isMobile ? "text-sm gap-2" : "text-base"
            }`}
          >
            GIFT A TREE
            <Image
              src="/images/gift.png"
              alt="gift"
              width={isMobile ? 18 : 20}
              height={isMobile ? 18 : 20}
              className=""
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GeoTagToggleAndActions;
