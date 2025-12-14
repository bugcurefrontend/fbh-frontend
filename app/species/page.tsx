import { Metadata } from "next";
import AllSpeciesPage from "../../src/components/AllSpeciesPage";
import { fetchAllSpecies } from "@/services/species";

export const metadata: Metadata = {
  title: "All Species - FBH",
  description: "Explore our collection of tree species, each with unique environmental, cultural, and medicinal value.",
};

export default async function SpeciesPage() {
  // Fetch species data at build time from Strapi API
  const species = await fetchAllSpecies();

  return <AllSpeciesPage initialSpecies={species} />;
}
