import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/ProjectDetailPage";
import { PageLoader } from "@/components/ui/page-loader";
import { fetchAllProjects, fetchProjectBySlug, generateProjectSlug } from "@/services/projects";
import { fetchProjectMetrics, ProjectMetrics } from "@/services/allocations";
import { generateSlug as generateSpeciesSlug } from "@/services/species";
import { fetchAllPlantRates } from "@/services/plant-rates";
import { ProjectSimplified, ProjectUpdate, SpeciesRef, StrapiRichTextBlock, StrapiRichTextChild } from "@/types/project";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await fetchAllProjects();
  return projects.map((p: ProjectSimplified) => ({
    slug: generateProjectSlug(p.name),
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const descriptionText =
    project.description
      .flatMap((block) => block.children ?? [])
      .map((child) => child.text ?? "")
      .join(" ")
      .trim()
      .slice(0, 160) || `Learn about ${project.name} project`;

  return {
    title: `${project.name} - FBH Projects`,
    description: descriptionText,
    openGraph: {
      title: project.name,
      description: descriptionText || undefined,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

type RichNode = StrapiRichTextBlock | StrapiRichTextChild;

function getChildrenText(children: StrapiRichTextChild[] | undefined): string {
  if (!children || !Array.isArray(children)) return "";
  return children
    .map((child) => {
      if (child.text !== undefined) return child.text;
      if (child.children) return getChildrenText(child.children);
      return "";
    })
    .join("");
}

function parseRichTextBlock(block: RichNode | null | undefined): string {
  if (!block) return "";

  switch (block.type) {
    case "paragraph":
      return getChildrenText(block.children);
    case "heading":
      return `\n${getChildrenText(block.children)}\n`;
    case "list":
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map((item) => `- ${getChildrenText(item.children)}`)
          .join("\n");
      }
      return "";
    case "list-item":
      return `- ${getChildrenText(block.children)}`;
    default:
      return getChildrenText(block.children);
  }
}

function getSpeciesImage(species: SpeciesRef): string {
  const candidate = (species as SpeciesRef & { images?: { url?: string }[] }).images;
  if (!Array.isArray(candidate)) return "";
  return candidate[0]?.url || "";
}

function transformToDetailData(project: ProjectSimplified, metrics: ProjectMetrics | null = null) {
  let descriptionText = "";
  if (typeof project.description === "string") {
    descriptionText = project.description;
  } else if (Array.isArray(project.description)) {
    descriptionText = project.description
      .map((block) => parseRichTextBlock(block))
      .filter((text) => text.trim() !== "")
      .join("\n\n");
  }

  const treeSpecies =
    project.species?.map((s: SpeciesRef, index: number) => ({
      id: s.documentId || `species-${index}`,
      imageUrl: getSpeciesImage(s),
      imageAlt: s.common_name || `Species ${index + 1}`,
    })) || [];

  if (treeSpecies.length === 0 && project.images?.length > 0) {
    project.images.slice(0, 3).forEach((img, index) => {
      treeSpecies.push({
        id: `image-${index}`,
        imageUrl: img.url,
        imageAlt: `${project.name} - Image ${index + 1}`,
      });
    });
  }

  const stats =
    metrics && metrics.success
      ? {
        treesAvailable: metrics.available_trees || 0,
        treesPlanted: (metrics.total_trees || 0) - (metrics.available_trees || 0),
        totalTrees: metrics.total_trees || 0,
      }
      : {
        treesAvailable: 0,
        treesPlanted: project.plantedCount,
        totalTrees: project.plantedCount,
      };

  return {
    id: project.id,
    title: project.name,
    location: project.address,
    description: descriptionText,
    treeSpecies,
    stats,
    projectDescription: descriptionText,
    projectDetails: [],
    mapCode: project.mapCode,
    videoThumbnail: project.videoThumbnail,
    videoUrl: project.videoUrl,
  };
}

function transformToRelatedProjects(projects: ProjectSimplified[], currentId: string) {
  return projects
    .filter((p) => p.documentId !== currentId)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: p.name,
      location: p.address,
      plantedCount: p.plantedCount,
      category: p.archetype,
      imageUrl: p.thumbnail || "/images/test2.jpg",
      imageAlt: `${p.name} - ${p.archetype}`,
      availableCount: p.availableCount,
    }));
}

function transformProjectUpdates(updates: ProjectUpdate[]) {
  if (!updates || !Array.isArray(updates)) return [];

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

function transformProjectSpecies(species: SpeciesRef[]) {
  if (!species || !Array.isArray(species)) return [];

  return species
    .filter((s) => !(s as SpeciesRef & { deleted?: boolean }).deleted)
    .map((s) => ({
      id: s.documentId || String(s.id),
      name: s.common_name || "",
      image: getSpeciesImage(s),
      slug: generateSpeciesSlug(s.common_name || ""),
    }));
}

export default async function ProjectSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [project, allProjects, plantRates] = await Promise.all([
    fetchProjectBySlug(slug),
    fetchAllProjects(),
    fetchAllPlantRates(),
  ]);

  if (!project) notFound();

  const metrics = await fetchProjectMetrics(project.id);
  const projectData = transformToDetailData(project, metrics);
  const relatedProjects = transformToRelatedProjects(allProjects, project.documentId);
  const projectUpdates = transformProjectUpdates(project.projectUpdates);
  const projectSpecies = transformProjectSpecies(project.species);

  return (
    <Suspense fallback={<PageLoader message="Loading project details..." fullScreen={false} />}>
      <ProjectDetailPage
        projectData={projectData}
        relatedProjects={relatedProjects}
        projectUpdates={projectUpdates}
        projectSpecies={projectSpecies}
        plantRates={plantRates}
      />
    </Suspense>
  );
}
