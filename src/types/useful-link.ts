// TypeScript interfaces for UsefulLink API

// Raw UsefulLink from Strapi API (Single Type)
export interface UsefulLink {
  id: number;
  documentId: string;
  label1: string;
  url1: string;
  label2: string;
  url2: string;
  label3: string;
  url3: string;
  label4: string;
  url4: string;
  label5: string;
  url5: string;
  label6: string;
  url6: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Simplified link item for UI
export interface UsefulLinkItem {
  label: string;
  url: string;
}

// Simplified UsefulLink for UI
export interface UsefulLinkSimplified {
  items: UsefulLinkItem[];
}

// API Response wrapper
export interface UsefulLinkApiResponse {
  data: UsefulLink;
}
