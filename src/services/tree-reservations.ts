import { fetchAPI } from "./api";

/**
 * Interface for Tree Reservation Request
 */
export interface TreeReservationRequest {
    dep_type: "PROJECT" | "SPECIES" | "ATTRIBUTE";
    dep_id?: number;
    tree_count: number;
    is_geotagged: boolean;
    user_email?: string;
}

/**
 * Species breakdown for PROJECT DEP
 */
export interface SpeciesBreakdown {
    species_id: number;
    available: number;
    allocated: number;
}

/**
 * Project breakdown for SPECIES DEP
 */
export interface ProjectBreakdown {
    project_id: number;
    available: number;
    allocated: number;
}

/**
 * Full breakdown for ATTRIBUTE DEP
 */
export interface AttributeBreakdown {
    project_id: number;
    species_id: number;
    available: number;
    allocated: number;
}

/**
 * Success response from reservation API
 */
export interface TreeReservationSuccess {
    success: true;
    reservation_token: string;
    reservation_id: number;
    expires_at: string; // ISO datetime
    expires_in_seconds: number;
    message: string;
    species_breakdown?: SpeciesBreakdown[];
    project_breakdown?: ProjectBreakdown[];
    breakdown?: AttributeBreakdown[];
}

/**
 * Error response from reservation API
 */
export interface TreeReservationError {
    success: false;
    error: string;
    message: string;
    requested?: number;
    available?: number;
}

/**
 * Union type for reservation response
 */
export type TreeReservationResponse = TreeReservationSuccess | TreeReservationError;

/**
 * Create a tree reservation (lock trees for 15 minutes)
 */
export async function createTreeReservation(
    request: TreeReservationRequest
): Promise<TreeReservationResponse> {
    try {
        const data = await fetchAPI(
            `/allocations/reservations/create/`,
            {},
            {
                method: 'POST',
                body: JSON.stringify(request)
            }
        );
        return data;
    } catch (error) {
        console.error("Error creating tree reservation:", error);

        // Try to extract error message from the error object
        if (error instanceof Error && error.message) {
            // Check if the error message contains a JSON response
            const match = error.message.match(/\{.*"message"\s*:\s*"([^"]+)"/);
            if (match && match[1]) {
                return {
                    success: false,
                    error: "reservation_failed",
                    message: match[1] // Use backend's error message
                };
            }
        }

        // Fallback to generic error
        return {
            success: false,
            error: "network_error",
            message: "Unable to reserve trees. Please try again."
        };
    }
}
