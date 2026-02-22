import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCurrency } from "@/components/CurrencySelect";
import { Country } from "@/lib/location-utils";
import { useAuth } from "@/lib/auth-context";
import { isValidEmail, isValidIdNumber } from "@/utils/validations";
import { INDIA_COUNTRY_CODE } from "@/utils/tax-constants";
import {
  OrderSummary as OrderSummaryType,
  PersonalDetails,
  TaxDetails,
  ReservationData,
} from "@/components/plant-tree/types";
import { SPECIES_DATA } from "./constants";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";
import { fetchTreeAvailability } from "@/services/tree-availability";
import { createTreeReservation } from "@/services/tree-reservations";
import { fetchAllSpecies } from "@/services/species";
import { SpeciesSimplified } from "@/types/species";
import {
  buildOrderSummary,
  createEmptyOrderSummary,
  createInitialPersonalDetails,
  createInitialTaxDetails,
  getCityValue,
  getCountryValue,
  getCurrencySymbol,
  isCitizenshipPresent,
  sanitizePersonalField,
  PersonalFieldValue,
} from "./useTreeCheckout.helpers";

export const useTreeCheckout = (co2PerTree?: number, initialPlantRates: PlantRate[] = []) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStepState] = useState(() => {
    const stepParam = searchParams.get("step");
    return stepParam ? parseInt(stepParam, 10) : 1;
  });

  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [manualQuantity, setManualQuantity] = useState("");
  const [orderSummary, setOrderSummary] = useState<OrderSummaryType>(createEmptyOrderSummary());
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    createInitialPersonalDetails("")
  );
  const [taxDetails, setTaxDetails] = useState<TaxDetails>(createInitialTaxDetails());
  const [isGeoTagged, setIsGeoTagged] = useState(() => {
    const geoParam = searchParams.get("geo");
    if (geoParam === "false") return false;
    return true;
  });
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [reservationError, setReservationError] = useState("");
  const [isLoadingReservation, setIsLoadingReservation] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [hasChosenGuest, setHasChosenGuest] = useState(false);
  const [plantRates, setPlantRates] = useState<PlantRate[]>(initialPlantRates);
  const [strapiSpecies, setStrapiSpecies] = useState<SpeciesSimplified[]>([]);

  const { isAuthenticated, isLoading, login } = useAuth();
  const { currency } = useCurrency();

  const setStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", newStep.toString());
    router.push(`${pathname}?${params.toString()}`);
    setStepState(newStep);
  };

  const handleGeoTaggedChange = (value: boolean) => {
    setIsGeoTagged(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("geo", value ? "true" : "false");
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateOrderSummary = (qty: number) => {
    setOrderSummary(
      buildOrderSummary({
        qty,
        isGeoTagged,
        geotaggedRate,
        nonGeotaggedRate,
        currency,
        co2PerTree,
      })
    );
  };

  const handleCreateReservation = async () => {
    const quantity = selectedQuantity || parseInt(manualQuantity, 10) || 0;
    if (quantity === 0) {
      setReservationError("Please select a quantity");
      return false;
    }

    setIsLoadingReservation(true);
    setReservationError("");

    try {
      const request = {
        dep_type: "SPECIES" as const,
        dep_id: selectedSpeciesId,
        tree_count: quantity,
        is_geotagged: isGeoTagged,
        user_email: personalDetails.email || undefined,
      };

      const response = await createTreeReservation(request);
      if (response.success) {
        setReservationData({
          token: response.reservation_token,
          expiresAt: response.expires_at,
          reservationId: response.reservation_id,
          message: response.message,
        });
        return true;
      }

      setReservationError(response.message);
      return false;
    } catch (_error) {
      setReservationError("Unable to reserve trees. Please try again.");
      return false;
    } finally {
      setIsLoadingReservation(false);
    }
  };

  const handleSaveAndNext = async () => {
    if (step === 1) {
      if (!selectedQuantity && !manualQuantity) return;
      setStep(2);
      return;
    }

    if (step === 2) {
      const success = await handleCreateReservation();
      if (success) setStep(3);
    }
  };

  const handleQuantitySelect = (qty: number) => {
    const normalizedQty = Math.max(1, qty);
    setSelectedQuantity(normalizedQty);
    setManualQuantity("");
    updateOrderSummary(normalizedQty);
  };

  const handleManualQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    if (!digitsOnly) {
      setManualQuantity("");
      setSelectedQuantity(null);
      setOrderSummary(createEmptyOrderSummary());
      return;
    }

    const parsed = Math.max(1, parseInt(digitsOnly, 10));
    const value = parsed.toString();
    setManualQuantity(value);
    setSelectedQuantity(null);
    if (value && !Number.isNaN(parsed)) updateOrderSummary(parsed);
  };

  const handleManualInputFocus = () => {
    setSelectedQuantity(null);
  };

  const handlePersonalDetailsChange = (field: keyof PersonalDetails, value: PersonalFieldValue) => {
    if (typeof value === "string") {
      const sanitizedValue = sanitizePersonalField(field, value);
      setPersonalDetails((prev) => ({ ...prev, [field]: sanitizedValue }));
      return;
    }

    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleTaxDetailsChange = (field: keyof TaxDetails, value: string | Country | null) => {
    if (field === "citizenship") {
      const isIndian = typeof value === "object" && value?.id === INDIA_COUNTRY_CODE;
      setTaxDetails((prev) => ({
        ...prev,
        citizenship: value,
        idType: isIndian ? "pan" : "passport",
        idNumber: "",
      }));
      return;
    }

    if (field === "idType") {
      setTaxDetails((prev) => ({ ...prev, idType: value as string, idNumber: "" }));
      return;
    }

    setTaxDetails((prev) => ({ ...prev, [field]: value } as TaxDetails));
  };

  const handleContinueAsGuest = () => {
    setHasChosenGuest(true);
    setIsLoginDialogOpen(false);
  };

  const handleSignIn = () => {
    login();
    setIsLoginDialogOpen(false);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) handleContinueAsGuest();
  };

  const currentRate = useMemo(() => {
    return (
      plantRates.find((r) => r.currency_code === currency) ??
      plantRates.find((r) => r.currency_code?.toUpperCase() === currency?.toUpperCase())
    );
  }, [plantRates, currency]);

  const geotaggedRate = currentRate ? currentRate.geotagged_rate : currency === "INR" ? 60 : 1;
  const nonGeotaggedRate = currentRate
    ? currentRate.non_geotagged_rate
    : currency === "INR"
      ? 60
      : 1;

  const speciesList = useMemo(() => {
    if (strapiSpecies.length > 0) {
      return strapiSpecies.map((species) => ({
        id: species.id,
        name: species.name,
        botanical: species.scientificName,
        img: species.image || "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
        availableTags: ["geo", "non-geo"] as ("geo" | "non-geo")[],
      }));
    }

    return SPECIES_DATA;
  }, [strapiSpecies]);

  const availableSpeciesForTag = useMemo(() => {
    const tagKey = isGeoTagged ? "geo" : "non-geo";
    return speciesList.filter((species) =>
      (species.availableTags ?? ["geo", "non-geo"]).includes(tagKey)
    );
  }, [speciesList, isGeoTagged]);

  const emailValid = useMemo(
    () => personalDetails.email === "" || isValidEmail(personalDetails.email),
    [personalDetails.email]
  );
  const phoneValid = useMemo(
    () => personalDetails.phoneNumber === "" || /^[0-9]{6,15}$/.test(personalDetails.phoneNumber),
    [personalDetails.phoneNumber]
  );
  const pincodeValid = useMemo(
    () => personalDetails.pincode === "" || /^[0-9]{4,10}$/.test(personalDetails.pincode),
    [personalDetails.pincode]
  );
  const idNumberValid = useMemo(
    () => isValidIdNumber(taxDetails.idType, taxDetails.idNumber, true),
    [taxDetails.idType, taxDetails.idNumber]
  );

  const countryValue = getCountryValue(personalDetails.country);
  const cityValue = getCityValue(personalDetails.city);
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
    isCitizenshipPresent(taxDetails.citizenship) &&
    taxDetails.idNumber.trim() !== "" &&
    idNumberValid;

  useEffect(() => {
    const stepParam = searchParams.get("step");
    const currentStep = stepParam ? parseInt(stepParam, 10) : 1;
    if (currentStep !== step) setStepState(currentStep);
  }, [searchParams, step]);

  useEffect(() => {
    setPersonalDetails((prev) => ({ ...prev, currency }));
  }, [currency]);

  useEffect(() => {
    if (initialPlantRates.length === 0) fetchAllPlantRates().then(setPlantRates);
    fetchAllSpecies().then((species) => {
      if (species && species.length > 0) setStrapiSpecies(species);
    });
  }, []);

  useEffect(() => {
    setAvailabilityMessage("");
  }, [selectedSpeciesId]);

  useEffect(() => {
    const checkAvailability = async () => {
      const quantity = selectedQuantity || (manualQuantity ? parseInt(manualQuantity, 10) : 0);
      if (quantity === 0) return;

      const response = await fetchTreeAvailability({
        dep_type: "SPECIES",
        dep_id: selectedSpeciesId,
        is_geotagged: isGeoTagged,
      });

      if (response && response.success) {
        const available = response.total_available;
        if (quantity > available) {
          setAvailabilityMessage(
            `Only ${available} ${isGeoTagged ? "geotagged" : "non-geotagged"} trees available for this species.Please reduce your quantity.`
          );
        } else if (available < 100) {
          setAvailabilityMessage(
            `Only ${available} ${isGeoTagged ? "geotagged" : "non-geotagged"} trees left!`
          );
        } else {
          setAvailabilityMessage("");
        }
      }
    };

    const timeoutId = setTimeout(() => {
      checkAvailability();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedQuantity, manualQuantity, selectedSpeciesId, isGeoTagged]);

  useEffect(() => {
    if (
      availableSpeciesForTag.length > 0 &&
      !availableSpeciesForTag.find((species) => species.id === selectedSpeciesId)
    ) {
      setSelectedSpeciesId(availableSpeciesForTag[0].id);
    }
  }, [availableSpeciesForTag, selectedSpeciesId]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !hasChosenGuest) {
      setIsLoginDialogOpen(true);
    } else if (isAuthenticated) {
      setIsLoginDialogOpen(false);
    }
  }, [isLoading, isAuthenticated, hasChosenGuest]);

  useEffect(() => {
    if (isAuthenticated) setIsLoginDialogOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedQuantity !== null) {
      updateOrderSummary(selectedQuantity);
    } else if (manualQuantity) {
      const parsed = parseInt(manualQuantity, 10);
      if (!isNaN(parsed)) updateOrderSummary(parsed);
    }
  }, [isGeoTagged, currency, plantRates]);

  useEffect(() => {
    if (plantRates.length > 0 && orderSummary.geotaggedRate === undefined) {
      const symbol = getCurrencySymbol(currency);
      setOrderSummary((prev) => ({
        ...prev,
        geotaggedRate,
        nonGeotaggedRate,
        currencySymbol: symbol,
      }));
    }
  }, [plantRates, geotaggedRate, nonGeotaggedRate, currency, orderSummary.geotaggedRate]);

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
