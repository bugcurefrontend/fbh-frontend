// TypeScript interfaces for Contact API

export interface ContactFormData {
    first_name: string;
    last_name: string;
    email: string;
    message: string;
}

export interface ContactSubmission {
    id: number;
    documentId: string;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

// API Response wrapper
export interface ContactApiResponse {
    data: ContactSubmission;
}
