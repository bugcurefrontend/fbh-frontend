"use client";

import React, { useState } from "react";
import ProgressSteps from "@/components/plant-tree/ProgressSteps";
import PlantInfoCard from "@/components/plant-tree/PlantInfoCard";
import PersonalDetailsSection from "@/components/plant-tree/PersonalDetailsSection";
import TaxDetailsSection from "@/components/plant-tree/TaxDetailsSection";
import OrderSummary from "@/components/plant-tree/OrderSummary";
import CertificatePreview from "@/components/gift-tree/CertificatePreview";
import AddRecipient from "@/components/AddRecipient";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
  Species,
} from "@/components/plant-tree/types";

const GiftTreePage = () => {
  const [step, setStep] = useState(1);
  const [orderSummary, setOrderSummary] = useState<OrderSummaryType>({
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
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);

  const speciesData: Species[] = [
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

  const updateOrderSummary = (qty: number) => {
    const co2Offset = Math.round(qty * 16.67); // Approximate calculation
    const amount = qty * 16.67; // Approximate price per tree
    setOrderSummary({
      numberOfTrees: qty,
      totalCo2Offset: `${co2Offset}Kg`,
      totalAmount: `INR ${amount.toFixed(2)}`,
    });
  };

  const handleRecipientQuantityChange = (totalTrees: number) => {
    updateOrderSummary(totalTrees);
  };

  const handleNextStep = () => {
    setStep(2);
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

  const isFormValid =
    orderSummary.numberOfTrees > 0 &&
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

        <ProgressSteps currentStep={step} />
      </div>

      <div className="lg:flex max-lg:space-y-8 md:gap-12 xl:gap-15">
        {/* Left Section */}
        <div className="lg:w-[55%]">
          {step === 1 && (
            <>
              <PlantInfoCard
                selectedQuantity={
                  orderSummary.numberOfTrees > 0
                    ? orderSummary.numberOfTrees
                    : null
                }
                manualQuantity={
                  orderSummary.numberOfTrees > 0
                    ? orderSummary.numberOfTrees.toString()
                    : ""
                }
                selectedSpeciesId={selectedSpeciesId}
                speciesData={speciesData}
                onSpeciesSelect={setSelectedSpeciesId}
                isGeoTagged={isGeoTagged}
                onGeoTaggedChange={setIsGeoTagged}
              />

              <CertificatePreview />

              {/* Recipient Details */}
              <AddRecipient
                onQuantityChange={handleRecipientQuantityChange}
                onNextStep={handleNextStep}
              />
            </>
          )}

          {step === 2 && (
            <>
              <PersonalDetailsSection
                personalDetails={personalDetails}
                onPersonalDetailsChange={handlePersonalDetailsChange}
              />

              <TaxDetailsSection
                taxDetails={taxDetails}
                onTaxDetailsChange={handleTaxDetailsChange}
              />
            </>
          )}
        </div>

        {/* Right Section - Order Summary */}
        <OrderSummary
          orderSummary={orderSummary}
          currentStep={step}
          isFormValid={isFormValid}
        />
      </div>
    </div>
  );
};

export default GiftTreePage;
