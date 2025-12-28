import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
} from "@/components/plant-tree/types";
import { SPECIES_DATA } from "./constants";

export const useTreeCheckout = () => {
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
    const co2Offset = Math.round(qty * 16.67); // Approximate calculation
    const amount = qty * 16.67; // Approximate price per tree
    setOrderSummary({
      numberOfTrees: qty,
      totalCo2Offset: `${co2Offset}Kg`,
      totalAmount: `INR ${amount.toFixed(2)}`,
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

  return {
    step,
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
