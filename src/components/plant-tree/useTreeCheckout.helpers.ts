import { City, Country } from "@/lib/location-utils";
import { OrderSummary, PersonalDetails, TaxDetails } from "@/components/plant-tree/types";

export function createEmptyOrderSummary(): OrderSummary {
  return {
    numberOfTrees: 0,
    totalCo2Offset: "--",
    totalAmount: "--",
  };
}

export function createInitialPersonalDetails(currency: string): PersonalDetails {
  return {
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
  };
}

export function createInitialTaxDetails(): TaxDetails {
  return {
    citizenship: null,
    idType: "",
    idNumber: "",
    abhyashiNumber: "",
  };
}

export function getCurrencySymbol(currency: string): string {
  return currency === "INR" ? "\u20B9" : "$";
}

interface BuildOrderSummaryArgs {
  qty: number;
  isGeoTagged: boolean;
  geotaggedRate: number;
  nonGeotaggedRate: number;
  currency: string;
  co2PerTree?: number;
}

export function buildOrderSummary({
  qty,
  isGeoTagged,
  geotaggedRate,
  nonGeotaggedRate,
  currency,
  co2PerTree,
}: BuildOrderSummaryArgs): OrderSummary {
  if (qty === 0) {
    return createEmptyOrderSummary();
  }

  const perTreeCo2 = co2PerTree ?? 16.67;
  const co2Offset = Math.round(qty * perTreeCo2);
  const rate = isGeoTagged ? geotaggedRate : nonGeotaggedRate;
  const symbol = getCurrencySymbol(currency);

  return {
    numberOfTrees: qty,
    totalCo2Offset: co2Offset === 1 ? `${co2Offset} Kg` : `${co2Offset} Kg(s)`,
    totalAmount: `${symbol} ${Number(qty * rate).toFixed(2)}`,
    geotaggedRate,
    nonGeotaggedRate,
    currencySymbol: symbol,
    rate,
  };
}

export function getCountryValue(country: PersonalDetails["country"]): string {
  if (typeof country === "string") return country.trim();
  return country?.name?.trim() || country?.code?.trim() || "";
}

export function getCityValue(city: PersonalDetails["city"]): string {
  if (typeof city === "string") return city.trim();
  return city?.name?.trim() || "";
}

export function isCitizenshipPresent(citizenship: TaxDetails["citizenship"]): boolean {
  if (citizenship === null) return false;
  if (typeof citizenship === "string") return citizenship.trim() !== "";
  return citizenship.name.trim() !== "";
}

export function sanitizePersonalField(
  field: keyof PersonalDetails,
  value: string
): string {
  if (field === "pincode") return value.replace(/[^0-9]/g, "").slice(0, 10);
  if (field === "phoneNumber") return value.replace(/[^0-9]/g, "").slice(0, 15);
  if (field === "email") return value.trimStart();
  if (field === "doorNo") return value.replace(/[^A-Za-z0-9\s,./#-]/g, "").slice(0, 120);
  return value;
}

export type PersonalFieldValue = string | boolean | City | Country | null;
