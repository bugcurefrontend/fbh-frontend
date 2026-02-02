import { useState, useMemo, useEffect } from "react";
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
import { SPECIES_DATA } from "@/components/plant-tree/constants";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";
import { fetchTreeAvailability } from "@/services/tree-availability";
import { createTreeReservation } from "@/services/tree-reservations";
import { fetchAllSpecies } from "@/services/species";
import { SpeciesSimplified } from "@/types/species";
import { Recipient } from "@/components/gift-tree/types";

export const useGiftTree = (co2PerTree?: number, initialPlantRates: PlantRate[] = []) => {
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

    const handleGeoTaggedChange = (value: boolean) => {
        setIsGeoTagged(value);
        const params = new URLSearchParams(searchParams.toString());
        params.set("geo", value ? "true" : "false");
        router.push(`${pathname}?${params.toString()}`);
    };

    const [isGeoTagged, setIsGeoTagged] = useState(() => {
        const geoParam = searchParams.get("geo");
        if (geoParam === "false") return false;
        return true; // Default to true
    });

    const [selectedSpeciesId, setSelectedSpeciesId] = useState<number>(1);
    const [recipients, setRecipients] = useState<Recipient[]>(() => {
        if (typeof window === "undefined") return [];
        const stored = localStorage.getItem("recipients");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {
                console.error("Failed to parse stored recipients:", e);
            }
        }
        return [];
    });

    const [previewQuantity, setPreviewQuantity] = useState(0);
    const [editingRecipientId, setEditingRecipientId] = useState<number | null>(null);
    const [availableCount, setAvailableCount] = useState(10);
    const [availabilityMessage, setAvailabilityMessage] = useState("");
    const [reservationData, setReservationData] = useState<ReservationData | null>(null);
    const [reservationError, setReservationError] = useState("");
    const [isLoadingReservation, setIsLoadingReservation] = useState(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [hasChosenGuest, setHasChosenGuest] = useState(false);

    const { isAuthenticated, isLoading, login } = useAuth();
    const { currency } = useCurrency();

    // Sync state when URL changes (browser back/forward)
    useEffect(() => {
        const stepParam = searchParams.get("step");
        const currentStep = stepParam ? parseInt(stepParam, 10) : 1;
        if (currentStep !== step) {
            setStepState(currentStep);
        }
    }, [searchParams]);

    // Sync recipients to localStorage
    useEffect(() => {
        if (recipients.length > 0) {
            localStorage.setItem("recipients", JSON.stringify(recipients));
        } else {
            localStorage.removeItem("recipients");
        }
    }, [recipients]);

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

    useEffect(() => {
        setPersonalDetails(prev => ({ ...prev, currency }));
    }, [currency]);

    const [plantRates, setPlantRates] = useState<PlantRate[]>(initialPlantRates);
    const [strapiSpecies, setStrapiSpecies] = useState<SpeciesSimplified[]>([]);

    useEffect(() => {
        if (initialPlantRates.length === 0) {
            fetchAllPlantRates().then(setPlantRates);
        }
        fetchAllSpecies().then(species => {
            if (species && species.length > 0) setStrapiSpecies(species);
        });
    }, []);

    const currentRate = useMemo(() =>
        plantRates.find((r) => r.currency_code === currency),
        [plantRates, currency]
    );

    const geotaggedRate = currentRate ? currentRate.geotagged_rate : (currency === "INR" ? 175 : 10);
    const nonGeotaggedRate = currentRate ? currentRate.non_geotagged_rate : (currency === "INR" ? 150 : 5);

    console.log("💰 [GiftTree] Rate context:", {
        currency,
        currentRate,
        geotaggedRate,
        nonGeotaggedRate,
        isGeoTagged
    });

    const speciesList = useMemo(() => {
        if (strapiSpecies.length > 0) {
            return strapiSpecies.map(s => ({
                id: s.id,
                name: s.name,
                botanical: s.scientificName,
                img: s.image || "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=120&h=120&fit=crop",
                availableTags: ["geo", "non-geo"] as ("geo" | "non-geo")[]
            }));
        }
        return SPECIES_DATA;
    }, [strapiSpecies]);

    const availableSpeciesForTag = useMemo(() => {
        const tagKey = isGeoTagged ? "geo" : "non-geo";
        return speciesList.filter((s) =>
            (s.availableTags ?? ["geo", "non-geo"]).includes(tagKey)
        );
    }, [speciesList, isGeoTagged]);

    const totalTrees = useMemo(() => {
        const savedTrees = recipients
            .filter(r => r.id !== editingRecipientId)
            .reduce((sum, r) => sum + r.trees, 0);
        return savedTrees + previewQuantity;
    }, [recipients, previewQuantity, editingRecipientId]);

    const orderSummary: OrderSummaryType = useMemo(() => {
        const perTreeCo2 = co2PerTree ?? 16.67;
        const co2Offset = Math.round(totalTrees * perTreeCo2);
        const rate = isGeoTagged ? geotaggedRate : nonGeotaggedRate;
        const amount = totalTrees * rate;
        const symbol = currency === "INR" ? "₹" : "$";

        return {
            numberOfTrees: totalTrees,
            totalCo2Offset: totalTrees === 1 ? `${co2Offset} Kg` : `${co2Offset} Kg(s)`,
            totalAmount: amount > 0 ? `${symbol} ${amount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US', { minimumFractionDigits: 2 })}` : "--",
            geotaggedRate,
            nonGeotaggedRate,
            currencySymbol: symbol,
            rate,
        };
    }, [totalTrees, isGeoTagged, geotaggedRate, nonGeotaggedRate, currency, co2PerTree]);

    const handleCreateReservation = async () => {
        if (totalTrees === 0) {
            setReservationError("Please add recipients with trees");
            return false;
        }

        setIsLoadingReservation(true);
        setReservationError("");

        try {
            const response = await createTreeReservation({
                dep_type: "SPECIES",
                dep_id: selectedSpeciesId,
                tree_count: totalTrees,
                is_geotagged: isGeoTagged,
                user_email: personalDetails.email || undefined,
            });

            if (response.success) {
                setReservationData({
                    token: response.reservation_token,
                    expiresAt: response.expires_at,
                    reservationId: response.reservation_id,
                    message: response.message,
                });
                return true;
            } else {
                setReservationError(response.message);
                return false;
            }
        } catch (error) {
            setReservationError("Unable to reserve trees. Please try again.");
            return false;
        } finally {
            setIsLoadingReservation(false);
        }
    };

    const handleNextStep = async () => {
        if (step === 1) {
            if (totalTrees === 0) return false;
            setStep(2);
            return true;
        } else if (step === 2) {
            const success = await handleCreateReservation();
            if (success) {
                setStep(3);
                return true;
            }
            return false;
        }
        return false;
    };

    const handlePersonalDetailsChange = (field: keyof PersonalDetails, value: any) => {
        setPersonalDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleTaxDetailsChange = (field: keyof TaxDetails, value: any) => {
        if (field === "citizenship") {
            const isIndian = typeof value === "object" && value?.id === INDIA_COUNTRY_CODE;
            setTaxDetails(prev => ({
                ...prev,
                citizenship: value,
                idType: isIndian ? "pan" : "passport",
                idNumber: "",
            }));
            return;
        }
        setTaxDetails(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const checkAvailability = async () => {
            if (totalTrees === 0) return;
            const response = await fetchTreeAvailability({
                dep_type: "SPECIES",
                dep_id: selectedSpeciesId,
                is_geotagged: isGeoTagged
            });

            if (response && response.success) {
                const available = response.total_available;
                setAvailableCount(available);
                if (totalTrees > available) {
                    setAvailabilityMessage(`Only ${available} trees available for this species.`);
                } else {
                    setAvailabilityMessage("");
                }
            }
        };
        const timeoutId = setTimeout(checkAvailability, 500);
        return () => clearTimeout(timeoutId);
    }, [totalTrees, selectedSpeciesId, isGeoTagged]);

    const emailValid = useMemo(() =>
        personalDetails.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(personalDetails.email),
        [personalDetails.email]
    );

    const idNumberValid = useMemo(() => {
        if (!taxDetails.idNumber) return true;
        const v = validations[taxDetails.idType as keyof typeof validations];
        return v && v.value instanceof RegExp ? v.value.test(taxDetails.idNumber) : true;
    }, [taxDetails.idNumber, taxDetails.idType]);

    const isFormValid = useMemo(() =>
        totalTrees > 0 &&
        personalDetails.firstName.trim() !== "" &&
        personalDetails.lastName.trim() !== "" &&
        personalDetails.email.trim() !== "" &&
        emailValid &&
        taxDetails.citizenship !== null &&
        taxDetails.idNumber.trim() !== "" &&
        idNumberValid,
        [totalTrees, personalDetails, taxDetails, emailValid, idNumberValid]
    );

    return {
        step, setStep, recipients, setRecipients, isGeoTagged, setIsGeoTagged,
        selectedSpeciesId, setSelectedSpeciesId, availabilityMessage,
        orderSummary, personalDetails, taxDetails, reservationData, reservationError,
        isLoadingReservation, isLoginDialogOpen, setIsLoginDialogOpen,
        speciesList, availableSpeciesForTag, emailValid, idNumberValid, isFormValid,
        handlePersonalDetailsChange, handleTaxDetailsChange, handleNextStep,
        setPreviewQuantity, availableCount, editingRecipientId, setEditingRecipientId,
        handleGeoTaggedChange
    };
};
