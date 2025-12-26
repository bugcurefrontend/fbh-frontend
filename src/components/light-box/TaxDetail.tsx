import React from "react";
import { ComboBox } from "../ui/combobox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

export interface TaxDetails {
  citizenship: string;
  idType: string;
  idNumber: string;
  abhyashiNumber: string;
}

interface TaxDetailProps {
  taxDetails: TaxDetails;
  onTaxDetailsChange: (field: keyof TaxDetails, value: string) => void;
  idNumberError?: string;
}

const TaxDetail: React.FC<TaxDetailProps> = ({
  taxDetails,
  onTaxDetailsChange,
  idNumberError,
}) => {
  const idTypeOptions =
    taxDetails.citizenship === "Indian"
      ? [
          "PAN CARD",
          "AADHAR CARD",
          "DRIVING LICENSE",
          "VOTER ID CARD",
          "PASSPORT NUMBER",
          "RATION CARD",
        ]
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
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
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
          <Select
            value={taxDetails.idType}
            onValueChange={(value) => onTaxDetailsChange("idType", value)}
          >
            <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base">
              <SelectValue placeholder="Select ID Type" />
            </SelectTrigger>

            <SelectContent>
              {idTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            {taxDetails.idType === "PAN CARD"
              ? "PAN Card Number"
              : taxDetails.idType === "AADHAR CARD"
              ? "Aadhar Number"
              : taxDetails.idType === "PASSPORT NUMBER"
              ? "Passport Number"
              : taxDetails.idType === "RATION CARD"
              ? "Ration Card Number"
              : taxDetails.idType === "DRIVING LICENSE"
              ? "Driving License Number"
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
        <div>
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            Abhyasi ID/ Member ID
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={taxDetails.abhyashiNumber}
            onChange={(e) =>
              onTaxDetailsChange(
                "abhyashiNumber",
                formatIdValue(e.target.value)
              )
            }
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
  );
};

export default TaxDetail;
