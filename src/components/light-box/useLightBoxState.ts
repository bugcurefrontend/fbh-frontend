import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCurrency } from "@/components/CurrencySelect";
import { City, Country } from "@/lib/location-utils";
import { OrderSummary as OrderSummaryType, PersonalDetails, TaxDetails } from "@/components/plant-tree/types";
import { INDIA_COUNTRY_CODE } from "@/utils/tax-constants";
import { isValidEmail, isValidIdNumber } from "@/utils/validations";
import { Attribute } from "@/types/attribute";
import { fetchAllAttributes } from "@/services/attributes";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { PlantRate } from "@/types/plant-rate";

interface UseLightBoxStateArgs {
  attributes: Attribute[];
  preSelectedAttribute: Attribute | null;
  co2Sequestration: number;
}

const quantities = [10, 25, 50, 100];

const emptySummary = (): OrderSummaryType => ({
  numberOfTrees: 0,
  totalCo2Offset: "--",
  totalAmount: "--",
});

const initialPersonalDetails = (currency: string): PersonalDetails => ({
  firstName: "",
  lastName: "",
  displayOnDonorsList: true,
  email: "",
  doorNo: "",
  pincode: "",
  region: "",
  phoneNumber: "",
  currency,
  country: null,
  state: "",
  city: null,
});

const initialTaxDetails = (): TaxDetails => ({
  citizenship: null,
  idType: "",
  idNumber: "",
  abhyashiNumber: "",
});

