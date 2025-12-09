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
import { PersonalDetails } from "./types";
import { ComboBox } from "../ui/combobox";

interface PersonalDetailsSectionProps {
  personalDetails: PersonalDetails;
  onPersonalDetailsChange: (
    field: keyof PersonalDetails,
    value: string | boolean
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
  return (
    <div className="bg-white border border-[#E8E8E9] rounded-2xl mb-8">
      <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-6">
        Personal Details
      </h2>

      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalDetails.firstName}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-z\s'-]/g, "")
                    .slice(0, 40);
                  if (/^[A-Za-z\s'-]*$/.test(value)) {
                    onPersonalDetailsChange("firstName", value);
                  }
                }}
                placeholder="jason"
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={personalDetails.lastName}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^A-Za-z\s'-]/g, "")
                    .slice(0, 40);
                  if (/^[A-Za-z\s'-]*$/.test(value)) {
                    onPersonalDetailsChange("lastName", value);
                  }
                }}
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
                placeholder="Manson"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
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
            Email <span className="text-red-500">*</span>
          </label>

          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
            <input
              type="text"
              value={personalDetails.email}
              onChange={(e) =>
                onPersonalDetailsChange("email", e.target.value.trimStart())
              }
              placeholder="olivia@heartfulness.com"
              className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            />
          </div>
          {emailError && (
            <p className="text-xs text-red-500 font-medium mt-1">
              {emailError}
            </p>
          )}
        </div>

        <div className="">
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            Door no, Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalDetails.doorNo}
            onChange={(e) =>
              onPersonalDetailsChange(
                "doorNo",
                e.target.value.replace(/[^A-Za-z0-9\s,./#-]/g, "").slice(0, 120)
              )
            }
            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            placeholder="Enter address"
          />
          <p className="text-[10px] text-black leading-[16px] mt-2">
            <span className=" font-bold">Note:</span> Please provide the address
            in full, without which the organization needs to pay 30% tax on
            these donations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalDetails.pincode}
              onChange={(e) =>
                onPersonalDetailsChange(
                  "pincode",
                  e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                )
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              placeholder="Enter Pincode"
            />
            {pincodeError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {pincodeError}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Phone number <span className="text-red-500">*</span>
            </label>

            <div className="flex relative w-full">
              {/* Region Select */}
              <Select
                value={personalDetails.region}
                onValueChange={(value) =>
                  onPersonalDetailsChange("region", value)
                }
              >
                <SelectTrigger className="absolute left-3 top-1/2 -translate-y-1/2 w-auto border-none bg-transparent p-0 h-auto shadow-none focus:ring-0 focus:outline-none hover:bg-transparent">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="+91">
                    <span className="text-sm flex items-center gap-1">
                      🇮🇳 +91
                    </span>
                  </SelectItem>
                  <SelectItem value="+1">
                    <span className="text-sm flex items-center gap-1">
                      🇺🇸 +1
                    </span>
                  </SelectItem>
                  <SelectItem value="+44">
                    <span className="text-sm flex items-center gap-1">
                      🇬🇧 +44
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Phone Number Input */}
              <input
                type="tel"
                value={personalDetails.phoneNumber}
                onChange={(e) =>
                  onPersonalDetailsChange(
                    "phoneNumber",
                    e.target.value.replace(/[^0-9]/g, "").slice(0, 15)
                  )
                }
                placeholder="Enter phone number"
                className="pl-20 w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base"
              />
            </div>
            {phoneError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {phoneError}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Currency <span className="text-red-500">*</span>
            </label>
            <Select
              value={personalDetails.currency}
              onValueChange={(value) =>
                onPersonalDetailsChange("currency", value)
              }
            >
              <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base">
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
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Country <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={personalDetails.country}
              onChange={(value) => onPersonalDetailsChange("country", value)}
              options={["India", "USA", "Canada", "UK"]}
              placeholder="Select Country"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              State <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={personalDetails.state}
              onChange={(value) => onPersonalDetailsChange("state", value)}
              options={[
                "Maharashtra",
                "Madhya Pradesh",
                "Gujarat",
                "Karnataka",
              ]}
              placeholder="Select State"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              City <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={personalDetails.city}
              onChange={(value) => onPersonalDetailsChange("city", value)}
              options={["Nagpur", "Pune", "Mumbai", "Kolhapur", "Thane"]}
              placeholder="Select City"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
