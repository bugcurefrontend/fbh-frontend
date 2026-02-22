import { donations } from "./mock-data";

export type Donation = (typeof donations)[0];

export interface DonationCard {
  id: number;
  geoTagged: string;
  logoSrc: string;
  name: string;
  reference: string;
  trees: number;
  donationFor: string;
  date: string;
  accent: string;
  location: string;
  status: string;
  statusAccent: string;
  recipientName: string;
  certificateUrl: string | null;
  receiptUrl: string | null;
  giftedBy?: {
    donor_name?: string;
    donor_email?: string;
  };
}

export interface DashboardStatCard {
  label: string;
  value: string;
  suffix: string;
  icon: string;
  accent: string;
}
