// TypeScript interfaces for SocialLink API

// Raw SocialLink from Strapi API (Single Type)
export interface SocialLink {
  id: number;
  documentId: string;
  youtube_url: string;
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
  x_url: string;
  appstore_url: string;
  playstore_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Simplified SocialLink for UI
export interface SocialLinkSimplified {
  youtube: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  x: string;
  appstore: string;
  playstore: string;
}

// API Response wrapper
export interface SocialLinkApiResponse {
  data: SocialLink;
}
