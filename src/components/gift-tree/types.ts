export interface Recipient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  trees: number;
  region: string;
}

export interface RecipientFormData {
  selectedQuantity: number | null;
  manualQuantity: string;
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  phoneNumber: string;
}
