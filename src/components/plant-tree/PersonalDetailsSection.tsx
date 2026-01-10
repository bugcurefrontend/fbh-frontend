import React from "react";
import { Mail } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City, Country } from "@/lib/location-utils";
import { PersonalDetails } from "./types";
import CityAutocomplete from "@/components/ui/CityAutocomplete";
import CountryAutocomplete from "@/components/ui/CountryAutocomplete";
import { PhoneInput } from "@/components/ui/PhoneInput";
import countriesData from "@/assets/data/countries.json";

interface PersonalDetailsSectionProps {
  personalDetails: PersonalDetails;
  onPersonalDetailsChange: (
    field: keyof PersonalDetails,
    value: string | boolean | City | Country | null
  ) => void;
  emailError?: string;
  phoneError?: string;
  pincodeError?: string;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  personalDetails,
  onPersonalDetailsChange,
  emailError,
  phoneError,
  pincodeError,
}) => {
  // Helper function to find country by code
  const findCountryByCode = (code: string): Country | null => {
    const countryData = countriesData.find(
      (c: any) => c.countryCode === code.toUpperCase()
    );
    if (countryData) {
      return {
        id: countryData.numeric,
        name: countryData.englishShortName,
        code: countryData.countryCode,
        active: true,
        numeric: countryData.numeric,
      };
    }
    return null;
  };

  const countryValue =
    typeof personalDetails.country === "object" && personalDetails.country !== null
      ? personalDetails.country
      : personalDetails.country
        ? findCountryByCode(personalDetails.country) || {
          id: personalDetails.country,
          name: personalDetails.country,
          code: personalDetails.country,
          active: true,
        }
        : null;

  const cityValue =
    typeof personalDetails.city === "object" && personalDetails.city !== null
      ? personalDetails.city
      : personalDetails.city
        ? ({ id: "", name: personalDetails.city } as City)
        : null;

  // Pass country code (ISO2) for city filtering when available. If only a country name is present, prefer `region` or leave undefined to avoid invalid API path like `/cities/India/...` which can return 403.
  const cityDefaultCountry =
    // If `country` is an object with a `code`, use that
    (typeof personalDetails.country === "object" && personalDetails.country?.code)
      ? personalDetails.country.code
      // If `country` is a 2-letter string, assume it's an ISO2 code
      : (typeof personalDetails.country === "string" && personalDetails.country.length === 2)
        ? personalDetails.country
        // Fallback to explicit `region` (if it's an ISO2 code)
        : (typeof personalDetails.region === "string" && personalDetails.region.length === 2)
          ? personalDetails.region
          : undefined;

  return (
    <div className="bg-white border border-[#E8E8E9] rounded-[16px] md:rounded-[8px] mb-8">
      <h2 className="border-b border-[#E8E8E9] md:text-lg font-semibold md:font-bold py-4 px-4 md:px-6">
        Personal Details
      </h2>

      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                First Name
              </label>
              <input
                type="text"
                maxLength={30}
                value={personalDetails.firstName}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-z\s'-]/g, "")
                    .slice(0, 30);
                  if (/^[A-Za-z\s'-]*$/.test(value)) {
                    onPersonalDetailsChange("firstName", value);
                  }
                }}
                placeholder="jason"
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                Last Name
              </label>
              <input
                type="text"
                maxLength={30}
                value={personalDetails.lastName}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-z\s'-]/g, "")
                    .slice(0, 30);
                  if (/^[A-Za-z\s'-]*$/.test(value)) {
                    onPersonalDetailsChange("lastName", value);
                  }
                }}
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
                placeholder="Manson"
              />
            </div>
          </div>

          <div className="flex items-center justify-between max-sm:gap-10">
            <span className="text-[#212529]">
              I want my name to be displayed on the donors list
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={personalDetails.displayOnDonorsList}
                onChange={(e) =>
                  onPersonalDetailsChange(
                    "displayOnDonorsList",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003399]"></div>
            </label>
          </div>
        </div>
        <div className="">
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            Email
          </label>

          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
            <input
              type="text"
              maxLength={50}
              value={personalDetails.email}
              onChange={(e) =>
                onPersonalDetailsChange("email", e.target.value.trimStart())
              }
              placeholder="olivia@heartfulness.com"
              className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
            />
          </div>
          {emailError && (
            <p className="text-xs text-red-500 font-medium mt-1">
              {emailError}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Phone number
            </label>

            <PhoneInput
              name="phoneNumber"
              value={personalDetails.phoneNumber}
              country={
                personalDetails.region && personalDetails.region.length === 2
                  ? (personalDetails.region as any)
                  : typeof personalDetails.country === 'object' && personalDetails.country?.code
                    ? (personalDetails.country.code as any)
                    : typeof personalDetails.country === 'string' && personalDetails.country.length === 2
                      ? (personalDetails.country as any)
                      : "IN"
              }
              onChange={({ countryCode, phoneNumber }) => {
                // always keep digits-only phone and let the hook sanitize
                onPersonalDetailsChange("phoneNumber", phoneNumber);
                if (countryCode) {
                  // Sync both region (ISO2) and country so other components stay consistent
                  onPersonalDetailsChange("region", countryCode);
                  onPersonalDetailsChange("country", countryCode);
                }
              }}
              className="w-full"
            />
            {phoneError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {phoneError}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Currency
            </label>
            <Select
              value={personalDetails.currency}
              onValueChange={(value) =>
                onPersonalDetailsChange("currency", value)
              }
            >
              <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-[8px] text-[#090C0F] shadow-xs text-base">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">
                  <Image
                    src="/images/flag.png"
                    alt="ind"
                    width={24}
                    height={24}
                    className="min-w-6 min-h-6"
                  />
                  <span className="ml-1 text-sm font-normal leading-5 text-center align-middle">
                    INR
                  </span>
                </SelectItem>
                <SelectItem value="us">
                  <Image
                    src="/images/us.png"
                    alt="usa"
                    width={24}
                    height={24}
                    className="min-w-6 min-h-6"
                  />
                  <span className="ml-1 text-sm font-normal leading-5 text-center align-middle">
                    USD
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="">
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            Door no, Street Address
          </label>
          <input
            type="text"
            maxLength={100}
            value={personalDetails.doorNo}
            onChange={(e) =>
              onPersonalDetailsChange(
                "doorNo",
                e.target.value.replace(/[^A-Za-z0-9\s,./#-]/g, "").slice(0, 100)
              )
            }
            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
            placeholder="Enter address"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <CityAutocomplete
              value={cityValue}
              defaultCountry={cityDefaultCountry}
              onChange={(city) => {
                onPersonalDetailsChange("city", city || null);
                if (!city?.id) {
                  onPersonalDetailsChange("state", "");
                  return;
                }
                if (city?.state) onPersonalDetailsChange("state", city.state);
                // Don't update country from city - keep existing country selection
                // City API returns country name, but we need country object with code for PhoneInput
              }}
              label="City"
              placeholder="Select City"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              State
            </label>
            <input
              type="text"
              value={personalDetails.state}
              onChange={(e) => onPersonalDetailsChange("state", e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder="Select State"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <CountryAutocomplete
              value={countryValue}
              onChange={(country) => {
                onPersonalDetailsChange("country", country);
                if (country?.code) onPersonalDetailsChange("region", country.code);
              }}
              label="Country"
              placeholder="Select Country"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Pin / Zip Code
            </label>
            <input
              type="text"
              maxLength={10}
              value={personalDetails.pincode}
              onChange={(e) =>
                onPersonalDetailsChange(
                  "pincode",
                  e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                )
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder="Enter Pincode"
            />
            {pincodeError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {pincodeError}
              </p>
            )}
          </div>
        </div>
        <p className="text-[10px] text-black leading-[16px] mt-2">
          <span className=" font-bold">Note:</span> Please provide the address
          in full, without which the organization needs to pay 30% tax on these
          donations.
        </p>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
