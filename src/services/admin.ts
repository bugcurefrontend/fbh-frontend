import { fetchAPI } from "./api";

// ============================================
// TypeScript Interfaces
// ============================================

/**
 * Dashboard Metrics Response
 */
export interface DashboardMetrics {
    total_donations: number;
    total_amount_inr: number;
    total_amount_usd: number;
    total_trees_allocated: number;
    total_donors: number;
    donations_this_month: number;
    amount_this_month_inr: number;
    amount_this_month_usd: number;
    trees_this_month: number;
}

/**
 * Donor Information
 */
export interface DonorInfo {
    id: number;
    user_name: string;
    user_email: string;
}

/**
 * Donation Item in List
 */
export interface DonationListItem {
    id: number;
    external_donation_id: string;
    transaction_id: string;
    hfn_receipt_number?: string;
    donor: DonorInfo;
    amount: number;
    currency: string;
    tree_count: number;
    project_id?: number;
    project_name?: string;
    species_id?: number;
    species_name?: string;
    dep_type?: "PROJECT" | "SPECIES" | "ATTRIBUTE";
    is_geotagged?: boolean;
    donation_date: string;
    donation_type?: "SELF" | "GIFT" | "RECEIVED";
    payment_status: "SUCCESS" | "FAILED" | "PENDING";
    processing_status?: string;
    is_premium?: boolean;
    certificate_url?: string;
    receipt_url?: string;
    recipient_details?: {
        recipient_name: string;
        recipient_email: string;
        trees_allocated: number;
    };
    gifted_by?: {
        donor_name: string;
        donor_email: string;
    };
    created_at?: string;
}

/**
 * Paginated Response for Donations
 */
export interface PaginatedDonationsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: DonationListItem[];
}

/**
 * Recent Donations Response
 */
export interface RecentDonationsResponse {
    count: number;
    results: DonationListItem[];
}

/**
 * Donation Detail Response
 */
export interface DonationDetail extends DonationListItem {
    project_id?: number;
    species_id?: number;
    donor_phone?: string;
    created_at?: string;
    allocation_details?: any;
}

/**
 * Transaction List Item
 * Uses the same serializer as DonationListItem on the backend
 */
export interface TransactionListItem extends DonationListItem {
    // TransactionListItem is the same as DonationListItem
    // Both endpoints use DonationListSerializer
}

/**
 * Paginated Transactions Response
 */
export interface PaginatedTransactionsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TransactionListItem[];
}

/**
 * Allocation Statistics
 */
export interface AllocationStatistics {
    total_allocations: number;
    total_trees_allocated: number;
    fully_allocated: number;
    partially_allocated: number;
    pending_allocation: number;
    allocations_by_project: Array<{
        project_id: number;
        total_trees: number;
    }>;
    allocations_by_species: Array<{
        species_id: number;
        total_trees: number;
    }>;
}

/**
 * Allocation List Item
 */
export interface AllocationListItem {
    id: number;
    donation_id: number;
    donor_id: number;
    allocation_status: "PENDING" | "PARTIAL" | "COMPLETED";
    total_trees: number;
    allocated_trees: number;
}

/**
 * Paginated Allocations Response
 */
export interface PaginatedAllocationsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: AllocationListItem[];
}

// ============================================
// API Functions
// ============================================

/**
 * 1. Get Dashboard Metrics
 * GET /api/admin/dashboard/metrics/
 */
export async function fetchDashboardMetrics(): Promise<DashboardMetrics | null> {
    try {
        const data = await fetchAPI("/admin/dashboard/metrics/");
        return data;
    } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
        return null;
    }
}

/**
 * 2. Get Recent Donations
 * GET /api/admin/donations/recent/
 */
export async function fetchRecentDonations(
    limit: number = 10
): Promise<RecentDonationsResponse | null> {
    try {
        const data = await fetchAPI("/admin/donations/recent/", { limit });
        return data;
    } catch (error) {
        console.error("Error fetching recent donations:", error);
        return null;
    }
}

