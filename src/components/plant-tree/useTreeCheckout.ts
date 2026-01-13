import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useCurrency } from "@/components/CurrencySelect";
import { City, Country } from "@/lib/location-utils";
import { useAuth } from "@/lib/auth-context";
import validations from "@/utils/validations";
import { INDIA_COUNTRY_CODE } from "@/utils/tax-constants";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
} from "@/components/plant-tree/types";
import { SPECIES_DATA } from "./constants";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";

export const useTreeCheckout = (co2PerTree?: number) => {
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
    displayOnDonorsList: true,
    email: "",
    doorNo: "",
    pincode: "",
    region: "",
    phoneNumber: "",
    currency: "",
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

  const searchParams = useSearchParams();
  const [isGeoTagged, setIsGeoTagged] = useState(() => {
    const geoParam = searchParams.get("geo");
    if (geoParam === "false") return false;
    return true; // Default to true
  });

  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();
  const { currency } = useCurrency();

  // Sync currency from hook to form state
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

  const selectedSpecies = useMemo(
    () => SPECIES_DATA.find((species) => species.id === selectedSpeciesId),
    [selectedSpeciesId]
  );

  const availableSpeciesForTag = useMemo(() => {
    const tagKey = isGeoTagged ? "geo" : "non-geo";
    return SPECIES_DATA.filter((species) =>
      (species.availableTags ?? ["geo", "non-geo"]).includes(tagKey)
    );
  }, [isGeoTagged]);

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

  const handleQuantitySelect = (qty: number) => {
    const normalizedQty = Math.max(1, qty);
    setSelectedQuantity(normalizedQty);
    setManualQuantity("");
    updateOrderSummary(normalizedQty);
    setSelectedLocation("Shivgarh, Madhya Pradesh");
  };

  const handleManualQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSaveAndNext = () => {
    if (!selectedQuantity && !manualQuantity) return;
    setStep(2);
  };

  const handlePersonalDetailsChange = (
    field: keyof PersonalDetails,
    value: string | boolean | City | Country | null
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

  const handleTaxDetailsChange = (field: keyof TaxDetails, value: any) => {
    if (field === "citizenship") {
      // When citizenship changes, reset ID type and ID number
      const isIndian =
        typeof value === "object" &&
        value?.id === INDIA_COUNTRY_CODE;

      setTaxDetails((prev) => ({
        ...prev,
        citizenship: value,
        idType: isIndian ? "pan" : "passport", // Default to PAN for Indian, Passport for others
        idNumber: "",
      }));
      return;
    }
    if (field === "idType") {
      // When ID type changes, clear the ID number
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
  const currencyValue = personalDetails.currency?.trim() || "";
  const stateValue = personalDetails.state?.trim() || "";

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
    currencyValue !== "" &&
    countryValue !== "" &&
    stateValue !== "" &&
    cityValue !== "" &&
    taxDetails.citizenship !== null &&
    (typeof taxDetails.citizenship === "object" ? taxDetails.citizenship.name : taxDetails.citizenship).trim() !== "" &&
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

  // Update summary when dependencies change
  useEffect(() => {
    if (selectedQuantity !== null) {
      updateOrderSummary(selectedQuantity);
    } else if (manualQuantity) {
      const parsed = parseInt(manualQuantity, 10);
      if (!isNaN(parsed)) {
        updateOrderSummary(parsed);
      }
    }
  }, [isGeoTagged, currency, plantRates]); // Re-run when rates/currency/tag changes

  return {
    step,
    setStep,
    selectedQuantity,
    manualQuantity,
    orderSummary,
    personalDetails,
    taxDetails,
    isGeoTagged,
    selectedSpeciesId,
    availabilityMessage,
    isLoginDialogOpen,
    availableSpeciesForTag,
    emailValid,
    phoneValid,
    pincodeValid,
    idNumberValid,
    isFormValid,
    handleQuantitySelect,
    handleManualQuantityChange,
    handleManualInputFocus,
    handleSaveAndNext,
    handlePersonalDetailsChange,
    handleTaxDetailsChange,
    handleGeoTaggedChange,
    setSelectedSpeciesId,
    handleDialogClose,
    handleSignIn,
    handleContinueAsGuest,
  };
};
