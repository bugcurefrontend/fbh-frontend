import { Metadata } from "next";
import AllProjectsPage from "../../src/components/AllProjectsPage";
import { fetchAllProjects } from "@/services/projects";

export const metadata: Metadata = {
  title: "All Projects - FBH",
  description:
    "Explore all our reforestation and conservation projects creating healthier ecosystems.",
};

export default async function ProjectsPage() {
  const apiData = await fetchAllProjects();

  // Transform API data to match UI structure
  const projects = apiData.map((p) => ({
    id: p.documentId,
    title: p.name,
    location: p.address,
    plantedCount: p.plantedCount,
    category: p.archetype,
    imageUrl: p.thumbnail || "/images/test2.jpg",
    imageAlt: `${p.name} - ${p.archetype}`,
  }));

  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(projects.length / 9),
    hasNext: projects.length > 9,
    hasPrevious: false,
  };

  return (
    <AllProjectsPage
      initialProjects={projects}
      initialPagination={pagination}
      initialSearchQuery=""
    />
  );
}
