import React from "react";
import { Button } from "@/components/ui/button";

interface PlantDetailsSectionProps {
  quantities: number[];
  selectedQuantity: number | null;
  manualQuantity: string;
  onQuantitySelect: (qty: number) => void;
  onManualQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onManualInputFocus?: () => void;
}

const PlantDetailsSection: React.FC<PlantDetailsSectionProps> = ({
  quantities,
  selectedQuantity,
  manualQuantity,
  onQuantitySelect,
  onManualQuantityChange,
  onManualInputFocus,
}) => {
  return (
    <div className="bg-white border border-[#E8E8E9] md:rounded-[8px] rounded-[16px]">
      <h2 className="border-b border-[#E8E8E9] md:text-lg font-semibold md:font-bold py-4 md:px-6 px-4">
        Plant Details
      </h2>

      <div className="space-y-4 p-4">
        <p className="md:text-lg text-[#454950] md:font-medium">
          How many trees would you like to plant?
        </p>

        <div className="max-sm:space-y-4 sm:flex gap-6">
          <div className="flex justify-between sm:gap-6 gap-4">
            {quantities.map((qty) => (
              <button
                key={qty}
                onClick={() => onQuantitySelect(qty)}
                className={`px-[22px] sm:py-[11px] py-2 rounded-[8px] border transition-colors ${
                  selectedQuantity === qty
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
            onChange={onManualQuantityChange}
            min="1"
            max="9999"
            onFocus={onManualInputFocus}
            className={`text-center max-sm:py-2 pl-4 border rounded-[8px] w-full sm:w-[30%] placeholder:text-black truncate transition-colors ${
              manualQuantity
                ? "border-[#95AAD5] text-[#003399]"
                : selectedQuantity
                ? "border-gray-300 text-gray-400"
                : "border-[#B7B9BB] text-black"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantDetailsSection;
