"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
} from "@/components/plant-tree/types";
import { City, Country } from "@/lib/location-utils";
import { useAuth } from "@/lib/auth-context";
import validations from "@/utils/validations";
import { INDIA_COUNTRY_CODE } from "@/utils/tax-constants";
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
import { Attribute } from "@/types/attribute";
import { fetchAllAttributes } from "@/services/attributes";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";

interface LightBoxProps {
  attributes?: Attribute[];
  preSelectedAttribute?: Attribute | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  co2Sequestration?: number;
}

const LightBox: React.FC<LightBoxProps> = ({
  attributes = [],
  preSelectedAttribute = null,
  isOpen: controlledIsOpen,
  onOpenChange,
  triggerLabel = "Plant For A Cause",
  co2Sequestration = 16.67,
}) => {
  const [step, setStep] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [manualQuantity, setManualQuantity] = useState("");
  const [showBox, setShowBox] = React.useState(false);

  // Handle controlled/uncontrolled open state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : showBox;
  const handleOpenChange = (open: boolean) => {
    if (controlledIsOpen === undefined) {
      setShowBox(open);
    }
    onOpenChange?.(open);
  };

  const { currency, currencySymbol } = useCurrency();

  const [orderSummary, setOrderSummary] = useState<OrderSummaryType>({
    numberOfTrees: 0,
    totalCo2Offset: "--",
    totalAmount: "--",
  });

  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    displayOnDonorsList: true,
    email: "",
    doorNo: "",
    pincode: "",
    region: "",
    phoneNumber: "",
    currency: currency,
    country: null,
    state: "",
    city: null,
  });

  const [taxDetails, setTaxDetails] = useState<TaxDetails>({
    citizenship: null,
    idType: "",
    idNumber: "",
    abhyashiNumber: "",
  });

  const [isGeoTagged, setIsGeoTagged] = useState(true);
  const [localAttributes, setLocalAttributes] = useState<Attribute[]>(
    attributes || []
  );
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();

  const [occasion, setOccasion] = useState(preSelectedAttribute?.name || "");

  const [plantRates, setPlantRates] = useState<PlantRate[]>([]);

  // Track if we've fetched attributes to prevent duplicate calls
  const hasFetchedAttributes = React.useRef(false);
  const [isFetchingAttributes, setIsFetchingAttributes] = useState(false);

  useEffect(() => {
    fetchAllPlantRates().then(setPlantRates);
  }, []);

  const currentRate = useMemo(
    () => plantRates.find((r) => r.currency_code === currency),
    [plantRates, currency]
  );

  const geotaggedRate = currentRate ? currentRate.geotagged_rate : (currency === "INR" ? 175 : 10);
  const nonGeotaggedRate = currentRate ? currentRate.non_geotagged_rate : (currency === "INR" ? 150 : 5);

  console.log("💰 [LightBox] Rate context:", {
    currency,
    currentRate,
    geotaggedRate,
    nonGeotaggedRate,
    isGeoTagged
  });

  const quantities = [10, 25, 50, 100];

  // If no attributes were passed in props (header case), fetch them client-side
  useEffect(() => {
    if (attributes && attributes.length > 0) {
      setLocalAttributes(attributes);
      hasFetchedAttributes.current = true;
      return;
    }

    // Prevent duplicate fetches
    if (hasFetchedAttributes.current || isFetchingAttributes) {
      return;
    }

    const fetchAttrs = async () => {
      setIsFetchingAttributes(true);
      try {
        const mapped = await fetchAllAttributes();
        setLocalAttributes(mapped);
        hasFetchedAttributes.current = true;
      } catch (e) {
        console.error("Failed to fetch attributes", e);
      } finally {
        setIsFetchingAttributes(false);
      }
    };

    fetchAttrs();
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    if (preSelectedAttribute && preSelectedAttribute.name) {
      setOccasion(preSelectedAttribute.name);
    }
  }, [preSelectedAttribute]);

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
    const co2Offset = Math.round(qty * co2Sequestration);
    const co2Label = co2Offset === 1 ? `${co2Offset} Kg` : `${co2Offset} Kg(s)`;
    setOrderSummary({
      numberOfTrees: qty,
      totalCo2Offset: co2Label,
      totalAmount: amount > 0 ? `${currencySymbol} ${amount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2 })}` : "--",
    });
  };

  useEffect(() => {
    updateOrderSummary(
      (selectedQuantity || parseInt(manualQuantity, 10) || 0) as number
    );
  }, [isGeoTagged, currency, co2Sequestration]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSelectedQuantity(null);
      setManualQuantity("");
      setOrderSummary({
        numberOfTrees: 0,
        totalCo2Offset: "--",
        totalAmount: "--",
      });
      setPersonalDetails({
        firstName: "",
        lastName: "",
        displayOnDonorsList: true,
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
      setTaxDetails({
        citizenship: "",
        idType: "PAN CARD",
        idNumber: "",
        abhyashiNumber: "",
      });
      setIsGeoTagged(true);
      setOccasion(preSelectedAttribute?.name || "");
      setHasChosenGuest(false);
    }
  }, [isOpen, currency, preSelectedAttribute]);

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

  const handlePersonalDetailsChange = useCallback((
    field: keyof PersonalDetails,
    value: string | boolean | City | Country | null
  ) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleTaxDetailsChange = useCallback((field: keyof TaxDetails, value: any) => {
    if (field === "citizenship") {
      // When citizenship changes, reset ID type and ID number
      const isIndian =
        typeof value === "object" &&
        value?.id === INDIA_COUNTRY_CODE;

      setTaxDetails((prev) => ({
        ...prev,
        citizenship: value,
        idType: isIndian ? "pan" : "passport",
        idNumber: "",
      }));
      return;
    }
    if (field === "idType") {
      setTaxDetails((prev) => ({ ...prev, idType: value, idNumber: "" }));
      return;
    }
    setTaxDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

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

  const countryValue =
    typeof personalDetails.country === "string"
      ? personalDetails.country.trim()
      : personalDetails.country?.name?.trim() ||
      personalDetails.country?.code?.trim() ||
      "";
  const cityValue =
    typeof personalDetails.city === "string"
      ? personalDetails.city.trim()
      : personalDetails.city?.name?.trim() || "";
  const stateValue = personalDetails.state?.trim() || "";

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
      countryValue !== "" &&
      stateValue !== "" &&
      cityValue !== ""
    );
  }, [personalDetails, emailValid, phoneValid, pincodeValid, countryValue, cityValue, stateValue]);

  const idNumberValid = useMemo(() => {
    if (!taxDetails.idNumber) return false;

    // Get validation pattern based on ID type
    switch (taxDetails.idType) {
      case "pan":
        return validations.panNo.value instanceof RegExp
          ? validations.panNo.value.test(taxDetails.idNumber)
          : true;
      case "aadhar":
        return validations.aadhar.value instanceof RegExp
          ? validations.aadhar.value.test(taxDetails.idNumber)
          : true;
      case "passport":
        return validations.passport.value instanceof RegExp
          ? validations.passport.value.test(taxDetails.idNumber)
          : true;
      case "license":
        return validations.license.value instanceof RegExp
          ? validations.license.value.test(taxDetails.idNumber)
          : true;
      case "voter":
        return validations.voterId.value instanceof RegExp
          ? validations.voterId.value.test(taxDetails.idNumber)
          : true;
      case "ration":
        return validations.ration.value instanceof RegExp
          ? validations.ration.value.test(taxDetails.idNumber)
          : true;
      default:
        return false;
    }
  }, [taxDetails.idNumber, taxDetails.idType]);

  const isStep3Valid = useMemo(() => {
    return (
      taxDetails.citizenship !== null &&
      (typeof taxDetails.citizenship === "object"
        ? taxDetails.citizenship.name
        : taxDetails.citizenship).trim() !== "" &&
      idNumberValid
    );
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

  const selectedAttribute = localAttributes.find((a) => a.name === occasion);

  return (
    <main>
      <AlertDialog onOpenChange={handleOpenChange} open={isOpen}>
        <AlertDialogTrigger className="w-fit relative rounded-full p-[1px] bg-gradient-to-r to-[#128748] from-[#80CB00] h-[37px]">
          <span
            className="block rounded-full px-5 py-2 text-white text-xs leading-4.5 font-bold bg-gradient-to-r from-[#0D824B] to-[#80CB00] transition-all duration-300 hover:brightness-110 active:scale-95
        "
          >
            {triggerLabel}
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent className="lg:max-w-[944px] lg:min-w-[944px] lg:h-[640px] h-fit max-md:max-h-[90%] flex border border-[#BED4FF] shadow-[0_24px_48px_0_rgba(133,133,133,0.2)] md:rounded-4xl dialog-pop gap-6 max-md:pl-2 max-md:pr-[5px] max-md:py-4">
          <AlertDialogTitle className="hidden" />
          <div
            onClick={() => handleOpenChange(false)}
            className="cursor-pointer absolute md:right-0 right-4
             top-4
             md:-top-10 flex items-center justify-center md:h-8 md:w-8 rounded-full md:bg-[#E4E4E4] md:hover:bg-gray-100 transition"
          >
            <X size={18} className="text-black max-md:stroke-[1.3]" />
          </div>
          <div className="max-lg:hidden max-w-100 w-full h-full">
            <Image
              src={selectedAttribute?.image || "/images/gallery/5.png"}
              alt="lightbox"
              height={592}
              width={400}
              className="rounded-2xl max-w-100 min-h-full object-cover"
            />
          </div>
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-white hover:bg-gray-100 flex rounded-[8px] items-center justify-self-center absolute gap-1 md:top-10 top-3 left-3 md:left-10 md:px-4 md:py-2 md:text-lg leading-4.5 md:leading-6.5 font-bold md:font-medium max-md:text-[#003399] z-[60] cursor-pointer"
            >
              <ChevronLeft
                size={24}
                className="w-4.5 h4.5 md:w-6 md:h-6 md:text-[#090C0F]"
              />
              Back
            </button>
          )}

          <div className="w-full space-y-4 max-md:mt-8 max-md:pl-2 max-md:pr-[5px] md:px-2 overflow-hidden max-md:overflow-y-scroll">
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
                className="max-md:w-6"
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
                attributes={localAttributes}
                preSelectedAttribute={preSelectedAttribute}
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
              <div className="w-full space-y-4 md:space-y-2">
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
                  onClose={() => handleOpenChange(false)}
                  userName={`${personalDetails.firstName} ${personalDetails.lastName}`.trim()}
                  userEmail={personalDetails.email}
                  occasion={occasion}
                  occasionImage={selectedAttribute?.icon || selectedAttribute?.image}
                  rate={isGeoTagged ? geotaggedRate : nonGeotaggedRate}
                  currencyCode={currency}
                  personalDetails={personalDetails}
                  taxDetails={taxDetails}
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
