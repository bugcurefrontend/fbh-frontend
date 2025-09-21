import AllSpeciesPage from "../../src/components/AllSpeciesPage";

const mockSpecies = [
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
];

const mockPagination = {
  currentPage: 1,
  totalPages: 8,
  hasNext: true,
  hasPrevious: false,
};

export default function SpeciesPage() {
  return (
    <AllSpeciesPage
      initialSpecies={mockSpecies}
      initialPagination={mockPagination}
      initialSearchQuery=""
    />
  );
}