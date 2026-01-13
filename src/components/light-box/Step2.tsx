import React from "react";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { PhoneInput } from "@/components/ui/PhoneInput";
import CountryAutocomplete from "@/components/ui/CountryAutocomplete";
import { City, Country } from "@/lib/location-utils";
import countriesData from "@/assets/data/countries.json";
import { PersonalDetails } from "@/components/plant-tree/types";

interface Step2Props {
  personalDetails: PersonalDetails;
  handlePersonalDetailsChange: (
    field: keyof PersonalDetails,
    value: string | boolean | City | Country | null
  ) => void;
  isStep2Valid: boolean;
  handleSaveAndNext: () => void;
  emailValid: boolean;
  phoneValid: boolean;
  pincodeValid: boolean;
}

const Step2: React.FC<Step2Props> = ({
  personalDetails,
  handlePersonalDetailsChange,
  isStep2Valid,
  handleSaveAndNext,
  emailValid,
  phoneValid,
  pincodeValid,
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
        ? findCountryByCode(personalDetails.country as string) || {
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

  const cityDefaultCountry =
    (typeof personalDetails.country === "object" && personalDetails.country?.code)
      ? personalDetails.country.code
      : (typeof personalDetails.country === "string" && personalDetails.country.length === 2)
        ? personalDetails.country
        : (typeof personalDetails.region === "string" && personalDetails.region.length === 2)
          ? personalDetails.region
          : undefined;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-gray-800 text-sm font-medium md:text-base">
          I want the name to be displayed on the donors list
        </span>
        <Switch
          checked={personalDetails.displayOnDonorsList}
          onCheckedChange={(val) =>
            handlePersonalDetailsChange("displayOnDonorsList", val)
          }
          className={personalDetails.displayOnDonorsList ? "bg-[#003399]" : ""}
        />
      </div>
      <div className="flex flex-col md:space-y-[23px] space-y-4">
        {/* Personal details form fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={15}
              value={personalDetails.firstName}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^A-Za-z\s'-]/g, "")
                  .slice(0, 15);
                if (/^[A-Za-z\s'-]*$/.test(value)) {
                  handlePersonalDetailsChange("firstName", value);
                }
              }}
              placeholder="First Name"
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={15}
              value={personalDetails.lastName}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^A-Za-z\s'-]/g, "")
                  .slice(0, 15);
                if (/^[A-Za-z\s'-]*$/.test(value)) {
                  handlePersonalDetailsChange("lastName", value);
                }
              }}
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
              <input
                type="text"
                maxLength={50}
                value={personalDetails.email}
                onChange={(e) =>
                  handlePersonalDetailsChange("email", e.target.value)
                }
                placeholder="Enter Email"
                className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              />
            </div>
            {!emailValid && personalDetails.email && (
              <p className="text-xs text-red-500 font-medium mt-1">
                Please enter a valid email.
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              Phone number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              name="phoneNumber"
              value={personalDetails.phoneNumber}
              country={(personalDetails.region || "IN").toUpperCase() as "IN" | "US" | "GB" | "AE"}
              onChange={({ phoneNumber, countryCode }) => {
                handlePersonalDetailsChange("phoneNumber", phoneNumber);
                handlePersonalDetailsChange("region", countryCode);
              }}
              error={
                !phoneValid && personalDetails.phoneNumber
                  ? "Please enter a valid phone number."
                  : undefined
              }
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
            Door no, Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            maxLength={100}
            value={personalDetails.doorNo}
            onChange={(e) =>
              handlePersonalDetailsChange("doorNo", e.target.value)
            }
            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
            placeholder="Enter address"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              City <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={
                typeof personalDetails.city === "string"
                  ? personalDetails.city
                  : personalDetails.city?.name || ""
              }
              onChange={(value) => handlePersonalDetailsChange("city", value)}
              options={["Nagpur", "Pune", "Mumbai"]}
              placeholder="Select City"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalDetails.state}
              onChange={(e) => handlePersonalDetailsChange("state", e.target.value)}
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder="Select State"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <CountryAutocomplete
              value={countryValue}
              onChange={(country) => {
                handlePersonalDetailsChange("country", country);
                if (country?.code) handlePersonalDetailsChange("region", country.code);
              }}
              label="Country"
              placeholder="Select Country"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#454950] font-semibold">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={10}
              value={personalDetails.pincode}
              onChange={(e) =>
                handlePersonalDetailsChange(
                  "pincode",
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-[8px] text-[#090C0F] shadow-xs"
              placeholder="Enter Pincode"
            />
            {!pincodeValid && personalDetails.pincode && (
              <p className="text-xs text-red-500 font-medium mt-1">
                Please enter a valid pincode.
              </p>
            )}
          </div>
        </div>
        <Button
          onClick={handleSaveAndNext}
          disabled={!isStep2Valid}
          className="w-full h-11 md:h-12 text-white bg-[#003399] rounded-[8px] text-base font-semibold md:leading-6.5 md:font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default Step2;
