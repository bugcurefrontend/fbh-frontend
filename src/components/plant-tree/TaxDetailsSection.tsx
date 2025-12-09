import React from "react";
import { TaxDetails } from "./types";
import { ComboBox } from "../ui/combobox";

interface TaxDetailsSectionProps {
  taxDetails: TaxDetails;
  onTaxDetailsChange: (field: keyof TaxDetails, value: string) => void;
  idNumberError?: string;
}

const TaxDetailsSection: React.FC<TaxDetailsSectionProps> = ({
  taxDetails,
  onTaxDetailsChange,
  idNumberError,
}) => {
  const idTypeOptions =
    taxDetails.citizenship === "Indian"
      ? ["PAN CARD", "AADHAR CARD", "DRIVING LICENSE", "VOTER ID CARD"]
      : ["PAN CARD", "PASSPORT NUMBER"];

  const formatIdValue = (rawValue: string) => {
    const trimmed = rawValue.trim();
    if (taxDetails.idType === "PAN CARD") {
      return trimmed
        .replace(/[^A-Za-z0-9]/g, "")
        .toUpperCase()
        .slice(0, 10);
    }
    if (taxDetails.idType === "AADHAR CARD") {
      return trimmed.replace(/[^0-9]/g, "").slice(0, 12);
    }
    if (taxDetails.idType === "PASSPORT NUMBER") {
      return trimmed
        .replace(/[^A-Za-z0-9]/g, "")
        .toUpperCase()
        .slice(0, 9);
    }
    return trimmed
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase()
      .slice(0, 20);
  };

  return (
    <div className="bg-white border border-[#E8E8E9] rounded-2xl">
      <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-6">
        Tax Details
      </h2>

      <div className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              City <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={taxDetails.citizenship}
              onChange={(value) => onTaxDetailsChange("citizenship", value)}
              options={["Indian", "NRI", "Other"]}
              placeholder="Select Citizenship"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              ID Type <span className="text-red-500">*</span>
            </label>
            <select
              value={taxDetails.idType}
              onChange={(e) => onTaxDetailsChange("idType", e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            >
              {idTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              {taxDetails.idType === "PAN CARD"
                ? "PAN Card Number"
                : taxDetails.idType === "AADHAR CARD"
                ? "Aadhar Number"
                : taxDetails.idType === "PASSPORT NUMBER"
                ? "Passport Number"
                : "ID Number"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={taxDetails.idNumber}
              onChange={(e) =>
                onTaxDetailsChange("idNumber", formatIdValue(e.target.value))
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              placeholder={`Enter ${
                taxDetails.idType === "PAN CARD"
                  ? "PAN"
                  : taxDetails.idType === "AADHAR CARD"
                  ? "Aadhar"
                  : taxDetails.idType === "PASSPORT NUMBER"
                  ? "Passport"
                  : "ID"
              } details`}
            />
            {idNumberError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {idNumberError}
              </p>
            )}
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
