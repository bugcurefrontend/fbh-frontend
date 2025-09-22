import SpeciesDetailPage from "../../src/components/SpeciesDetailPage";

// Mock data for species detail
const mockSpeciesData = {
  id: "neem-azadirachta",
  name: "Neem",
  scientificName: "Azadirachta",
  description:
    "The Neem tree (Azadirachta indica) has been revered in India for centuries as the “village pharmacy.” It is known for its exceptional medicinal properties, ability to purify air, and its role in cultural traditions. Beyond health, Neem supports soil fertility, provides shade, and sustains biodiversity, making it a vital part of ecosystems and communities alike.",
  heroImageUrl: "/images/species-1.png",
  heroImageAlt:
    "Neem tree (Azadirachta indica) in natural landscape setting with clear blue sky",
  treeSpecies: [
    {
      id: "variant-1",
      imageUrl: "/images/neem-tree.jpg",
      imageAlt: "Neem tree small variant",
    },
    {
      id: "variant-2",
      imageUrl: "/images/banyan-tree.avif",
      imageAlt: "Neem tree landscape view",
    },
    {
      id: "variant-3",
      imageUrl: "/images/mango-tree.webp",
      imageAlt: "Neem tree in rural farmland",
    },
  ],
  characteristics: {
    lifespan: "15+ yrs",
    oxygenReleased: "330+",
    mdHeight: "Up to 20m",
    height: "20m",
  },
  benefits: [
    "Natural pesticide properties help protect crops and reduce chemical usage",
    "Medicinal properties provide natural healthcare solutions for communities",
    "Fast-growing nature makes it ideal for quick environmental restoration",
    "Drought-resistant qualities make it suitable for arid and semi-arid regions",
  ],
  growthInfo: [
    "Grows well in tropical and subtropical climates",
    "Requires minimal water once established, making it drought-tolerant",
    "Prefers well-drained soil but can adapt to various soil types",
    "Can be grown from seeds or saplings with high survival rates",
  ],
  environmentalImpact: [
    "Releases significant amounts of oxygen, improving air quality",
    "Provides habitat and food for various bird species and insects",
    "Helps prevent soil erosion with its extensive root system",
    "Acts as a natural carbon sink, helping mitigate climate change",
  ],
};

export default function SpeciesPage() {
  return <SpeciesDetailPage speciesData={mockSpeciesData} />;
}
