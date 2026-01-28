import { fetchAPI } from "./api";

/**
 * Interface for Certificate Validation Response (Geotagged)
 */
export interface GeotaggedTreeDetail {
    tree_id: number;
    project_id: number | null;
    species_id: number | null;
    latitude: number | null;
    longitude: number | null;
}

/**
 * Interface for Certificate Validation Response (Non-Geotagged)
 */
export interface NonGeotaggedTreeDetail {
    project_id: number | null;
    species_id: number | null;
    total_trees_planted: number;
}

export interface CertificateValidationResponse {
    success: boolean;
    validation_status: "Valid" | "Invalid";
    message: string;
    certificate_id?: string;
    dep_id?: number;
    dep_type?: "PROJECT" | "SPECIES" | "ATTRIBUTE";
    is_geotagged?: boolean;
    date?: string;
    reference_number?: string;
    recipient_name?: string;
    trees_planted?: number;
    tree_details?: GeotaggedTreeDetail[] | NonGeotaggedTreeDetail[];
}

/**
 * Validate a certificate using certificate ID
 */
export async function validateCertificate(
    certificateId: string
): Promise<CertificateValidationResponse | null> {
    try {
        const data = await fetchAPI(`/certificates/verify`, {
            certificate: certificateId,
        });
        return data;
    } catch (error) {
        console.error("Error validating certificate:", error);
        return {
            success: false,
            validation_status: "Invalid",
            message: "Failed to validate certificate. Please try again.",
        };
    }
}
