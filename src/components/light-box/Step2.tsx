import React from "react";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combobox";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PersonalDetails } from "@/components/plant-tree/types";

interface Step2Props {
  personalDetails: PersonalDetails;
  handlePersonalDetailsChange: (
    field: keyof PersonalDetails,
    value: string | boolean
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
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalDetails.firstName}
              onChange={(e) =>
                handlePersonalDetailsChange("firstName", e.target.value)
              }
              placeholder="First Name"
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
              onChange={(e) =>
                handlePersonalDetailsChange("lastName", e.target.value)
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63676C] w-5 h-5" />
              <input
                type="text"
                value={personalDetails.email}
                onChange={(e) =>
                  handlePersonalDetailsChange("email", e.target.value)
                }
                placeholder="Enter Email"
                className="w-full pl-10 px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              />
            </div>
            {!emailValid && personalDetails.email && (
              <p className="text-xs text-red-500 font-medium mt-1">
                Please enter a valid email.
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="flex relative w-full">
              <Select
                value={personalDetails.region}
                onValueChange={(value) =>
                  handlePersonalDetailsChange("region", value)
                }
              >
                <SelectTrigger className="absolute left-3 top-1/2 -translate-y-1/2 w-auto border-none bg-transparent p-0 h-auto">
                  <SelectValue placeholder="+91" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+91">🇮🇳 +91</SelectItem>
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="tel"
                value={personalDetails.phoneNumber}
                onChange={(e) =>
                  handlePersonalDetailsChange(
                    "phoneNumber",
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                placeholder="Enter Number"
                className="pl-20 w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
              />
            </div>
            {!phoneValid && personalDetails.phoneNumber && (
              <p className="text-xs text-red-500 font-medium mt-1">
                Please enter a valid phone number.
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
            Door no, Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalDetails.doorNo}
            onChange={(e) =>
              handlePersonalDetailsChange("doorNo", e.target.value)
            }
            className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
            placeholder="Enter address"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              City <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={personalDetails.city}
              onChange={(value) => handlePersonalDetailsChange("city", value)}
              options={["Nagpur", "Pune", "Mumbai"]}
              placeholder="Select City"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              State <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={personalDetails.state}
              onChange={(value) => handlePersonalDetailsChange("state", value)}
              options={["Maharashtra", "Madhya Pradesh", "Gujarat"]}
              placeholder="Select State"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Country <span className="text-red-500">*</span>
            </label>
            <ComboBox
              value={personalDetails.country}
              onChange={(value) =>
                handlePersonalDetailsChange("country", value)
              }
              options={["India", "USA", "Canada"]}
              placeholder="Select Country"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-[#344054] font-semibold">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={personalDetails.pincode}
              onChange={(e) =>
                handlePersonalDetailsChange(
                  "pincode",
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
              className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
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
          className="w-full h-12 text-white bg-[#003399] rounded-lg text-base font-bold hover:bg-[#013eb9] disabled:bg-gray-300"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step2;
