"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GeoTagToggleAndActionsProps {
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
  variant?: "desktop" | "mobile";
  geoAvailability?: { geo: boolean; nonGeo: boolean };
  availabilityMessage?: string;
  geotaggedRate?: number;
  nonGeotaggedRate?: number;
}

const GeoTagToggleAndActions: React.FC<GeoTagToggleAndActionsProps> = ({
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
  variant = "desktop",
  geoAvailability,
  availabilityMessage,
  geotaggedRate = 175,
  nonGeotaggedRate = 175,
}) => {
  const isMobile = variant === "mobile";
  const [localNotice, setLocalNotice] = useState("");

  const handleToggle = (checked: boolean) => {
    if (geoAvailability) {
      const tagKey = checked ? "geo" : "nonGeo";
      const canToggle = geoAvailability[tagKey as keyof typeof geoAvailability];
      if (!canToggle) {
        const allowed = geoAvailability.geo ? "geotagged" : "non-geotagged";
        setLocalNotice(`Only ${allowed} trees are available.`);
        return;
      }
    }
    setLocalNotice("");
    onGeoTaggedChange(checked);
  };

  return (
    <div>
      <div
        className={
          isMobile
            ? "md:hidden bg-white fixed bottom-0 left-0 right-0 border-t border-gray-200 shadow-lg z-50 px-4 pt-3 pb-6 safe-area-inset-bottom"
            : "max-sm:hidden border border-[#E4E4E4] rounded-2xl px-4 py-6 bg-[#E6EBF54D]"
        }
      >
        <h1 className="flex items-baseline gap-1">
          <span className="font-bold text-[28px] leading-[36px] text-[#090C0F]">
            ₹ {isGeoTagged ? geotaggedRate : nonGeotaggedRate} /
          </span>
          <span className="font-semibold text-[16px] leading-[36px] text-[#003399]">
            Tree
          </span>
        </h1>

        {/* Geo-tagged Toggle */}
        <div className="flex items-center justify-between mb-4 mt-1">
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
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent
                align={isMobile ? "center" : "start"}
                alignOffset={isMobile ? 0 : -14}
                className="bg-[#E7F8F0] px-4 py-3"
              >
                <p className="text-[#0D824B] text-xs md:font-semibold max-sm:max-w-36 text-center">
                  We will geotag your trees and provide quarterly{" "}
                  <br className="max-sm:hidden" /> growth updates for the next
                  three years.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Switch
            checked={isGeoTagged}
            onCheckedChange={handleToggle}
            className={isGeoTagged ? "bg-[#003399]" : ""}
          />
        </div>
        {(availabilityMessage || localNotice) && (
          <p className="text-xs text-red-500 font-medium mb-2">
            {availabilityMessage || localNotice}
          </p>
        )}

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
          <Link href="/gift-tree" className="w-full">
            <Button
              onClick={onGiftTree}
              variant="outline"
              className={`flex-1 w-full border-gray-300 font-bold py-3 h-12 rounded-lg uppercase text-[#003399] hover:text-[#002266] ${
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

      {/* <div
        className={`flex items-center justify-center gap-6 ${
          isMobile
            ? "md:hidden fixed bottom-0 left-0 right-0 border-t  border-[#3BC484] bg-[#E7F8F0] shadow-lg z-50 px-4 pt-4 pb-6 safe-area-inset-bottom"
            : "max-sm:hidden gap-6 border-[0.8px] border-[#12B569] bg-[#E7F8F099] rounded-2xl px-4 py-11"
        }`}
      >
        <Image
          src="/images/congrats.png"
          alt="celebrate"
          width={91}
          height={91}
          className="w-12 md:w-[91px]"
        />
        <p className="text-[#0D824B] font-[Playfair_Display] font-semibold text-[20px] md:text-[32px] md:leading-12 text-center">
          All the trees have been <br /> successfully planted.
        </p>
      </div> */}
    </div>
  );
};

export default GeoTagToggleAndActions;
