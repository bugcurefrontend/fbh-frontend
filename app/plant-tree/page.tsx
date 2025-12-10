"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProgressSteps from "@/components/plant-tree/ProgressSteps";
import PlantInfoCard from "@/components/plant-tree/PlantInfoCard";
import PlantDetailsSection from "@/components/plant-tree/PlantDetailsSection";
import PersonalDetailsSection from "@/components/plant-tree/PersonalDetailsSection";
import TaxDetailsSection from "@/components/plant-tree/TaxDetailsSection";
import OrderSummary from "@/components/plant-tree/OrderSummary";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
  Species,
} from "@/components/plant-tree/types";
import { useAuth } from "@/lib/auth-context";
import LoginDialog from "@/components/LoginDialog";

const TreeCheckout = () => {
  const [step, setStep] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [manualQuantity, setManualQuantity] = useState("");
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
    idNumber: "",
    abhyashiNumber: "",
  });

  const [isGeoTagged, setIsGeoTagged] = useState(true);
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();

  const quantities = [10, 25, 50, 100];

  const speciesData: Species[] = [
    {
      id: 1,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["geo", "non-geo"],
    },
    {
      id: 2,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["geo"],
    },
    {
      id: 3,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["non-geo"],
    },
    {
      id: 4,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["geo", "non-geo"],
    },
    {
      id: 15,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["geo"],
    },
    {
      id: 6,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["non-geo"],
    },
    {
      id: 7,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["geo", "non-geo"],
    },
    {
      id: 8,
      name: "Neem",
      botanical: "Azadirachta",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
      availableTags: ["geo", "non-geo"],
    },
  ];

  const selectedSpecies = useMemo(
    () => speciesData.find((species) => species.id === selectedSpeciesId),
    [selectedSpeciesId, speciesData]
  );

  const availableSpeciesForTag = useMemo(() => {
    const tagKey = isGeoTagged ? "geo" : "non-geo";
    return speciesData.filter((species) =>
      (species.availableTags ?? ["geo", "non-geo"]).includes(tagKey)
    );
  }, [speciesData, isGeoTagged]);

  const handleQuantitySelect = (qty: number) => {
    const normalizedQty = Math.max(1, qty);
    setSelectedQuantity(normalizedQty);
    setManualQuantity("");
    updateOrderSummary(normalizedQty);
    setSelectedLocation("Shivgarh, Madhya Pradesh");
  };

  const handleManualQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    if (!digitsOnly) {
      setManualQuantity("");
      setSelectedQuantity(null);
      setOrderSummary({
        numberOfTrees: 0,
        totalCo2Offset: "--",
        totalAmount: "--",
      });
      setSelectedLocation("Shivgarh, Madhya Pradesh");
      return;
    }

    const parsed = Math.max(1, parseInt(digitsOnly, 10));
    const value = parsed.toString();

    setManualQuantity(value);
    setSelectedQuantity(null);
    if (value && !Number.isNaN(parsed)) {
      updateOrderSummary(parsed);
      setSelectedLocation("Shivgarh, Madhya Pradesh");
    } else {
      setSelectedLocation("Shivgarh, Madhya Pradesh");
    }
  };

  const handleManualInputFocus = () => {
    setSelectedQuantity(null);
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
    if (!selectedQuantity && !manualQuantity) return;
    setStep(2);
  };

  const handlePersonalDetailsChange = (
    field: keyof PersonalDetails,
    value: string | boolean
  ) => {
    if (typeof value === "string") {
      let sanitizedValue = value;
      if (field === "pincode") {
        sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      }
      if (field === "phoneNumber") {
        sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 15);
      }
      if (field === "email") {
        sanitizedValue = value.trimStart();
      }
      if (field === "doorNo") {
        sanitizedValue = value
          .replace(/[^A-Za-z0-9\s,./#-]/g, "")
          .slice(0, 120);
      }
      setPersonalDetails((prev) => ({ ...prev, [field]: sanitizedValue }));
      return;
    }
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleTaxDetailsChange = (field: keyof TaxDetails, value: string) => {
    if (field === "citizenship") {
      setTaxDetails((prev) => ({
        ...prev,
        citizenship: value,
        idType: value === "Indian" ? "PAN CARD" : "PASSPORT NUMBER",
        idNumber: "",
      }));
      return;
    }
    if (field === "idType") {
      setTaxDetails((prev) => ({ ...prev, idType: value, idNumber: "" }));
      return;
    }
    setTaxDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleGeoTaggedChange = (value: boolean) => {
    const availableTags = selectedSpecies?.availableTags ?? ["geo", "non-geo"];
    const tagKey = value ? "geo" : "non-geo";
    if (!availableTags.includes(tagKey)) {
      const allowedTag = availableTags.includes("geo")
        ? "geotagged"
        : "non-geotagged";
      setAvailabilityMessage(`Only ${allowedTag} trees are available.`);
      return;
    }
    setAvailabilityMessage("");
    setIsGeoTagged(value);
  };

  useEffect(() => {
    setAvailabilityMessage("");
  }, [selectedSpeciesId]);

  useEffect(() => {
    if (
      availableSpeciesForTag.length > 0 &&
      !availableSpeciesForTag.find(
        (species) => species.id === selectedSpeciesId
      )
    ) {
      setSelectedSpeciesId(availableSpeciesForTag[0].id);
    }
  }, [availableSpeciesForTag, selectedSpeciesId]);

  const emailValid = useMemo(
    () =>
      personalDetails.email === "" ||
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(personalDetails.email),
    [personalDetails.email]
  );

  const phoneValid = useMemo(
    () =>
      personalDetails.phoneNumber === "" ||
      /^[0-9]{6,15}$/.test(personalDetails.phoneNumber),
    [personalDetails.phoneNumber]
  );

  const pincodeValid = useMemo(
    () =>
      personalDetails.pincode === "" ||
      /^[0-9]{4,10}$/.test(personalDetails.pincode),
    [personalDetails.pincode]
  );

  const idNumberValid = useMemo(() => {
    if (!taxDetails.idNumber) return true;
    if (taxDetails.idType === "PAN CARD") {
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(taxDetails.idNumber);
    }
    if (taxDetails.idType === "AADHAR CARD") {
      return /^[0-9]{12}$/.test(taxDetails.idNumber);
    }
    if (taxDetails.idType === "PASSPORT NUMBER") {
      return /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/i.test(
        taxDetails.idNumber
      );
    }
    return /^[A-Za-z0-9]{5,20}$/.test(taxDetails.idNumber);
  }, [taxDetails.idNumber, taxDetails.idType]);

  const isFormValid =
    personalDetails.firstName.trim() !== "" &&
    personalDetails.lastName.trim() !== "" &&
    personalDetails.email.trim() !== "" &&
    emailValid &&
    personalDetails.doorNo.trim() !== "" &&
    personalDetails.pincode.trim() !== "" &&
    pincodeValid &&
    personalDetails.phoneNumber.trim() !== "" &&
    phoneValid &&
    personalDetails.currency.trim() !== "" &&
    personalDetails.country.trim() !== "" &&
    personalDetails.state.trim() !== "" &&
    personalDetails.city.trim() !== "" &&
    taxDetails.citizenship.trim() !== "" &&
    taxDetails.idNumber.trim() !== "" &&
    idNumberValid;

  // Show login dialog when page loads if user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasChosenGuest) {
      setIsLoginDialogOpen(true);
    } else if (isAuthenticated) {
      setIsLoginDialogOpen(false);
    }
  }, [isLoading, isAuthenticated, hasChosenGuest]);

  // Close dialog when user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoginDialogOpen(false);
    }
  }, [isAuthenticated]);

  const handleContinueAsGuest = () => {
    setHasChosenGuest(true);
    setIsLoginDialogOpen(false);
  };

  const handleSignIn = () => {
    login();
    setIsLoginDialogOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // If dialog is being closed, treat it as continuing as guest
      handleContinueAsGuest();
    }
  };

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
                selectedQuantity={selectedQuantity}
                manualQuantity={manualQuantity}
                selectedSpeciesId={selectedSpeciesId}
                speciesData={availableSpeciesForTag}
                onSpeciesSelect={setSelectedSpeciesId}
                isGeoTagged={isGeoTagged}
                onGeoTaggedChange={handleGeoTaggedChange}
                availabilityMessage={availabilityMessage}
              />

              <PlantDetailsSection
                quantities={quantities}
                selectedQuantity={selectedQuantity}
                manualQuantity={manualQuantity}
                onQuantitySelect={handleQuantitySelect}
                onManualQuantityChange={handleManualQuantityChange}
                onManualInputFocus={handleManualInputFocus}
                onSaveAndNext={handleSaveAndNext}
              />
            </>
          )}

          {step === 2 && (
            <>
              <PersonalDetailsSection
                personalDetails={personalDetails}
                onPersonalDetailsChange={handlePersonalDetailsChange}
                emailError={
                  !emailValid && personalDetails.email
                    ? "Enter a valid email address."
                    : ""
                }
                phoneError={
                  !phoneValid && personalDetails.phoneNumber
                    ? "Enter 6-15 digits only."
                    : ""
                }
                pincodeError={
                  !pincodeValid && personalDetails.pincode
                    ? "Use 4-10 digits only."
                    : ""
                }
              />

              <TaxDetailsSection
                taxDetails={taxDetails}
                onTaxDetailsChange={handleTaxDetailsChange}
                idNumberError={
                  !idNumberValid && taxDetails.idNumber
                    ? "Enter a valid ID number for the selected ID type."
                    : ""
                }
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

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleDialogClose}
        onSignIn={handleSignIn}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </div>
  );
};

export default TreeCheckout;
