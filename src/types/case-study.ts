// TypeScript interfaces for CaseStudy API

export interface CaseStudyMedia {
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
    medium?: {
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

export interface CaseStudy {
  id: number;
  documentId: string;
  title: string;
  address: string;
  description: string; // Rich text (Markdown)
  partners: CaseStudyMedia[];
  media: CaseStudyMedia[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper interface for transformed/simplified case study data
export interface CaseStudySimplified {
  id: number;
  documentId: string;
  title: string;
  address: string; // Used as subtitle in UI
  description: string;
  image: string; // First media URL for card display
  images: CaseStudyMedia[]; // Full media array
  partnerLogos: string[]; // Partner logo URLs
  deleted: boolean;
}

// API Response wrapper
export interface CaseStudiesApiResponse {
  data: CaseStudy[];
}
