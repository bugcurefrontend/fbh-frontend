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
