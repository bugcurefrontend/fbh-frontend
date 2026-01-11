/**
 * Teams API Service
 * Fetches team members from Strapi and filters by category
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { TeamMember, TeamMemberSimplified } from "@/types/team";

/**
 * Transform raw Strapi team member data to simplified format
 */
function transformTeamMember(member: TeamMember): TeamMemberSimplified {
    return {
        id: member.documentId,
        name: member.name,
        image: member.photo?.url || "",
        role: member.designation,
        linkedin: member.linkedin_url || "#",
        description: member.about || "",
        email: member.email,
        category: member.team_category,
    };
}

/**
 * Fetch all team members from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllTeams = cache(
    async (): Promise<TeamMemberSimplified[]> => {
        try {
            let allMembers: TeamMember[] = [];
            let currentPage = 1;
            let totalPages = 1;

            // Fetch all pages to handle large datasets
            do {
                const data = await fetchAPI("/teams", {
                    populate: {
                        photo: { populate: "*" },
                    },
                    pagination: {
                        page: currentPage,
                        pageSize: 100,
                    },
                    filters: {
                        deleted: {
                            $ne: true,
                        },
                    },
                });

                if (data.meta?.pagination) {
                    totalPages = data.meta.pagination.pageCount;
                }

                if (data.data && Array.isArray(data.data)) {
                    allMembers = allMembers.concat(data.data);
                }

                currentPage++;
            } while (currentPage <= totalPages);

            // Transform to simplified format
            return allMembers.map((member: TeamMember) =>
                transformTeamMember(member)
            );
        } catch (error) {
            console.error("Error fetching all teams:", error);
            return [];
        }
    }
);
