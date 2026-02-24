import { Metadata } from "next";
import AllSpeciesPage from "@/components/AllSpeciesPage";
import { fetchAllSpecies } from "@/services/species";
import { fetchGlobal } from "@/services/global";

export const metadata: Metadata = {
  title: "All Species - FBH",
  description: "Explore our collection of tree species, each with unique environmental, cultural, and medicinal value.",
};

export default async function SpeciesPage() {
  // Fetch species data at build time from Strapi API
  const [species, global] = await Promise.all([fetchAllSpecies(), fetchGlobal()]);

  const headerImageUrl = global?.species_list_headerimage?.url ?? null;

  return <AllSpeciesPage initialSpecies={species} headerImageUrl={headerImageUrl} />;
}
