export interface OrderSummary {
  numberOfTrees: number;
  totalCo2Offset: string;
  totalAmount: string;
}

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
  country: string;
  state: string;
  city: string;
}

export interface TaxDetails {
  citizenship: string;
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
