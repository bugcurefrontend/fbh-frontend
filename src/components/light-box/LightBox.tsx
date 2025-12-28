"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
} from "@/components/plant-tree/types";
import { useAuth } from "@/lib/auth-context";
import LoginDialog from "@/components/LoginDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { ChevronLeft, X } from "lucide-react";
import { useCurrency } from "@/components/CurrencySelect";
import TaxDetail from "@/components/light-box/TaxDetail";
import Step1 from "@/components/light-box/Step1";
import Step2 from "@/components/light-box/Step2";
import NewOrderSummary from "@/components/light-box/NewOrderSummary";

const LightBox: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [manualQuantity, setManualQuantity] = useState("");
  const [showBox, setShowBox] = React.useState(false);

  const { currency, currencySymbol } = useCurrency();

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
    currency: currency,
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
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();

  const [occasion, setOccasion] = useState("");

  const BASE_GEOTAGGED_RATE_INR = 175;
  const BASE_NON_GEOTAGGED_RATE_INR = 150;
  const INR_TO_USD_RATE = 80;

  const geotaggedRate =
    currency === "USD"
      ? BASE_GEOTAGGED_RATE_INR / INR_TO_USD_RATE
      : BASE_GEOTAGGED_RATE_INR;
  const nonGeotaggedRate =
    currency === "USD"
      ? BASE_NON_GEOTAGGED_RATE_INR / INR_TO_USD_RATE
      : BASE_NON_GEOTAGGED_RATE_INR;

  const quantities = [10, 25, 50, 100];

  const handleQuantitySelect = (qty: number) => {
    const normalizedQty = Math.max(1, qty);
    setSelectedQuantity(normalizedQty);
    setManualQuantity("");
    updateOrderSummary(normalizedQty);
  };

  const handleManualQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    if (!digitsOnly) {
      setManualQuantity("");
      setSelectedQuantity(null);
      updateOrderSummary(0);
      return;
    }

    const parsed = Math.max(1, parseInt(digitsOnly, 10));
    setManualQuantity(parsed.toString());
    setSelectedQuantity(null);
    updateOrderSummary(parsed);
  };

  const updateOrderSummary = (qty: number) => {
    const rate = isGeoTagged ? geotaggedRate : nonGeotaggedRate;
    const amount = qty * rate;
    setOrderSummary({
      numberOfTrees: qty,
      totalCo2Offset: `${Math.round(qty * 16.67)}Kg`,
      totalAmount: `${currencySymbol} ${amount.toFixed(2)}`,
    });
  };

  useEffect(() => {
    updateOrderSummary(
      (selectedQuantity || parseInt(manualQuantity, 10) || 0) as number
    );
  }, [isGeoTagged, currency]);

  const handleSaveAndNext = () => {
    if (
      step === 1 &&
      (selectedQuantity || manualQuantity) &&
      occasion.trim() !== ""
    ) {
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
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

  const handleGeoTaggedChange = (value: boolean) => {
    setIsGeoTagged(value);
  };

  const handleProceed = () => {
    console.log("Final Data:", {
      occasion,
      quantity: selectedQuantity || manualQuantity,
      isGeoTagged,
      personalDetails,
      taxDetails,
      orderSummary,
    });
    // Further processing logic here
  };

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(personalDetails.email),
    [personalDetails.email]
  );
  const phoneValid = useMemo(
    () => /^[0-9]{6,15}$/.test(personalDetails.phoneNumber),
    [personalDetails.phoneNumber]
  );
  const pincodeValid = useMemo(
    () => /^[0-9]{4,10}$/.test(personalDetails.pincode),
    [personalDetails.pincode]
  );

  const isStep2Valid = useMemo(() => {
    return (
      personalDetails.firstName.trim() !== "" &&
      personalDetails.lastName.trim() !== "" &&
      personalDetails.email.trim() !== "" &&
      emailValid &&
      personalDetails.doorNo.trim() !== "" &&
      personalDetails.pincode.trim() !== "" &&
      pincodeValid &&
      personalDetails.phoneNumber.trim() !== "" &&
      phoneValid &&
      personalDetails.country.trim() !== "" &&
      personalDetails.state.trim() !== "" &&
      personalDetails.city.trim() !== ""
    );
  }, [personalDetails, emailValid, phoneValid, pincodeValid]);

  const idNumberValid = useMemo(() => {
    if (!taxDetails.idNumber) return false;
    if (taxDetails.idType === "PAN CARD") {
      return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(taxDetails.idNumber);
    }
    // Add other ID validations if necessary
    return true;
  }, [taxDetails.idNumber, taxDetails.idType]);

  const isStep3Valid = useMemo(() => {
    return taxDetails.citizenship.trim() !== "" && idNumberValid;
  }, [taxDetails, idNumberValid]);

  // Login dialog logic...
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasChosenGuest) {
      setIsLoginDialogOpen(true);
    } else if (isAuthenticated) {
      setIsLoginDialogOpen(false);
    }
  }, [isLoading, isAuthenticated, hasChosenGuest]);

  const handleContinueAsGuest = () => {
    setHasChosenGuest(true);
    setIsLoginDialogOpen(false);
  };

  const handleSignIn = () => {
    login();
    setIsLoginDialogOpen(false);
  };

  return (
    <main>
      <AlertDialog onOpenChange={setShowBox} open={showBox}>
        <AlertDialogTrigger className="w-fit relative rounded-full p-[1px] bg-gradient-to-r to-[#128748] from-[#7EE212]">
          <span
            className="block rounded-full px-5 py-2 text-white text-xs leading-4.5 font-bold bg-gradient-to-r from-[#0D824B] to-[#A1FF00] transition-all duration-300 hover:brightness-110 active:scale-95
        "
          >
            Plant For A Cause
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent
          className="lg:max-w-[944px] lg:min-w-[944px] lg:h-[640px] h-fit max-md:max-h-[90%] flex border border-[#BED4FF] md:rounded-4xl dialog-pop gap-6 max-md:p-4
        "
        >
          <AlertDialogTitle className="hidden" />
          <div
            onClick={() => setShowBox(false)}
            className="cursor-pointer absolute md:right-0 right-5
             top-3
             md:-top-10 flex items-center justify-center h-8 w-8 rounded-full bg-[#E4E4E4] hover:bg-gray-100 transition"
          >
            <X size={18} className="text-black" />
          </div>
          <div className="max-lg:hidden w-full h-full">
            <Image
              src="/images/gallery/5.png"
              alt="lightbox"
              height={592}
              width={400}
              className="rounded-2xl w-full min-h-[592px] object-cover"
            />
          </div>
          {step > 1 && (
            <button
              onClick={handleBack}
              className="bg-white hover:bg-gray-100 flex rounded-md items-center justify-self-center absolute gap-1 md:top-10 top-3 left-3 md:left-10 md:px-4 md:py-2 text-lg leading-6.5 font-medium"
            >
              <ChevronLeft size={24} className="w-6 h-6" /> Back
            </button>
          )}

          <div className="w-full space-y-4 max-md:mt-8 md:px-2 overflow-hidden max-md:overflow-y-scroll">
            <div className="flex items-center justify-center w-full gap-2">
              <div className="h-3 w-full bg-[#E7F8F0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#12B569] rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                />
              </div>
              <Image
                src="/images/tree-progress.png"
                alt="tree-progress"
                height={32}
                width={32}
              />
            </div>

            {step === 1 && (
              <Step1
                occasion={occasion}
                setOccasion={setOccasion}
                quantities={quantities}
                selectedQuantity={selectedQuantity}
                handleQuantitySelect={handleQuantitySelect}
                manualQuantity={manualQuantity}
                handleManualQuantityChange={handleManualQuantityChange}
                isGeoTagged={isGeoTagged}
                handleGeoTaggedChange={handleGeoTaggedChange}
                currencySymbol={currencySymbol}
                geotaggedRate={geotaggedRate}
                nonGeotaggedRate={nonGeotaggedRate}
                handleSaveAndNext={handleSaveAndNext}
              />
            )}

            {step === 2 && (
              <Step2
                personalDetails={personalDetails}
                handlePersonalDetailsChange={handlePersonalDetailsChange}
                isStep2Valid={isStep2Valid}
                handleSaveAndNext={handleSaveAndNext}
                emailValid={emailValid}
                phoneValid={phoneValid}
                pincodeValid={pincodeValid}
              />
            )}

            {step === 3 && (
              <div className="w-full space-y-5.5">
                <TaxDetail
                  taxDetails={taxDetails}
                  onTaxDetailsChange={handleTaxDetailsChange}
                  idNumberError={
                    !idNumberValid && taxDetails.idNumber
                      ? "Enter a valid ID number."
                      : ""
                  }
                />
                <NewOrderSummary
                  orderSummary={orderSummary}
                  currentStep={step}
                  isFormValid={isStep3Valid}
                  handleProceed={handleProceed}
                />
              </div>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
      {/* <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleContinueAsGuest}
        onContinueAsGuest={handleContinueAsGuest}
        onSignIn={handleSignIn}
      /> */}
    </main>
  );
};

export default LightBox;
