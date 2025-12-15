// TypeScript interfaces for Species API

export interface ImageFormat {
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
}

export interface SpeciesImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
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

export interface FAQ {
  question: string;
  answer: string;
}

export interface Species {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  common_name: string;
  scientific_name: string;
  description: string;
  lifespan: string;
  oxygen_released: string;
  max_height: string;
  faq1_question: string;
  faq1_answer: string;
  faq2_question: string;
  faq2_answer: string;
  faq3_question: string;
  faq3_answer: string;
  faq4_question: string;
  faq4_answer: string;
  faq5_question: string;
  faq5_answer: string;
  faq6_question?: string;
  faq6_answer?: string;
  deleted: boolean;
  popular: boolean; // Popular species shown on landing page
  images: SpeciesImage[];
  trees: any[]; // Can be typed more specifically if needed
  projects: any[]; // Can be typed more specifically if needed
  tree_counts: any[]; // Can be typed more specifically if needed
}

// Helper interface for transformed/simplified species data
export interface SpeciesSimplified {
  id: number;
  documentId: string;
  name: string;
  scientificName: string;
  description: string;
  lifespan: string;
  oxygenReleased: string;
  maxHeight: string;
  image: string; // Main image URL
  images: SpeciesImage[]; // Full image array
  faqs: FAQ[];
  deleted: boolean;
  popular: boolean; // Popular species shown on landing page
  createdAt: string;
  updatedAt: string;
}

// API Response wrapper
export interface SpeciesApiResponse {
  data: Species[];
}

export interface SingleSpeciesApiResponse {
  data: Species;
}
