// TypeScript interfaces for SupportingPartner API

export interface PartnerLogo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    small?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SupportingPartner {
  id: number;
  documentId: string;
  name: string;
  logo: PartnerLogo;
  company_url: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper interface for transformed/simplified partner data
export interface PartnerSimplified {
  id: number;
  documentId: string;
  name: string;
  logo: string; // URL to logo image
  companyUrl: string | null;
}

// API Response wrapper
export interface PartnersApiResponse {
  data: SupportingPartner[];
}
