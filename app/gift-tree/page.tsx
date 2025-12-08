"use client";

import React, { useState } from "react";
import { Check, MapPin, Eye, Mail, Trees, SquarePen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import AddRecipient from "@/components/AddRecipient";

interface OrderSummary {
  numberOfTrees: number;
  totalCo2Offset: string;
  totalAmount: string;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  displayOnDonorsList: boolean;
  email: string;
  doorNo: string;
  pincode: string;
  region: string;
  phoneNumber: string;
  currency: string;
  country: string;
  state: string;
  city: string;
}

interface TaxDetails {
  citizenship: string;
  idType: string;
  panCardNumber: string;
  aadharId: string;
}

const GiftTreePage = () => {
  const [step, setStep] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [manualQuantity, setManualQuantity] = useState("");
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    numberOfTrees: 0,
    totalCo2Offset: "--",
    totalAmount: "--",
  });

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    displayOnDonorsList: false,
    email: "",
    doorNo: "",
    pincode: "",
    region: "",
    phoneNumber: "",
    currency: "",
    country: "",
    state: "",
    city: "",
  });

  const [taxDetails, setTaxDetails] = useState<TaxDetails>({
    citizenship: "",
    idType: "PAN CARD",
    panCardNumber: "",
    aadharId: "",
  });

  const [isGeoTagged, setIsGeoTagged] = useState(true);

  const quantities = [10, 25, 50, 100];

  const handleQuantitySelect = (qty: number) => {
    setSelectedQuantity(qty);
    setManualQuantity("");
    updateOrderSummary(qty);
    setSelectedLocation("Shivgarh, Madhya Pradesh");
  };

  const handleManualQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setManualQuantity(value);
    setSelectedQuantity(null);
    if (value) {
      updateOrderSummary(parseInt(value));
      setSelectedLocation("Shivgarh, Madhya Pradesh");
    } else {
      setSelectedLocation("Shivgarh, Madhya Pradesh");
    }
  };

  const updateOrderSummary = (qty: number) => {
    const co2Offset = Math.round(qty * 16.67); // Approximate calculation
    const amount = qty * 16.67; // Approximate price per tree
    setOrderSummary({
      numberOfTrees: qty,
      totalCo2Offset: `${co2Offset}Kg`,
      totalAmount: `INR ${amount.toFixed(2)}`,
    });
  };

  const handleSaveAndNext = () => {
    if (selectedQuantity || manualQuantity) {
      setStep(2);
    }
  };

  const handlePersonalDetailsChange = (
    field: keyof PersonalDetails,
    value: string | boolean
  ) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleTaxDetailsChange = (field: keyof TaxDetails, value: string) => {
    setTaxDetails((prev) => ({ ...prev, [field]: value }));
  };

  const speciesData = [
    {
      id: 1,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 2,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 3,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 4,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 15,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 6,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 7,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
    {
      id: 8,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
    },
  ];

  const [selected, setSelected] = useState<number | null>(1);

  const isFormValid =
    (selectedQuantity || manualQuantity) &&
    personalDetails.firstName.trim() !== "" &&
    personalDetails.lastName.trim() !== "" &&
    personalDetails.email?.trim() !== "" &&
    personalDetails.phoneNumber.trim() !== "";

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-white sm:px-16 xl:px-28 px-4 md:pt-8 pt-4 space-y-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-[Playfair_Display] font-semibold md:text-[32px] md:leading-[48px]">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="relative space-y-2">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > 1
                    ? "bg-[#003399]"
                    : step === 1
                    ? "border-2 border-[#003399]"
                    : "border-2 border-[#B7B9BB]"
                }`}
              >
                {step > 1 ? (
                  <Check strokeWidth={3} className="w-4 h-4 text-white" />
                ) : step === 1 ? (
                  <div className="w-2.5 h-2.5 bg-[#003399] rounded-full"></div>
                ) : (
                  <div className="w-2.5 h-2.5 bg-[#B7B9BB] rounded-full"></div> //
                )}
              </div>
            </div>

            {/* Line 1 */}
            <div
              className={`flex-1 h-0.5 ${
                step >= 2 ? "bg-[#003399]" : "bg-[#B7B9BB]"
              }`}
            ></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > 2
                    ? "bg-[#003399]"
                    : step === 2
                    ? "border-2 border-[#003399]"
                    : "border-2 border-[#B7B9BB]"
                }`}
              >
                {step > 2 ? (
                  <Check strokeWidth={3} className="w-4 h-4 text-white" />
                ) : step === 2 ? (
                  <div className="w-2.5 h-2.5 bg-[#003399] rounded-full"></div>
                ) : (
                  <div className="w-2.5 h-2.5 bg-[#B7B9BB] rounded-full"></div>
                )}
              </div>
            </div>

            {/* Line 2 */}
            <div
              className={`flex-1 h-0.5 ${
                step >= 3 ? "bg-[#003399]" : "bg-[#B7B9BB]"
              }`}
            ></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > 3
                    ? "bg-[#003399]"
                    : step === 3
                    ? "border-2 border-[#003399]"
                    : "border-2 border-[#B7B9BB]"
                }`}
              >
                {/* {step > 3 ? (
                  <Check strokeWidth={3} className="w-4 h-4 text-white" />
                ) : step === 3 ? (
                  <div className="w-2.5 h-2.5 bg-[#003399] rounded-full"></div>
                ) : (
                  <div className="w-2.5 h-2.5 bg-[#B7B9BB] rounded-full"></div>
                )} */}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-[#454950]">Plant Details</h1>
            <h1 className="font-semibold text-[#454950]">
              Personal & Tax Details
            </h1>
            <h1 className="font-semibold text-[#454950]">Payment</h1>
          </div>
        </div>
      </div>

      <div className="lg:flex max-lg:space-y-8 md:gap-12 xl:gap-15">
        {/* Left Section */}
        <div className="lg:w-[55%]">
          {step === 1 && (
            <>
              {/* Plant Info Card */}
              <div className="flex md:gap-6 gap-4 mb-8 bg-white border border-[#E4E4E4] rounded-2xl p-4">
                <img
                  src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop"
                  alt="Neem tree"
                  className="max-h-22 md:max-w-25 md:max-h-25 rounded object-cover"
                />
                <div className="flex flex-col justify-between w-full">
                  <div className="flex items-center justify-between">
                    {!selectedQuantity && !manualQuantity && (
                      <div className="font-semibold max-md:text-xs bg-[#E7F8F0] text-[#12B569] px-3 py-1 rounded-md">
                        Plants are geo-tagged
                      </div>
                    )}
                    {(selectedQuantity || manualQuantity) && (
                      <div className="font-semibold max-md:text-xs bg-[#FEF4E6] text-[#F78F08] px-3 py-1 rounded-md">
                        Plants are geo-tagged
                      </div>
                    )}
                    <Dialog>
                      <DialogTrigger>
                        <SquarePen color="#003399" className="cursor-pointer" />
                      </DialogTrigger>
                      <DialogContent className="px-0 py-4">
                        <DialogTitle className="border-b pb-4 px-6">
                          Select Species
                        </DialogTitle>
                        <div className="px-6 space-y-4">
                          <h1 className="flex items-baseline gap-1">
                            <span className="font-bold text-[28px] leading-[36px] text-[#090C0F]">
                              ₹ 175 /
                            </span>
                            <span className="font-semibold text-[16px] leading-[36px] text-[#003399]">
                              Tree
                            </span>
                          </h1>
                          {/* Geo-tagged Toggle */}
                          <div className="flex items-center justify-between mb-4 mt-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="
                                 text-gray-800 text-sm font-medium
                                  md:text-base"
                              >
                                I want my trees to be geo-tagged.
                              </span>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-4 h-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#E7F8F0] px-4 py-3">
                                  <p className="text-[#0D824B] text-xs md:font-semibold max-sm:max-w-36 text-center">
                                    We will geotag your trees and provide
                                    quarterly <br className="max-sm:hidden" />{" "}
                                    growth updates for the next three years.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Switch
                              checked={isGeoTagged}
                              onCheckedChange={(value) => setIsGeoTagged(value)}
                              className={isGeoTagged ? "bg-[#003399]" : ""}
                            />
                          </div>{" "}
                          <div className="mt-2 space-y-4 max-h-[400px] overflow-y-auto flex-1">
                            {speciesData.map((tree) => (
                              <div
                                key={tree.id}
                                onClick={() => setSelected(tree.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border ${
                                  selected === tree.id
                                    ? "border-[#2B56AB]"
                                    : "border-gray-200"
                                }`}
                              >
                                <Image
                                  src={tree.img}
                                  alt={tree.name}
                                  width={60}
                                  height={60}
                                  className="rounded-md object-cover"
                                />
                                <div>
                                  <h4 className="font-semibold">{tree.name}</h4>
                                  <p className="text-sm text-gray-500">
                                    {tree.botanical}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Next Button */}
                          <Button className="w-full h-12 border-1 border-[#95AAD5] text-white bg-[#003399] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100">
                            Next
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-2xl text-[#090C0F] leading-9 font-semibold">
                      Neem
                    </h1>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Trees className="w-5.5 h-5.5" />
                      <span className="md:text-base text-sm md:font-semibold">
                        Azadirachta{" "}
                      </span>
                    </div>
                  </div>
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

              {/* Recipient Details */}
              <AddRecipient />
            </>
          )}

          {step === 2 && (
            <>
              {/* Personal Details */}
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
                            handlePersonalDetailsChange(
                              "firstName",
                              e.target.value
                            )
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
                            handlePersonalDetailsChange(
                              "lastName",
                              e.target.value
                            )
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
                            handlePersonalDetailsChange(
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
                      onChange={(e) =>
                        handlePersonalDetailsChange("doorNo", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
                      placeholder="Enter address"
                    />
                    <p className="text-[10px] text-black leading-[16px] mt-2">
                      <span className=" font-bold">Note:</span> Please provide
                      the address in full, without which the organization needs
                      to pay 30% tax onthese donations.
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
                          handlePersonalDetailsChange("pincode", e.target.value)
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
                            handlePersonalDetailsChange("region", value)
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
                            handlePersonalDetailsChange(
                              "phoneNumber",
                              e.target.value
                            )
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
                          handlePersonalDetailsChange("currency", value)
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
                          handlePersonalDetailsChange("country", value)
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
                        onValueChange={(value) =>
                          handlePersonalDetailsChange("state", value)
                        }
                      >
                        <SelectTrigger className="w-full px-3.5 py-2.5 border border-[#D0D5DD] min-h-fit rounded-lg text-[#090C0F] text-base">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Maharashtra">
                            Maharashtra
                          </SelectItem>
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
                        onValueChange={(value) =>
                          handlePersonalDetailsChange("city", value)
                        }
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

              {/* Tax Details */}
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
                          handleTaxDetailsChange("citizenship", e.target.value)
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
                        onChange={(e) =>
                          handleTaxDetailsChange("idType", e.target.value)
                        }
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
                          handleTaxDetailsChange(
                            "panCardNumber",
                            e.target.value
                          )
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
                        onChange={(e) =>
                          handleTaxDetailsChange("aadharId", e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 border border-[#D0D5DD] rounded-lg text-[#090C0F]"
                        placeholder="Enter ID details"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-black leading-[16px]">
                    <span className=" font-bold">Note:</span> PAN Number is
                    mandatory for income tax benefits under 80G. If you do not
                    have PAN number, please enter any other ID. If Pan ID is
                    left empty, the organization needs to pay 30% tax on the
                    donation received.
                  </p>

                  <Button
                    variant="outline"
                    className="w-full h-12 border-1 disabled:border-[#E8E8E9] border-[#95AAD5] text-[#003399] disabled:text-[#94979A] bg-white rounded-lg text-base font-bold hover:bg-blue-50 transition-colors disabled:cursor-not-allowed disabled:opacity-100"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <div className="lg:w-[45%] sticky top-20 self-start space-y-6">
          <div className="space-y-1">
            <div className="border border-[#E8E8E9] rounded-2xl overflow-hidden">
              <h2 className="border-b border-[#E8E8E9] text-lg font-bold py-4 px-6">
                Order Summary
              </h2>

              <div className="space-y-6 p-6 bg-[#F9FCFE]">
                <div className="text-[#4C4748] flex justify-between">
                  <div className="space-y-5 text-sm">
                    <h2 className="font-bold text-base">Donation for :</h2>
                    <h2>Number Of Trees :</h2>
                    <h2>Total Co2 offset :</h2>
                    <h2>Total Amount :</h2>
                  </div>

                  <div className="space-y-4 font-bold">
                    <h2>Shivgarh, MP</h2>
                    <h2>
                      {orderSummary.numberOfTrees > 0
                        ? String(orderSummary.numberOfTrees).padStart(2, "0")
                        : "--"}
                    </h2>
                    <h2>{orderSummary.totalCo2Offset}</h2>
                    <h2>{orderSummary.totalAmount}</h2>
                  </div>
                </div>
              </div>
            </div>

            <p className="flex items-start gap-1 text-[#0A0A0A] text-xs font-medium">
              <span className="text-red-500">*</span>
              These are only estimated values as per UN standards.
            </p>
          </div>
          {step === 2 && (
            <Button
              disabled={!isFormValid || orderSummary.numberOfTrees === 0}
              className="w-full h-12 border-1 disabled:border-[#E8E8E9] disabled:bg-white border-[#95AAD5] text-white bg-[#003399] disabled:text-[#94979A] rounded-lg text-base font-bold hover:bg-[#013eb9] transition-colors disabled:cursor-not-allowed disabled:opacity-100"
            >
              Proceed to Pay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftTreePage;
