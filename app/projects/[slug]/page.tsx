import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "../../../src/components/ProjectDetailPage";
import {
  fetchAllProjects,
  fetchProjectBySlug,
  generateProjectSlug,
} from "@/services/projects";
import { generateSlug as generateSpeciesSlug } from "@/services/species";
import { ProjectSimplified, ProjectUpdate } from "@/types/project";

type Params = { slug: string };

/**
 * Generate static paths at build time
 * Fetches all projects from Strapi API and generates slugs
 */
export async function generateStaticParams(): Promise<Params[]> {
  try {
    const projects = await fetchAllProjects();
    return projects.map((p: ProjectSimplified) => ({
      slug: generateProjectSlug(p.name),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - FBH Projects`,
    description:
      typeof project.description === "string"
        ? project.description.slice(0, 160)
        : `Learn about ${project.name} project`,
    openGraph: {
      title: project.name,
      description:
        typeof project.description === "string"
          ? project.description.slice(0, 160)
          : undefined,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

/**
 * Parse Strapi rich text blocks recursively
 * Handles paragraphs, headings, lists, and list items
 */
function parseRichTextBlock(block: any): string {
  if (!block) return "";

  // Extract text from children
  const getChildrenText = (children: any[]): string => {
    if (!children || !Array.isArray(children)) return "";
    return children.map((child: any) => {
      if (child.text !== undefined) return child.text;
      if (child.children) return getChildrenText(child.children);
      return "";
    }).join("");
  };

  // Handle different block types
  switch (block.type) {
    case "paragraph":
      return getChildrenText(block.children);

    case "heading":
      return `\n${getChildrenText(block.children)}\n`;

    case "list":
      // Handle list items
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map((item: any) => {
            const text = getChildrenText(item.children);
            return `• ${text}`;
          })
          .join("\n");
      }
      return "";

    case "list-item":
      return `• ${getChildrenText(block.children)}`;

    default:
      // Fallback for unknown types
      if (block.children) {
        return getChildrenText(block.children);
      }
      return "";
  }
}

/**
 * Transform API project to ProjectDetailPage format
 */
function transformToDetailData(project: ProjectSimplified) {
  // Extract description text from rich text blocks if needed
  let descriptionText = "";
  if (typeof project.description === "string") {
    descriptionText = project.description;
  } else if (Array.isArray(project.description)) {
    // Handle Strapi rich text blocks with full support for all block types
    descriptionText = project.description
      .map((block: any) => parseRichTextBlock(block))
      .filter((text: string) => text.trim() !== "")
      .join("\n\n");
  }

  // Transform species images
  const treeSpecies = project.species?.map((s: any, index: number) => ({
    id: s.documentId || `species-${index}`,
    imageUrl: s.images?.[0]?.url || "",
    imageAlt: s.common_name || `Species ${index + 1}`,
  })) || [];

  // If no species, use project images
  if (treeSpecies.length === 0 && project.images?.length > 0) {
    project.images.slice(0, 3).forEach((img, index) => {
      treeSpecies.push({
        id: `image-${index}`,
        imageUrl: img.url,
        imageAlt: `${project.name} - Image ${index + 1}`,
      });
    });
  }

  return {
    id: project.documentId,
    title: project.name,
    location: project.address,
    description: descriptionText,
    treeSpecies,
    stats: {
      treesAvailable: 0, // Will need separate API or field
      treesPlanted: project.plantedCount,
      totalTrees: project.plantedCount,
    },
    projectDescription: descriptionText,
    projectDetails: [], // Could be populated from project_updates
  };
}

/**
 * Transform projects to related projects format
 */
function transformToRelatedProjects(
  projects: ProjectSimplified[],
  currentId: string
) {
  return projects
    .filter((p) => p.documentId !== currentId)
    .slice(0, 3)
    .map((p) => ({
      id: p.documentId,
      title: p.name,
      location: p.address,
      plantedCount: p.plantedCount,
      category: p.archetype,
      imageUrl: p.thumbnail || "/images/test2.jpg",
      imageAlt: `${p.name} - ${p.archetype}`,
    }));
}

/**
 * Transform project updates to UI format
 * Groups updates by month/year
 */
function transformProjectUpdates(updates: ProjectUpdate[]) {
  if (!updates || !Array.isArray(updates)) return [];

  // Filter out deleted updates and sort by date (newest first)
  const validUpdates = updates
    .filter((u) => !u.deleted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return validUpdates.map((update) => {
    const date = new Date(update.date);
    const month = date.toLocaleString("en-US", { month: "long", year: "numeric" });

    return {
      id: update.id,
      month,
      date: update.date,
      year: date.getFullYear(),
      images: update.media?.map((m) => m.url) || [],
      text: update.remarks || "",
    };
  });
}

/**
 * Transform project species to UI format
 */
function transformProjectSpecies(species: any[]) {
  if (!species || !Array.isArray(species)) return [];

  return species
    .filter((s) => !s.deleted)
    .map((s) => ({
      id: s.documentId || s.id,
      name: s.common_name || "",
      image: s.images?.[0]?.url || "",
      slug: generateSpeciesSlug(s.common_name || ""),
    }));
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch project from Strapi API
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch all projects for related section
  const allProjects = await fetchAllProjects();

  const projectData = transformToDetailData(project);
  const relatedProjects = transformToRelatedProjects(
    allProjects,
    project.documentId
  );
  const projectUpdates = transformProjectUpdates(project.projectUpdates);
  const projectSpecies = transformProjectSpecies(project.species);

  return (
    <ProjectDetailPage
      projectData={projectData}
      relatedProjects={relatedProjects}
      projectUpdates={projectUpdates}
      projectSpecies={projectSpecies}
    />
  );
}
