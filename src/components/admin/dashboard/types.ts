import type { ComponentType } from "react";

export interface AnalyticsCard {
  id: number;
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: number;
  bgColor?: string;
  tooltip?: string;
}

export interface ChartDatum {
  day?: string;
  month?: string;
  amount: number;
  fill: string;
  isEmpty?: boolean;
}

export interface RecentDonationRow {
  id: number;
  hrIdTo: string;
  name: string;
  trees: string;
  donationFor: string;
  donationForColor: string;
  cat: string;
  geoTagged: boolean;
  currency: string;
  amount: number;
  fundUrl: string;
}
