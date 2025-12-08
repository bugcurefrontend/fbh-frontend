import React from "react";
import { TaxDetails } from "./types";

interface TaxDetailsSectionProps {
  taxDetails: TaxDetails;
  onTaxDetailsChange: (field: keyof TaxDetails, value: string) => void;
}

const TaxDetailsSection: React.FC<TaxDetailsSectionProps> = ({
  taxDetails,
  onTaxDetailsChange,
}) => {
  return (
    <div className="bg-white border border-[#E8E8E9] rounded-2xl">
      <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-6">
        Tax Details
      </h2>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Citizenship
            </label>
            <select
              value={taxDetails.citizenship}
              onChange={(e) =>
                onTaxDetailsChange("citizenship", e.target.value)
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F] placeholder:text-gray-400"
            >
              <option>Select Citizenship</option>
              <option>Indian</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              ID Type
            </label>
            <select
              value={taxDetails.idType}
              onChange={(e) => onTaxDetailsChange("idType", e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            >
              <option>PAN CARD</option>
              <option>AADHAR CARD</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Pan Card Number
            </label>
            <input
              type="text"
              value={taxDetails.panCardNumber}
              onChange={(e) =>
                onTaxDetailsChange("panCardNumber", e.target.value)
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              placeholder="Enter Pan Card Details"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Aadhar ID / Member ID
            </label>
            <input
              type="text"
              value={taxDetails.aadharId}
              onChange={(e) => onTaxDetailsChange("aadharId", e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              placeholder="Enter ID details"
            />
          </div>
        </div>

        <p className="text-[10px] text-black leading-[16px]">
          <span className=" font-bold">Note:</span> PAN Number is mandatory for
          income tax benefits under 80G. If you do not have PAN number, please
          enter any other ID. If Pan ID is left empty, the organization needs to
          pay 30% tax on the donation received.
        </p>
      </div>
    </div>
  );
};

export default TaxDetailsSection;
