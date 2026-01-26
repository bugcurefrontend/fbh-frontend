export interface OrderSummary {
  numberOfTrees: number;
  totalCo2Offset: string;
  totalAmount: string;
  geotaggedRate?: number;
  nonGeotaggedRate?: number;
  currencySymbol?: string;
}

import { City, Country } from "@/lib/location-utils";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  displayOnDonorsList: boolean;
  email: string;
  doorNo: string;
  pincode: string;
  region: string;
  phoneNumber: string;
  currency: string;
  country: string | Country | null;
  state: string;
  city: string | City | null;
}

export interface TaxDetails {
  citizenship: string | Country | null;
  idType: string;
  idNumber: string;
  abhyashiNumber: string;
}

export interface Species {
  id: number;
  name: string;
  botanical: string;
  img: string;
  availableTags?: Array<"geo" | "non-geo">;
}

export interface ReservationData {
  token: string;
  expiresAt: string;
  reservationId: number;
  message?: string;
}
