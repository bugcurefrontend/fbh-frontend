import React from "react";
import { TaxDetails } from "./types";
import CountryAutocomplete from "@/components/ui/CountryAutocomplete";
import validations from "@/utils/validations";
import { indianIdTypes, foreignIdTypes, INDIA_COUNTRY_CODE } from "@/utils/tax-constants";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

interface TaxDetailsSectionProps {
  taxDetails: TaxDetails;
  onTaxDetailsChange: (field: keyof TaxDetails, value: any) => void;
  idNumberError?: string;
}

const TaxDetailsSection: React.FC<TaxDetailsSectionProps> = ({
  taxDetails,
  onTaxDetailsChange,
  idNumberError,
}) => {
  // Determine if citizenship is Indian based on country numeric code
  const isIndianCitizen =
    typeof taxDetails.citizenship === "object" &&
    taxDetails.citizenship?.id === INDIA_COUNTRY_CODE;

  // Get ID type options based on citizenship
  const idTypeOptions = isIndianCitizen ? indianIdTypes : foreignIdTypes;

  const getValidationPattern = (type?: string) => {
    switch (type) {
      case "pan":
        return validations.panNo;
      case "aadhar":
        return validations.aadhar;
      case "license":
        return validations.license;
      case "voter":
        return validations.voterId;
      case "passport":
        return validations.passport;
      case "ration":
        return validations.ration;
      default:
        return { value: /.*/, message: "" };
    }
  };

  const formatIdValue = (rawValue: string, idType?: string) => {
    const trimmed = rawValue.trim().toUpperCase();

    if (idType === "pan") {
      return trimmed.replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
    }
    if (idType === "aadhar") {
      return trimmed.replace(/[^0-9]/g, "").slice(0, 12);
    }
    if (idType === "passport") {
      return trimmed.replace(/[^A-Za-z0-9-]/g, "").slice(0, 20);
    }
    // For other ID types (license, voter, ration)
    return trimmed.replace(/[^A-Za-z0-9-]/g, "").slice(0, 20);
  };

  return (
    <div className="bg-white border border-[#E8E8E9] rounded-[16px] md:rounded-[8px]">
      <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-4 md:px-6">
        Tax Details
      </h2>

      <div className="p-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Citizenship <span className="text-red-500">*</span>
            </label>
            <CountryAutocomplete
              value={typeof taxDetails.citizenship === "object" ? taxDetails.citizenship : null}
              onChange={(value) => onTaxDetailsChange("citizenship", value)}
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
              <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-[8px] text-[#090C0F] shadow-xs text-base">
                <SelectValue placeholder="Select ID Type" />
              </SelectTrigger>

              <SelectContent>
                {idTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mb-6 mb-2">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              {taxDetails.idType
                ? `${idTypeOptions.find(opt => opt.value === taxDetails.idType)?.label || "ID"} Number`
                : "ID Number"} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={20}
              value={taxDetails.idNumber}
              onChange={(e) =>
                onTaxDetailsChange("idNumber", formatIdValue(e.target.value, taxDetails.idType))
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder={`Enter ${idTypeOptions.find(opt => opt.value === taxDetails.idType)?.label || "ID"} Number`}
              disabled={!taxDetails.idType}
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
            </label>
            <input
              type="text"
              maxLength={20}
              value={taxDetails.abhyashiNumber}
              onChange={(e) =>
                onTaxDetailsChange(
                  "abhyashiNumber",
                  e.target.value.trim().toUpperCase()
                )
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder="Enter Abhyasi ID"
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
