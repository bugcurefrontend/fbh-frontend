// TypeScript interfaces for Teams API

export interface TeamPhoto {
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

export type TeamCategory = "Leadership Team" | "Delivery Team" | "Domain Experts";

export interface TeamMember {
    id: number;
    documentId: string;
    name: string;
    photo: TeamPhoto;
    designation: string;
    team_category: TeamCategory;
    about: string;
    email: string;
    linkedin_url: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// Helper interface for transformed/simplified team member data
export interface TeamMemberSimplified {
    id: string;
    name: string;
    image: string; // URL to photo
    role: string; // designation
    linkedin: string; // linkedin_url
    description: string; // about field
    email: string;
    category: TeamCategory;
}

// API Response wrapper
export interface TeamsApiResponse {
    data: TeamMember[];
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
