import { fetchAPI } from "./api";

/**
 * Interface for Tree Availability Request
 */
export interface TreeAvailabilityRequest {
    dep_type: "PROJECT" | "SPECIES" | "ATTRIBUTE";
    dep_id?: number;
    is_geotagged?: boolean;
}

/**
 * Interface for Species Breakdown (when DEP = PROJECT)
 */
export interface SpeciesBreakdown {
    species_id: number;
    available: number;
}

/**
 * Interface for Project Breakdown (when DEP = SPECIES)
 */
export interface ProjectBreakdown {
    project_id: number;
    available: number;
}

/**
 * Interface for Tree Availability Response
 */
export interface TreeAvailabilityResponse {
    success: boolean;
    dep_type: "PROJECT" | "SPECIES" | "ATTRIBUTE";
    project_id?: number;
    species_id?: number;
    total_available: number;
    species_breakdown?: SpeciesBreakdown[];
    project_breakdown?: ProjectBreakdown[];
    message?: string;
}

/**
 * Fetch available trees based on DEP type
 */
export async function fetchTreeAvailability(
    request: TreeAvailabilityRequest
): Promise<TreeAvailabilityResponse | null> {
    try {
        const data = await fetchAPI(
            `/allocations/availability/`,
            {},
            {
                method: 'POST',
                body: JSON.stringify(request)
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching tree availability:", error);
        return null;
    }
}
