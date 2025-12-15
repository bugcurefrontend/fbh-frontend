// TypeScript interfaces for FooterMenu API

// Raw FooterMenu from Strapi API (Single Type)
export interface FooterMenu {
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Simplified menu item for UI
export interface FooterMenuItem {
  label: string;
  url: string;
}

// Simplified FooterMenu for UI
export interface FooterMenuSimplified {
  items: FooterMenuItem[];
}

// API Response wrapper
export interface FooterMenuApiResponse {
  data: FooterMenu;
}
