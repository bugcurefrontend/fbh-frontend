import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCurrency } from "@/components/CurrencySelect";
import { City, Country } from "@/lib/location-utils";
import { useAuth } from "@/lib/auth-context";
import validations from "@/utils/validations";
import { INDIA_COUNTRY_CODE } from "@/utils/tax-constants";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
  Species,
  ReservationData,
} from "@/components/plant-tree/types";
import { SPECIES_DATA } from "./constants";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";
import { fetchTreeAvailability } from "@/services/tree-availability";
import { createTreeReservation } from "@/services/tree-reservations";
import { fetchAllSpecies } from "@/services/species";
import { SpeciesSimplified } from "@/types/species";

export const useTreeCheckout = (co2PerTree?: number, initialPlantRates: PlantRate[] = []) => {
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
    router.push(`${pathname}?${params.toString()} `);
    setStepState(newStep);
  };

  const handleGeoTaggedChange = (value: boolean) => {
    setIsGeoTagged(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("geo", value ? "true" : "false");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Create tree reservation (called when moving from step 2 to step 3)
  const handleCreateReservation = async () => {
    const quantity = selectedQuantity || parseInt(manualQuantity, 10) || 0;
    if (quantity === 0) {
      setReservationError("Please select a quantity");
      return false;
    }

    console.log("🌳 Starting tree reservation...", {
      quantity,
      species_id: selectedSpeciesId,
      is_geotagged: isGeoTagged,
      user_email: personalDetails.email,
    });

    setIsLoadingReservation(true);
    setReservationError("");

    try {
      const request = {
        dep_type: "SPECIES" as const,
        dep_id: selectedSpeciesId, // Use the actual selected species
        tree_count: quantity,
        is_geotagged: isGeoTagged,
        user_email: personalDetails.email || undefined,
      };

      console.log("📤 Reservation API Request:", request);

      const response = await createTreeReservation(request);

      console.log("📥 Reservation API Response:", response);

      if (response.success) {
        // Store reservation data
        setReservationData({
          token: response.reservation_token,
          expiresAt: response.expires_at,
          reservationId: response.reservation_id,
          message: response.message,
        });

        console.log("✅ TREES RESERVED!", {
          token: response.reservation_token,
          reservation_id: response.reservation_id,
          expires_at: response.expires_at,
          message: response.message,
        });

        return true;
      } else {
        // Handle API error
        console.error("❌ Reservation failed:", response.message);
        setReservationError(response.message);
        return false;
      }
    } catch (error) {
      console.error("❌ Reservation error:", error);
      setReservationError("Unable to reserve trees. Please try again.");
      return false;
    } finally {
      setIsLoadingReservation(false);
    }
  };

  // Sync state when URL changes (browser back/forward)
  useEffect(() => {
    const stepParam = searchParams.get("step");
    const currentStep = stepParam ? parseInt(stepParam, 10) : 1;
    if (currentStep !== step) {
      setStepState(currentStep);
    }
  }, [searchParams]);
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

  const [isGeoTagged, setIsGeoTagged] = useState(() => {
    const geoParam = searchParams.get("geo");
    if (geoParam === "false") return false;
    return true; // Default to true
  });

  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [reservationError, setReservationError] = useState("");
  const [isLoadingReservation, setIsLoadingReservation] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();
  const { currency } = useCurrency();

  // Sync currency from hook to form state
  useEffect(() => {
    setPersonalDetails(prev => ({ ...prev, currency }));
  }, [currency]);

  // Fetch Plant Rates and Species
  const [plantRates, setPlantRates] = useState<PlantRate[]>(initialPlantRates);
  const [strapiSpecies, setStrapiSpecies] = useState<SpeciesSimplified[]>([]);

  useEffect(() => {
    // Only fetch if not provided as prop
    if (initialPlantRates.length === 0) {
      fetchAllPlantRates().then((rates) => {
        console.log("🌳 Fetched plant rates:", rates);
        setPlantRates(rates);
      });
    }

    // Fetch species from Strapi (enhancement, falls back to SPECIES_DATA if empty)
    fetchAllSpecies().then((species) => {
      if (species && species.length > 0) {
        setStrapiSpecies(species);
      }
    });
  }, []);

  const currentRate = useMemo(
    () => {
      const rate = plantRates.find((r) => r.currency_code === currency);
      console.log("💰 Current currency:", currency, "Found rate:", rate);
      return rate;
    },
    [plantRates, currency]
  );

  const geotaggedRate = currentRate ? currentRate.geotagged_rate : (currency === "INR" ? 175 : 10);
  const nonGeotaggedRate = currentRate ? currentRate.non_geotagged_rate : (currency === "INR" ? 150 : 5);

  // Transform Strapi species to checkout format, or use SPECIES_DATA as fallback
  const speciesList = useMemo(() => {
    // If we have Strapi species, use them
    if (strapiSpecies.length > 0) {
      return strapiSpecies.map(species => ({
        id: species.id,
        name: species.name,
        botanical: species.scientificName,
        img: species.image || "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
        availableTags: ["geo", "non-geo"] as ("geo" | "non-geo")[]
      }));
    }
    // Otherwise fall back to hardcoded SPECIES_DATA
    return SPECIES_DATA;
  }, [strapiSpecies]);

  const selectedSpecies = useMemo(
    () => speciesList.find((species) => species.id === selectedSpeciesId),
    [speciesList, selectedSpeciesId]
  );

  const availableSpeciesForTag = useMemo(() => {
    const tagKey = isGeoTagged ? "geo" : "non-geo";
    return speciesList.filter((species) =>
      (species.availableTags ?? ["geo", "non-geo"]).includes(tagKey)
    );
  }, [speciesList, isGeoTagged]);

  const updateOrderSummary = (qty: number) => {
    if (qty === 0) {
      setOrderSummary({
        numberOfTrees: 0,
        totalCo2Offset: "--",
        totalAmount: "--",
      });
      return;
    }

    const perTreeCo2 = co2PerTree ?? 16.67;
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
      geotaggedRate,
      nonGeotaggedRate,
      currencySymbol: symbol,
      rate,
    });
  };

  // Handle step transitions with reservation logic
  const handleSaveAndNext = async () => {
    // Step 1 → Step 2: Just validate and proceed
    if (step === 1) {
      if (!selectedQuantity && !manualQuantity) return;
      setStep(2);
      return;
    }

    // Step 2 → Step 3: Create reservation first!
    if (step === 2) {
      console.log("🔒 Attempting to reserve trees before payment...");
      const success = await handleCreateReservation();

      if (success) {
        console.log("✅ Reservation successful, proceeding to payment");
        setStep(3);
      } else {
        console.error("❌ Reservation failed, staying on step 2");
        // Error is already set in reservationError state
      }
      return;
    }
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

  // Clear available species message when species changes
  useEffect(() => {
    setAvailabilityMessage("");
  }, [selectedSpeciesId]);

  // Check real-time tree availability from backend (with debounce)
  useEffect(() => {
    const checkAvailability = async () => {
      const quantity = selectedQuantity || (manualQuantity ? parseInt(manualQuantity, 10) : 0);
      if (quantity === 0) return;

      // For SPECIES DEP type (we're selecting species in the checkout)
      const response = await fetchTreeAvailability({
        dep_type: "SPECIES",
        dep_id: selectedSpeciesId,
        is_geotagged: isGeoTagged
      });

      if (response && response.success) {
        const available = response.total_available;

        if (quantity > available) {
          setAvailabilityMessage(
            `Only ${available} ${isGeoTagged ? 'geotagged' : 'non-geotagged'} trees available for this species.Please reduce your quantity.`
          );
        } else if (available < 100) {
          setAvailabilityMessage(
            `Only ${available} ${isGeoTagged ? 'geotagged' : 'non-geotagged'} trees left!`
          );
        } else {
          setAvailabilityMessage("");
        }
      }
    };

    // Debounce: Wait 500ms after last change before checking
    const timeoutId = setTimeout(() => {
      checkAvailability();
    }, 500);

    // Cleanup: Cancel previous timeout if dependencies change again
    return () => clearTimeout(timeoutId);
  }, [selectedQuantity, manualQuantity, selectedSpeciesId, isGeoTagged]);

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

  // Initialize orderSummary with rates even when quantity is 0
  useEffect(() => {
    if (plantRates.length > 0 && orderSummary.geotaggedRate === undefined) {
      const symbol = currency === "INR" ? "₹" : "$";
      setOrderSummary(prev => ({
        ...prev,
        geotaggedRate,
        nonGeotaggedRate,
        currencySymbol: symbol,
      }));
    }
  }, [plantRates, geotaggedRate, nonGeotaggedRate, currency]);

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
    handleCreateReservation,
    reservationData,
    reservationError,
    isLoadingReservation,
  };
};
