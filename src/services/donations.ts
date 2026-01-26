import { fetchAPI } from "./api";

/**
 * Interface for individual donation in history
 */
export interface DonationHistoryItem {
    donation_id: number;
    reference_number: string;
    external_donation_id: string;
    dep_type: "PROJECT" | "SPECIES" | "ATTRIBUTE";
    project_id: number | null;
    project_name: string | null;
    species_id: number | null;
    species_name: string | null;
    donation_type: "Self" | "Gifting" | "Received";
    donation_date: string;
    trees_planted: number;
    is_geotagged: boolean;
    amount: number;
    currency: string;
    payment_status: "SUCCESS" | "FAILED" | "PENDING";
    certificate_url: string | null;
    receipt_url: string | null;
    recipient_details?: {
        recipient_name: string;
        recipient_email: string;
        trees_allocated: number;
    };
    gifted_by?: {
        donor_name: string;
        donor_email: string;
    };
}

/**
 * Interface for Donation History API Response
 */
export interface DonationHistoryResponse {
    success: boolean;
    donor: {
        id: number;
        name: string;
        email: string;
        total_donations: number;
        total_trees: number;
        total_amount: number;
        projects_contributed_to: number;
    };
    count: number;
    next: string | null;
    previous: string | null;
    results: DonationHistoryItem[];
}

/**
 * Fetch donation history for a user
 */
export async function fetchDonationHistory(
    email: string,
    page: number = 1,
    pageSize: number = 20
): Promise<DonationHistoryResponse | null> {
    try {
        const data = await fetchAPI(
            `/donations/user/history/`,
            {
                email,
                page,
                page_size: pageSize,
            }
        );
        return data;
    } catch (error) {
        console.error("Error fetching donation history:", error);
        return null;
    }
}
