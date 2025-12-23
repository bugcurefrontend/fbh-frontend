// TypeScript interfaces for Metric API

export interface MetricIcon {
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

export interface Metric {
  id: number;
  documentId: string;
  icon: MetricIcon;
  description: string;
  value: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Helper interface for transformed/simplified metric data
export interface MetricSimplified {
  id: number;
  documentId: string;
  icon: string;
  label: string;
  value: number;
  deleted: boolean;
}

// API Response wrapper
export interface MetricsApiResponse {
  data: Metric[];
}
