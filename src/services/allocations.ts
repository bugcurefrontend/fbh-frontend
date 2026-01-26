import { fetchAPI } from "./api";

export interface ProjectDonor {
    donor_name: string;
    city: string; // mapped to location
    donation_date: string;
    donation_for: "Self" | "Gifting";
    trees_planted: number;
}

export interface ProjectDonorsResponse {
    success: boolean;
    project_id: number;
    project_name: string;
    count: number;
    next: string | null;
    previous: string | null;
    results: ProjectDonor[];
}

/**
 * Fetch donors list for a project
 */
export async function fetchProjectDonors(
    projectId: string | number,
    page: number = 1,
    pageSize: number = 10
): Promise<ProjectDonorsResponse | null> {
    try {
        const data = await fetchAPI(
            `/allocations/projects/${projectId}/donors/`,
            {
                page,
                page_size: pageSize,
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching project donors:", error);
        return null;
    }
}

/**
 * Interface for Non-Geotagged Tree Breakdown Item
 */
export interface NonGeotaggedTreeItem {
    project_id: number;
    project_name: string;
    species_id: number;
    species_name: string;
    total_trees_planted: number;
    tree_type: "NON_GEOTAGGED";
}

/**
 * Interface for Non-Geotagged Trees API Response
 */
export interface NonGeotaggedTreesResponse {
    success: boolean;
    donation_id: number;
    transaction_id: string;
    total_trees: number;
    non_geotagged_trees: number;
    breakdown: NonGeotaggedTreeItem[];
}

/**
 * Fetch non-geotagged trees breakdown for a donation
 */
export async function fetchNonGeotaggedTrees(
    donationId: number | string
): Promise<NonGeotaggedTreesResponse | null> {
    try {
        const data = await fetchAPI(
            `/allocations/donations/${donationId}/non-geotagged-trees/`
        );
        return data;
    } catch (error) {
        console.error("Error fetching non-geotagged trees:", error);
        return null;
    }
}

/**
 * Interface for Project Metrics Response
 */
export interface ProjectMetrics {
    success: boolean;
    project_id: number;
    project_name: string;
    total_trees: number;
    geotagged_trees: number;
    non_geotagged_trees: number;
}

/**
 * Fetch tree metrics for a project
 */
export async function fetchProjectMetrics(
    projectId: number | string
): Promise<ProjectMetrics | null> {
    try {
        const data = await fetchAPI(
            `/allocations/projects/${projectId}/tree-metrics/`
        );
        return data;
    } catch (error) {
        console.error("Error fetching project metrics:", error);
        return null;
    }
}
/**
 * Interface for Geotagged Tree Item
 */
export interface GeotaggedTreeItem {
    tree_id: number;
    project_id: number;
    project_name: string;
    species_id: number;
    species_name: string;
    latitude: number;
    longitude: number;
    planted_date: string | null;
    is_alive: boolean;
}

/**
 * Interface for Geotagged Trees API Response
 */
export interface GeotaggedTreesResponse {
    success: boolean;
    donation_id: number;
    transaction_id: string;
    total_trees: number;
    geotagged_trees: number;
    trees: GeotaggedTreeItem[];
}

/**
 * Fetch individual geotagged trees for a donation
 */
export async function fetchGeotaggedTrees(
    donationId: number | string
): Promise<GeotaggedTreesResponse | null> {
    try {
        const data = await fetchAPI(
            `/allocations/donations/${donationId}/geotagged-trees/`
        );
        return data;
    } catch (error) {
        console.error("Error fetching geotagged trees:", error);
        return null;
    }
}
