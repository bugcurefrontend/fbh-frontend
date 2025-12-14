// TypeScript interfaces for HeroContent API

export interface HeroImage {
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
    large?: {
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

export interface HeroContent {
  id: number;
  documentId: string;
  image: HeroImage;
  title: string;
  button_label: string;
  button_url: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper interface for transformed/simplified hero content data
export interface HeroContentSimplified {
  id: number;
  documentId: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
  bgImage: string;
  deleted: boolean;
}

// API Response wrapper
export interface HeroContentApiResponse {
  data: HeroContent[];
}