export function useLightBoxState({
  attributes,
  preSelectedAttribute,
  co2Sequestration,
}: UseLightBoxStateArgs) {
  const { currency, currencySymbol } = useCurrency();
  const [step, setStep] = useState(1);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [manualQuantity, setManualQuantity] = useState("");
  const [orderSummary, setOrderSummary] = useState<OrderSummaryType>(emptySummary());
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    initialPersonalDetails(currency)
  );
  const [taxDetails, setTaxDetails] = useState<TaxDetails>(initialTaxDetails());
  const [isGeoTagged, setIsGeoTagged] = useState(true);
  const [localAttributes, setLocalAttributes] = useState<Attribute[]>(attributes || []);
  const [occasion, setOccasion] = useState(preSelectedAttribute?.name || "");
  const [plantRates, setPlantRates] = useState<PlantRate[]>([]);
  const [isFetchingAttributes, setIsFetchingAttributes] = useState(false);
  const hasFetchedAttributes = useRef(false);

  const currentRate = useMemo(
    () => plantRates.find((r) => r.currency_code === currency),
    [plantRates, currency]
  );
  const geotaggedRate = useMemo(
    () => (currentRate ? currentRate.geotagged_rate : currency === "INR" ? 175 : 10),
    [currentRate, currency]
  );
  const nonGeotaggedRate = useMemo(
    () => (currentRate ? currentRate.non_geotagged_rate : currency === "INR" ? 150 : 5),
    [currentRate, currency]
  );

  const updateOrderSummary = useCallback(
    (qty: number) => {
      const rate = isGeoTagged ? geotaggedRate : nonGeotaggedRate;
      const amount = qty * rate;
      const co2Offset = Math.round(qty * co2Sequestration);
      const co2Label = co2Offset === 1 ? `${co2Offset} Kg` : `${co2Offset} Kg(s)`;
      setOrderSummary({
        numberOfTrees: qty,
        totalCo2Offset: co2Label,
        totalAmount:
          amount > 0
            ? `${currencySymbol} ${amount.toLocaleString(currency === "INR" ? "en-IN" : "en-US", {
              minimumFractionDigits: 2,
            })}`
            : "--",
      });
    },
    [isGeoTagged, geotaggedRate, nonGeotaggedRate, co2Sequestration, currency, currencySymbol]
  );

  const handleQuantitySelect = useCallback(
    (qty: number) => {
      const normalizedQty = Math.max(1, qty);
      setSelectedQuantity(normalizedQty);
      setManualQuantity("");
      updateOrderSummary(normalizedQty);
    },
    [updateOrderSummary]
  );

  const handleManualQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [updateOrderSummary]
  );

  const handleBack = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handlePersonalDetailsChange = useCallback(
    (field: keyof PersonalDetails, value: string | boolean | City | Country | null) => {
      setPersonalDetails((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleTaxDetailsChange = useCallback((field: keyof TaxDetails, value: string | Country | null) => {
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
  }, []);

  const handleGeoTaggedChange = useCallback((value: boolean) => {
    setIsGeoTagged(value);
  }, []);

  const emailValid = useMemo(() => isValidEmail(personalDetails.email), [personalDetails.email]);
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
      : personalDetails.country?.name?.trim() || personalDetails.country?.code?.trim() || "";
  const cityValue =
    typeof personalDetails.city === "string" ? personalDetails.city.trim() : personalDetails.city?.name?.trim() || "";
  const stateValue = personalDetails.state?.trim() || "";

  const isStep2Valid = useMemo(
    () =>
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
      cityValue !== "",
    [personalDetails, emailValid, phoneValid, pincodeValid, countryValue, stateValue, cityValue]
  );

  const handleSaveAndNext = useCallback(() => {
    if (step === 1 && (selectedQuantity || manualQuantity) && occasion.trim() !== "") {
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      setStep(3);
    }
  }, [step, selectedQuantity, manualQuantity, occasion, isStep2Valid]);

  const idNumberValid = useMemo(
    () => isValidIdNumber(taxDetails.idType, taxDetails.idNumber, false),
    [taxDetails.idType, taxDetails.idNumber]
  );
  const isStep3Valid = useMemo(
    () =>
      taxDetails.citizenship !== null &&
      (typeof taxDetails.citizenship === "object"
        ? taxDetails.citizenship.name
        : taxDetails.citizenship).trim() !== "" &&
      idNumberValid,
    [taxDetails, idNumberValid]
  );

  const selectedAttribute = localAttributes.find((a) => a.name === occasion);

  const resetState = useCallback(() => {
    setStep(1);
    setSelectedQuantity(null);
    setManualQuantity("");
    setOrderSummary(emptySummary());
    setPersonalDetails(initialPersonalDetails(currency));
    setTaxDetails(initialTaxDetails());
    setIsGeoTagged(true);
    setOccasion(preSelectedAttribute?.name || "");
  }, [currency, preSelectedAttribute]);

  useEffect(() => {
    fetchAllPlantRates().then(setPlantRates);
  }, []);

  useEffect(() => {
    if (attributes && attributes.length > 0) {
      setLocalAttributes(attributes);
      hasFetchedAttributes.current = true;
      return;
    }

    if (hasFetchedAttributes.current || isFetchingAttributes) return;

    const fetchAttrs = async () => {
      setIsFetchingAttributes(true);
      try {
        const mapped = await fetchAllAttributes();
        setLocalAttributes(mapped);
        hasFetchedAttributes.current = true;
      } catch (_e) {
        // Keep fallback attribute options in Step1 if fetch fails.
      } finally {
        setIsFetchingAttributes(false);
      }
    };

    fetchAttrs();
  }, []);

  useEffect(() => {
    if (preSelectedAttribute && preSelectedAttribute.name) {
      setOccasion(preSelectedAttribute.name);
    }
  }, [preSelectedAttribute]);

  useEffect(() => {
    updateOrderSummary((selectedQuantity || parseInt(manualQuantity, 10) || 0) as number);
  }, [isGeoTagged, currency, co2Sequestration, selectedQuantity, manualQuantity, updateOrderSummary]);

  return {
    step,
    quantities,
    selectedQuantity,
    manualQuantity,
    orderSummary,
    personalDetails,
    taxDetails,
    isGeoTagged,
    localAttributes,
    occasion,
    currency,
    currencySymbol,
    geotaggedRate,
    nonGeotaggedRate,
    emailValid,
    phoneValid,
    pincodeValid,
    idNumberValid,
    isStep2Valid,
    isStep3Valid,
    selectedAttribute,
    handleQuantitySelect,
    handleManualQuantityChange,
    handleSaveAndNext,
    handleBack,
    handlePersonalDetailsChange,
    handleTaxDetailsChange,
    handleGeoTaggedChange,
    setOccasion,
    resetState,
  };
}
