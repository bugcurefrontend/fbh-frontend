import React from "react";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import CurrencySelect from "@/components/CurrencySelect";
import ToolTipIcon from "../icons/ToolTipIcon";
import { Attribute } from "@/types/attribute";

interface Step1Props {
  occasion: string;
  setOccasion: (value: string) => void;
  quantities: number[];
  selectedQuantity: number | null;
  handleQuantitySelect: (qty: number) => void;
  manualQuantity: string;
  handleManualQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isGeoTagged: boolean;
  handleGeoTaggedChange: (value: boolean) => void;
  currencySymbol: string;
  geotaggedRate: number;
  nonGeotaggedRate: number;
  handleSaveAndNext: () => void;
  attributes?: Attribute[];
  preSelectedAttribute?: Attribute | null;
}

const Step1: React.FC<Step1Props> = ({
  occasion,
  setOccasion,
  quantities,
  selectedQuantity,
  handleQuantitySelect,
  manualQuantity,
  handleManualQuantityChange,
  isGeoTagged,
  handleGeoTaggedChange,
  currencySymbol,
  geotaggedRate,
  nonGeotaggedRate,
  handleSaveAndNext,
  attributes = [],
}) => {
  return (
    <div className="flex flex-col w-full md:space-y-8 space-y-4">
      <div className="space-y-4">
        <p className="text-base md:text-lg text-[#454950] md:font-medium">
          What Occasion / Cause are you donating for? <span className="text-red-500">*</span>
        </p>
        <ComboBox
          value={occasion}
          onChange={setOccasion}
          placeholder="Occasion / Cause"
          options={
            attributes && attributes.length > 0
              ? attributes.map((a) => ({ text: a.name, image: a.icon || a.image }))
              : [
                { text: "Birthday", image: "/images/celebration.png" },
                { text: "Climate Healing", image: "/images/healing.png" },
              ]
          }
          contentClassName="md:w-[450px] min-w-fit"
        />
      </div>

      <div className="space-y-4">
        <p className="text-base md:text-lg text-[#454950] md:font-medium">
          How many trees would you like to plant? <span className="text-red-500">*</span>
        </p>
        <div className="space-y-4">
          <div className="flex justify-between gap-6">
            {quantities.map((qty) => (
              <button
                key={qty}
                onClick={() => handleQuantitySelect(qty)}
                className={`sm:px-[22px] w-full sm:py-[11px] px-3 py-2 rounded-[8px] border transition-colors ${selectedQuantity === qty
                    ? "text-[#003399] border-[#95AAD5]"
                    : "border-[#B7B9BB]"
                  }`}
              >
                {qty}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Enter Manually"
            value={manualQuantity}
            onChange={handleManualQuantityChange}
            min="1"
            max="9999"
            className={`text-center py-[11px] pl-4 border rounded-[8px] w-full placeholder:text-black truncate transition-colors ${manualQuantity
                ? "border-[#95AAD5] text-[#003399]"
                : "border-[#B7B9BB] text-black"
              }`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 text-sm font-medium md:text-base">
            I want my trees to be geo-tagged.
          </span>
          <Tooltip>
            <TooltipTrigger>
              <ToolTipIcon />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-[#E7F8F0] px-4 py-3">
              <p className="text-[#0D824B] text-xs md:font-semibold md:leading-4.5">
                We will geotag your trees and provide quarterly <br /> growth
                updates for the next three years.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Switch checked={isGeoTagged} onCheckedChange={handleGeoTaggedChange} />
      </div>

      <div className="bg-[#95AAD5] h-[1px] w-full mt-4.5" />

      <div className="flex justify-between items-center">
        <CurrencySelect
          className="md:h-[46px] h-[36px] md:w-[116px] w-[88.81px] md:gap-2 gap-1 rounded-[8px]"
          className2="gap-2 px-3.5"
        />
        <h1 className="flex h-[35px] items-baseline gap-1">
          <span className="font-bold text-2xl md:text-[40px] md:leading-[36px] text-[#090C0F]">
            {currencySymbol} {isGeoTagged ? geotaggedRate : nonGeotaggedRate} /
          </span>
          <span className="font-semibold text-[16px] leading-[36px] text-[#003399]">
            Tree
          </span>
        </h1>
      </div>

      <Button
        onClick={handleSaveAndNext}
        disabled={(!selectedQuantity && !manualQuantity) || !occasion.trim()}
        className="w-full h-11 md:h-12 text-white bg-[#003399] rounded-[8px] text-base font-semibold md:leading-6.5 md:font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
      >
        NEXT
      </Button>
    </div>
  );
};

export default Step1;