/**
 * 3. Get Transaction List with Filters
 * GET /api/admin/transactions/list/
 */
export interface TransactionFilters {
    transaction_id?: string;
    date_from?: string;
    date_to?: string;
    project_id?: number;
    min_amount?: number;
    max_amount?: number;
    payment_status?: "SUCCESS" | "FAILED";
    page?: number;
    page_size?: number;
}

export async function fetchTransactionList(
    filters: TransactionFilters = {}
): Promise<PaginatedTransactionsResponse | null> {
    try {
        const data = await fetchAPI("/admin/transactions/list/", filters);
        return data;
    } catch (error) {
        console.error("Error fetching transaction list:", error);
        return null;
    }
}

/**
 * 4. Get Donation List with Filters
 * GET /api/admin/donations/list/
 */
export interface DonationFilters {
    donor_email?: string;
    donation_type?: "SELF" | "GIFT" | "RECEIVED";
    payment_status?: "SUCCESS" | "FAILED" | "PENDING";
    processing_status?: string;
    project_id?: number;
    species_id?: number;
    date_from?: string;
    date_to?: string;
    min_amount?: number;
    max_amount?: number;
    is_premium?: boolean;  // Geotagging filter
    page?: number;
    page_size?: number;
}

export async function fetchDonationList(
    filters: DonationFilters = {}
): Promise<PaginatedDonationsResponse | null> {
    try {
        const data = await fetchAPI("/admin/donations/list/", filters);
        return data;
    } catch (error) {
        console.error("Error fetching donation list:", error);
        return null;
    }
}

/**
 * 5. Get Donation Detail
 * GET /api/admin/donations/detail/{id}/
 */
export async function fetchDonationDetail(
    donationId: number
): Promise<DonationDetail | null> {
    try {
        const data = await fetchAPI(`/admin/donations/detail/${donationId}/`);
        return data;
    } catch (error) {
        console.error("Error fetching donation detail:", error);
        return null;
    }
}

/**
 * 6. Export Donations as CSV
 * GET /api/admin/donations/export/
 */
export async function exportDonations(
    filters: DonationFilters = {}
): Promise<Blob | null> {
    try {
        const queryString = new URLSearchParams(
            Object.entries(filters).reduce((acc, [key, value]) => {
                if (value !== undefined && value !== null) {
                    acc[key] = String(value);
                }
                return acc;
            }, {} as Record<string, string>)
        ).toString();

        const DJANGO_API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || 'https://api-django.fbh.dev.heartfulness.org';
        const url = `${DJANGO_API_URL}/api/admin/donations/export/${queryString ? `?${queryString}` : ""}`;

        // Get admin token from localStorage
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "text/csv",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to export donations: ${response.status}`);
        }

        return await response.blob();
    } catch (error) {
        console.error("Error exporting donations:", error);
        return null;
    }
}

/**
 * 7. Get Allocation Statistics
 * GET /api/admin/allocations/stats/
 */
export async function fetchAllocationStatistics(): Promise<AllocationStatistics | null> {
    try {
        const data = await fetchAPI("/admin/allocations/stats/");
        return data;
    } catch (error) {
        console.error("Error fetching allocation statistics:", error);
        return null;
    }
}

/**
 * 8. Get Allocation List with Filters
 * GET /api/admin/allocations/list/
 */
export interface AllocationFilters {
    allocation_status?: "PENDING" | "PARTIAL" | "COMPLETED";
    donor_id?: number;
    page?: number;
    page_size?: number;
}

export async function fetchAllocationList(
    filters: AllocationFilters = {}
): Promise<PaginatedAllocationsResponse | null> {
    try {
        const data = await fetchAPI("/admin/allocations/list/", filters);
        return data;
    } catch (error) {
        console.error("Error fetching allocation list:", error);
        return null;
    }
}
