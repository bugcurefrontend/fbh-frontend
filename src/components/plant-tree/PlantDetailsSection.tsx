import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface PlantDetailsSectionProps {
  quantities: number[];
  selectedQuantity: number | null;
  manualQuantity: string;
  onQuantitySelect: (qty: number) => void;
  onManualQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onManualInputFocus?: () => void;
  onSaveAndNext: () => void;
}

const PlantDetailsSection: React.FC<PlantDetailsSectionProps> = ({
  quantities,
  selectedQuantity,
  manualQuantity,
  onQuantitySelect,
  onManualQuantityChange,
  onManualInputFocus,
  onSaveAndNext,
}) => {
  return (
    <div className="bg-white border border-[#E8E8E9] rounded-2xl">
      <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-6">
        Plant Details
      </h2>

      <div className="p-4">
        <div className="mb-6 space-y-4">
          <p className="text-lg text-[#454950] font-medium">
            How many trees would you like to plant?
          </p>
          <div className="flex sm:gap-6 gap-4">
            {quantities.map((qty) => (
              <button
                key={qty}
                onClick={() => onQuantitySelect(qty)}
                className={`sm:px-[22px] sm:py-[11px] px-3 py-2 rounded-md border transition-colors ${
                  selectedQuantity === qty
                    ? "text-[#003399] border-[#003399]"
                    : "border-[#B7B9BB]"
                }`}
              >
                {qty}
              </button>
            ))}

            <input
              type="number"
              placeholder="Enter Manually"
              value={manualQuantity}
              onChange={onManualQuantityChange}
              min="1"
              onFocus={onManualInputFocus}
              className={`text-center pl-4 border rounded-md w-full sm:w-[30%] placeholder:text-black truncate transition-colors ${
                manualQuantity
                  ? "border-[#003399] text-[#003399]"
                  : selectedQuantity
                  ? "border-gray-300 text-gray-400"
                  : "border-[#B7B9BB] text-black"
              }`}
            />
          </div>
        </div>

        {/* Sample Certificate */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="h-[109px] bg-gray-100 rounded-xl mb-8 flex items-center justify-center bg-cover bg-center relative overflow-hidden cursor-pointer"
              style={{
                backgroundImage: "url('/images/blur-certificate.png')",
              }}
            >
              <button className="flex items-center gap-1.5 text-sm font-bold">
                View Sample Certificate
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0">
            <DialogTitle className="text-xl font-semibold py-4 border-b px-6">
              Sample Certificate
            </DialogTitle>

            <Image
              src="/images/certificate.jpg"
              alt="Certificate"
              width={671}
              height={465}
              className="w-full h-auto object-contain p-3"
            />
          </DialogContent>
        </Dialog>

        {/* Save & Next Button */}
        <Button
          onClick={onSaveAndNext}
          disabled={!selectedQuantity && !manualQuantity}
          className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PlantDetailsSection;
