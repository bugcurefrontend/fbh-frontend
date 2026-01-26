import { fetchAPI } from "./api";
import { fetchGlobal } from "./global";

/**
 * Interface for User Dashboard Stats
 */
export interface UserDashboardStats {
    total_trees_planted: number;
    projects_supported: number;
    co2_sequestered: number; // Calculated using Strapi global value
}

/**
 * Fetch user dashboard statistics
 */
export async function fetchUserDashboardStats(
    email: string
): Promise<UserDashboardStats | null> {
    try {
        // Fetch global data for CO2 value
        const globalData = await fetchGlobal();
        const co2PerTree = globalData?.co2_sequestation || 22; // Default to 22 if not set

        // Use the donation history API to calculate stats
        const data = await fetchAPI(`/donations/user/history/`, {
            email,
            page: 1,
            page_size: 1000, // Get all donations to calculate totals
        });

        if (data && data.donor) {
            const co2 = Math.round(data.donor.total_trees * co2PerTree);

            return {
                total_trees_planted: data.donor.total_trees || 0,
                projects_supported: data.donor.projects_contributed_to || 0,
                co2_sequestered: co2,
            };
        }

        return null;
    } catch (error) {
        console.error("Error fetching user dashboard stats:", error);
        return null;
    }
}
