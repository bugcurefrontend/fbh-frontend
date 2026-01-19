"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProgressSteps from "@/components/plant-tree/ProgressSteps";
import PlantInfoCard from "@/components/plant-tree/PlantInfoCard";
import PersonalDetailsSection from "@/components/plant-tree/PersonalDetailsSection";
import TaxDetailsSection from "@/components/plant-tree/TaxDetailsSection";
import OrderSummary from "@/components/plant-tree/OrderSummary";
import CertificatePreview from "@/components/gift-tree/CertificatePreview";
import AddRecipient from "@/components/AddRecipient";
import validations from "@/utils/validations";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
  Species,
} from "@/components/plant-tree/types";
import { useAuth } from "@/lib/auth-context";
import LoginDialog from "@/components/LoginDialog";
import { useCurrency } from "@/components/CurrencySelect";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";
import { Recipient } from "@/components/gift-tree/types";

interface Props {
  co2PerTree?: number | null;
  sampleCertificateUrl?: string | null;
}

const GiftTreePageClient = ({ co2PerTree, sampleCertificateUrl }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStepState] = useState(() => {
    const stepParam = searchParams.get("step");
    return stepParam ? parseInt(stepParam, 10) : 1;
  });

  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`${pathname}?${params.toString()}`);
    setStepState(newStep);
  };

  // Sync state when URL changes (browser back/forward)
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const currentStep = stepParam ? parseInt(stepParam, 10) : 1;
    if (currentStep !== step) {
      setStepState(currentStep);
    }
  }, [searchParams]);
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
    currency: "",
    country: "",
    state: "",
    city: "",
  });

  const [taxDetails, setTaxDetails] = useState<TaxDetails>({
    citizenship: null,
    idType: "",
    idNumber: "",
    abhyashiNumber: "",
  });

  const [recipients, setRecipients] = useState<Recipient[]>([]);

  // Load recipients from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("recipients");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecipients(parsed);
      } catch (e) {
        console.error("Failed to parse stored recipients:", e);
      }
    }
  }, []);

  // Sync back to localStorage
  useEffect(() => {
    if (recipients.length > 0) {
      localStorage.setItem("recipients", JSON.stringify(recipients));
    } else {
      localStorage.removeItem("recipients");
    }
  }, [recipients]);

  const [isGeoTagged, setIsGeoTagged] = useState(() => {
    const geoParam = searchParams.get("geo");
    if (geoParam === "false") return false;
    return true; // Default to true
  });
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();
  const { currency } = useCurrency();

  // Sync currency
  useEffect(() => {
    setPersonalDetails(prev => ({ ...prev, currency }));
  }, [currency]);

  // Fetch Plant Rates
  const [plantRates, setPlantRates] = useState<PlantRate[]>([]);
  useEffect(() => {
    fetchAllPlantRates().then(setPlantRates);
  }, []);

  const currentRate = useMemo(
    () => plantRates.find((r) => r.currency_code === currency),
    [plantRates, currency]
  );

  const geotaggedRate = currentRate ? currentRate.geotagged_rate : (currency === "INR" ? 175 : 10);
  const nonGeotaggedRate = currentRate ? currentRate.non_geotagged_rate : (currency === "INR" ? 150 : 5);

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
    const perTreeCo2 = typeof co2PerTree === "number" ? co2PerTree : 16.67; // fallback
    const co2Offset = Math.round(qty * perTreeCo2);

    // Dynamic Rate Calculation
    const rate = isGeoTagged ? geotaggedRate : nonGeotaggedRate;
    const amount = qty * rate;

    // Use passed currency symbol if available, else derive from currency code
    const symbol = currency === "INR" ? "₹" : "$";

    const co2Label = co2Offset === 1 ? `${co2Offset} Kg` : `${co2Offset} Kg(s)`;
    setOrderSummary({
      numberOfTrees: qty,
      totalCo2Offset: co2Label,
      totalAmount: `${symbol} ${amount.toFixed(2)}`,
    });
  };

  const handleRecipientQuantityChange = (totalTrees: number) => {
    updateOrderSummary(totalTrees);
  };

  // Update summary when dependencies change
  useEffect(() => {
    const totalTrees = recipients.reduce((sum, r) => sum + r.trees, 0);
    updateOrderSummary(totalTrees);
  }, [isGeoTagged, currency, plantRates, recipients]);

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePersonalDetailsChange = (
    field: keyof PersonalDetails,
    value: string | boolean | import("@/lib/location-utils").Country | import("@/lib/location-utils").City | null
  ) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleTaxDetailsChange = (field: keyof TaxDetails, value: any) => {
    if (field === "citizenship") {
      // When citizenship changes, reset ID type and ID number
      const isIndian =
        typeof value === "object" &&
        value?.id === 358; // India country ID

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
  };

  const idNumberValid = useMemo(() => {
    if (!taxDetails.idNumber) return true;

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
        return true;
    }
  }, [taxDetails.idNumber, taxDetails.idType]);

  const isFormValid =
    orderSummary.numberOfTrees > 0 &&
    personalDetails.firstName.trim() !== "" &&
    personalDetails.lastName.trim() !== "" &&
    personalDetails.email?.trim() !== "" &&
    personalDetails.phoneNumber.trim() !== "" &&
    taxDetails.citizenship !== null &&
    (typeof taxDetails.citizenship === "object"
      ? taxDetails.citizenship.name
      : taxDetails.citizenship).trim() !== "" &&
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

        <ProgressSteps currentStep={step} onStepClick={(s) => setStep(s)} />
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

              <CertificatePreview
                imageUrl={sampleCertificateUrl ?? undefined}
                blurImageUrl={sampleCertificateUrl ?? undefined}
              />

              {/* Recipient Details */}
              <AddRecipient
                onQuantityChange={handleRecipientQuantityChange}
                onNextStep={handleNextStep}
                recipients={recipients}
                onRecipientsChange={setRecipients}
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
          userName={`${personalDetails.firstName} ${personalDetails.lastName}`.trim()}
          userEmail={personalDetails.email}
          recipients={recipients}
          onTreeCountChange={updateOrderSummary}
          onRecipientsUpdate={setRecipients}
        />
      </div>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={handleDialogClose}
        onSignIn={handleSignIn}
        onContinueAsGuest={handleContinueAsGuest}
      />{" "}
    </div>
  );
};

export default GiftTreePageClient;
