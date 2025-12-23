// TypeScript interfaces for Project API

export interface ProjectImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface TreeCount {
  id: number;
  documentId: string;
  total: number;
  specie?: {
    id: number;
    documentId: string;
    common_name: string;
  };
}

export interface ProjectUpdate {
  id: number;
  documentId: string;
  date: string;
  remarks: string;
  media: ProjectImage[];
  deleted: boolean;
}

// Raw Project from Strapi API
export interface Project {
  id: number;
  documentId: string;
  name: string;
  archetype: string;
  thumbnail: ProjectImage | null;
  images: ProjectImage[];
  video_thumbnail: ProjectImage | null;
  video_url: string | null;
  description: any; // Rich text blocks
  address: string;
  map_code: string;
  species: any[]; // Related species
  project_updates: ProjectUpdate[];
  trees: any[];
  tree_counts: TreeCount[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Simplified Project for UI
export interface ProjectSimplified {
  id: number;
  documentId: string;
  name: string;
  archetype: string;
  thumbnail: string; // URL
  images: ProjectImage[];
  videoThumbnail: string | null; // Video thumbnail URL
  videoUrl: string | null;
  description: any;
  address: string;
  mapCode: string;
  plantedCount: number; // Sum of tree_counts.total
  species: any[];
  projectUpdates: ProjectUpdate[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response wrapper
export interface ProjectApiResponse {
  data: Project[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
