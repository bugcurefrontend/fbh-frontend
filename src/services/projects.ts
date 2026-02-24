/**
 * Projects API Service
 * Direct Strapi API calls with cached helpers.
 */

import { cache } from "react";
import { fetchAPI } from "./api";
import { Project, ProjectSimplified, TreeCount } from "@/types/project";

interface ProjectListResponse {
  data: Project[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function calculatePlantedCount(treeCounts: TreeCount[]): number {
  if (!treeCounts || !Array.isArray(treeCounts)) return 0;
  return treeCounts.reduce((sum, tc) => sum + (tc.total || 0), 0);
}

function transformProject(project: Project): ProjectSimplified {
  const plantedCount = calculatePlantedCount(project.tree_counts);

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
    plantedCount,
    availableCount: 0,
    species: project.species || [],
    projectUpdates: project.project_updates || [],
    deleted: project.deleted || false,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

async function fetchProjectsPage(page: number, pageSize: number): Promise<ProjectListResponse> {
  const data = await fetchAPI<ProjectListResponse>("/projects", {
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
      page,
      pageSize,
    },
  });

  return data;
}

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

export const fetchAllProjects = cache(async (): Promise<ProjectSimplified[]> => {
  let allProjects: Project[] = [];
  let currentPage = 1;
  let totalPages = 1;

  do {
    const pageData = await fetchProjectsPage(currentPage, 100);
    if (pageData.meta?.pagination) {
      totalPages = pageData.meta.pagination.pageCount;
    }

    if (Array.isArray(pageData.data)) {
      allProjects = allProjects.concat(pageData.data);
    }

    currentPage++;
  } while (currentPage <= totalPages);

  return allProjects.map(transformProject);
});

export async function fetchLandingProjects(limit: number = 6): Promise<ProjectSimplified[]> {
  const data = await fetchAPI<ProjectListResponse>("/projects", {
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

  if (!Array.isArray(data.data)) return [];
  return data.data.map(transformProject);
}

export const fetchProjectBySlug = cache(async (slug: string): Promise<ProjectSimplified | null> => {
  let currentPage = 1;
  let totalPages = 1;

  do {
    const pageData = await fetchProjectsPage(currentPage, 50);
    if (pageData.meta?.pagination) {
      totalPages = pageData.meta.pagination.pageCount;
    }

    const match = (pageData.data || []).find((p) => generateProjectSlug(p.name) === slug);
    if (match) return transformProject(match);

    currentPage++;
  } while (currentPage <= totalPages);

  return null;
});

export async function fetchProjectById(documentId: string): Promise<ProjectSimplified | null> {
  const data = await fetchAPI<{ data?: Project }>(`/projects/${documentId}`, {
    populate: {
      thumbnail: { populate: "*" },
      images: { populate: "*" },
      video_thumbnail: { populate: "*" },
      tree_counts: { populate: "*" },
      species: { populate: "*" },
      project_updates: { populate: "*" },
    },
  });

  if (!data.data || data.data.deleted) return null;
  return transformProject(data.data);
}

