"use client";

import React from "react";
import Image from "next/image";
import { Info, Gift } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

interface MobileStickyActionsProps {
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
}

const MobileStickyActions: React.FC<MobileStickyActionsProps> = ({
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4 pt-3 pb-6 space-y-4 safe-area-inset-bottom">
      {/* Geo-tagged Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 text-sm font-medium">
            I want my trees to be geo-tagged
          </span>
          <Info className="w-4 h-4 text-gray-400" />
        </div>
        <Switch
          checked={isGeoTagged}
          onCheckedChange={onGeoTaggedChange}
          className="data-[state=checked]:bg-[#003399]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onPlantTree}
          className="flex-1 bg-[#003399] hover:bg-[#002266] text-white font-bold py-3 h-12 rounded-lg uppercase text-sm gap-2"
        >
          PLANT A TREE
          <Image
            src="/images/donate.png"
            alt="donate"
            width={20}
            height={20}
          />
        </Button>
        <Button
          onClick={onGiftTree}
          variant="outline"
          className="flex-1 border-gray-300 font-bold py-3 h-12 rounded-lg hover:bg-gray-50 uppercase text-sm text-[#003399] hover:text-[#002266] gap-2"
        >
          GIFT A TREE
          <Gift size={16} />
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyActions;