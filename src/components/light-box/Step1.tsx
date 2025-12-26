import React from "react";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import CurrencySelect from "@/components/CurrencySelect";

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
}) => {
  return (
    <div className="flex flex-col w-full md:space-y-8 space-y-4">
      <div className="space-y-4">
        <p className="text-lg text-[#454950] font-medium">
          What Occasion / Cause are you donating for?
        </p>
        <ComboBox
          value={occasion}
          onChange={setOccasion}
          placeholder="Occasion / Cause"
          options={["Birthday", "Climate Healing"]}
          contentClassName="md:w-[424px]"
        />
      </div>

      <div className="space-y-4">
        <p className="text-lg text-[#454950] font-medium">
          How many trees would you like to plant?
        </p>
        <div className="space-y-4">
          <div className="flex justify-between gap-6">
            {quantities.map((qty) => (
              <button
                key={qty}
                onClick={() => handleQuantitySelect(qty)}
                className={`sm:px-[22px] w-full sm:py-[11px] px-3 py-2 rounded-md border transition-colors ${
                  selectedQuantity === qty
                    ? "text-[#003399] border-[#003399]"
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
            className={`text-center py-[11px] pl-4 border rounded-md w-full placeholder:text-black truncate transition-colors ${
              manualQuantity
                ? "border-[#003399] text-[#003399]"
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
              <Info className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="bg-[#E7F8F0] px-4 py-3">
              <p className="text-[#0D824B] text-xs md:font-semibold">
                We will geotag your trees and provide quarterly growth updates.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Switch
          checked={isGeoTagged}
          onCheckedChange={handleGeoTaggedChange}
          className={isGeoTagged ? "bg-[#003399]" : ""}
        />
      </div>

      <div className="bg-[#95AAD5] h-[1px] w-full mt-5" />

      <div className="flex justify-between">
        <CurrencySelect />
        <h1 className="flex items-baseline gap-1">
          <span className="font-bold text-2xl md:text-[40px] md:leading-[36px] text-[#090C0F]">
            {currencySymbol}{" "}
            {isGeoTagged
              ? geotaggedRate.toFixed(2)
              : nonGeotaggedRate.toFixed(2)}{" "}
            /
          </span>
          <span className="font-semibold text-[16px] leading-[36px] text-[#003399]">
            Tree
          </span>
        </h1>
      </div>

      <Button
        onClick={handleSaveAndNext}
        disabled={(!selectedQuantity && !manualQuantity) || !occasion.trim()}
        className="w-full h-12 text-white bg-[#003399] rounded-lg text-base font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
      >
        Next
      </Button>
    </div>
  );
};

export default Step1;
