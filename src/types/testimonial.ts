// TypeScript interfaces for Testimonial API

export interface TestimonialImage {
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

export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  designation: string;
  body: string;
  profile_image: TestimonialImage;
  video_url: string | null;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper interface for transformed/simplified testimonial data
export interface TestimonialSimplified {
  id: number;
  documentId: string;
  name: string;
  designation: string;
  quote: string;
  src: string;
  videoUrl: string | null;
  deleted: boolean;
}

// API Response wrapper
export interface TestimonialsApiResponse {
  data: Testimonial[];
}
