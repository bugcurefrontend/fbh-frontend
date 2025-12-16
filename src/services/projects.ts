/**
 * Projects API Service
 * Direct Strapi API calls at build time (like donations-nextjs pattern)
 * Uses React cache() to deduplicate requests during a single render pass
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Project, ProjectSimplified, TreeCount } from "@/types/project";

/**
 * Calculate total planted count from tree_counts
 */
function calculatePlantedCount(treeCounts: TreeCount[]): number {
  if (!treeCounts || !Array.isArray(treeCounts)) return 0;
  return treeCounts.reduce((sum, tc) => sum + (tc.total || 0), 0);
}

/**
 * Transform raw Strapi project data to simplified format
 */
function transformProject(project: Project): ProjectSimplified {
  return {
    id: project.id,
    documentId: project.documentId,
    name: project.name,
    archetype: project.archetype || "",
    thumbnail: project.thumbnail?.url || project.images?.[0]?.url || "",
    images: project.images || [],
    videoThumbnail: project.video_thumbnail?.url || null,
    videoUrl: project.video_url,
    description: project.description,
    address: project.address || "",
    mapCode: project.map_code || "",
    plantedCount: calculatePlantedCount(project.tree_counts),
    species: project.species || [],
    projectUpdates: project.project_updates || [],
    deleted: project.deleted || false,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

/**
 * Generate URL-friendly slug from project name
 */
export function generateProjectSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetch all projects from Strapi API
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchAllProjects = cache(async (): Promise<ProjectSimplified[]> => {
  try {
    let allProjects: Project[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages to handle large datasets
    do {
      const data = await fetchAPI("/projects", {
        populate: {
          thumbnail: { populate: "*" },
          images: { populate: "*" },
          video_thumbnail: { populate: "*" },
          tree_counts: { populate: "*" },
          species: { populate: "*" },
          project_updates: { populate: "*" },
        },
        filters: {
          deleted: { $eq: false },
        },
        pagination: {
          page: currentPage,
          pageSize: 100,
        },
      });

      if (data.meta?.pagination) {
        totalPages = data.meta.pagination.pageCount;
      }

      if (data.data && Array.isArray(data.data)) {
        allProjects = allProjects.concat(data.data);
      }

      currentPage++;
    } while (currentPage <= totalPages);

    return allProjects.map((project: Project) => transformProject(project));
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
});

/**
 * Fetch limited projects for landing page
 * @param limit - Number of projects to fetch (default 6)
 */
export async function fetchLandingProjects(limit: number = 6): Promise<ProjectSimplified[]> {
  try {
    const data = await fetchAPI("/projects", {
      populate: {
        thumbnail: { populate: "*" },
        images: { populate: "*" },
        video_thumbnail: { populate: "*" },
        tree_counts: { populate: "*" },
      },
      filters: {
        deleted: { $eq: false },
      },
      pagination: {
        pageSize: limit,
      },
    });

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((project: Project) => transformProject(project));
    }

    return [];
  } catch (error) {
    console.error("Error fetching landing projects:", error);
    return [];
  }
}

/**
 * Fetch single project by slug
 * Wrapped with cache() to deduplicate calls during a single render pass
 */
export const fetchProjectBySlug = cache(async (
  slug: string
): Promise<ProjectSimplified | null> => {
  try {
    const allProjects = await fetchAllProjects();
    const project = allProjects.find((p) => generateProjectSlug(p.name) === slug);
    return project || null;
  } catch (error) {
    console.error(`Error fetching project by slug ${slug}:`, error);
    return null;
  }
});

/**
 * Fetch single project by documentId
 */
export async function fetchProjectById(
  documentId: string
): Promise<ProjectSimplified | null> {
  try {
    const data = await fetchAPI(`/projects/${documentId}`, {
      populate: {
        thumbnail: { populate: "*" },
        images: { populate: "*" },
        video_thumbnail: { populate: "*" },
        tree_counts: { populate: "*" },
        species: { populate: "*" },
        project_updates: { populate: "*" },
      },
    });

    if (data.data) {
      const project: Project = data.data;
      if (project.deleted) {
        return null;
      }
      return transformProject(project);
    }

    return null;
  } catch (error) {
    console.error(`Error fetching project by id ${documentId}:`, error);
    return null;
  }
}
