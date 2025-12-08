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

interface PersonalDetailsSectionProps {
  personalDetails: PersonalDetails;
  onPersonalDetailsChange: (
    field: keyof PersonalDetails,
    value: string | boolean
  ) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  personalDetails,
  onPersonalDetailsChange,
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
                First Name
              </label>
              <input
                type="text"
                value={personalDetails.firstName}
                onChange={(e) =>
                  onPersonalDetailsChange("firstName", e.target.value)
                }
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
                placeholder="Jason"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
                Last Name
              </label>
              <input
                type="text"
                value={personalDetails.lastName}
                onChange={(e) =>
                  onPersonalDetailsChange("lastName", e.target.value)
                }
                className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
                placeholder="Mason"
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
            Email
          </label>

          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
            <input
              type="text"
              value={personalDetails.email}
              onChange={(e) => onPersonalDetailsChange("email", e.target.value)}
              placeholder="olivia@heartfulness.com"
              className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            />
          </div>
        </div>

        <div className="">
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            Door no, Street Address
          </label>
          <input
            type="text"
            value={personalDetails.doorNo}
            onChange={(e) => onPersonalDetailsChange("doorNo", e.target.value)}
            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            placeholder="Enter address"
          />
          <p className="text-[10px] text-black leading-[16px] mt-2">
            <span className=" font-bold">Note:</span> Please provide the address
            in full, without which the organization needs to pay 30% tax onthese
            donations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Pincode
            </label>
            <input
              type="text"
              value={personalDetails.pincode}
              onChange={(e) =>
                onPersonalDetailsChange("pincode", e.target.value)
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              placeholder="Enter Pincode"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Phone number
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
                  <SelectValue placeholder="IN" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="in">
                    <span className="text-sm">+91</span>
                  </SelectItem>
                  <SelectItem value="us">
                    <span className="text-sm">+1</span>
                  </SelectItem>
                  <SelectItem value="uk">
                    <span className="text-sm">+44</span>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Phone Number Input */}
              <input
                type="tel"
                value={personalDetails.phoneNumber}
                onChange={(e) =>
                  onPersonalDetailsChange("phoneNumber", e.target.value)
                }
                placeholder="Enter phone number"
                className="pl-16 w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
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
              Country
            </label>
            <Select
              value={personalDetails.country}
              onValueChange={(value) =>
                onPersonalDetailsChange("country", value)
              }
            >
              <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="US">US</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              State
            </label>
            <Select
              value={personalDetails.state}
              onValueChange={(value) => onPersonalDetailsChange("state", value)}
            >
              <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="MP">MP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              City
            </label>
            <Select
              value={personalDetails.city}
              onValueChange={(value) => onPersonalDetailsChange("city", value)}
            >
              <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shivgarh">Shivgarh</SelectItem>
                <SelectItem value="Nagpur">Nagpur</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
