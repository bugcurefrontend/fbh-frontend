import ProjectDetailPage from "../../src/components/ProjectDetailPage";

// Mock data for project detail
const mockProjectData = {
  id: "satna-npci",
  title: "Satna, NPCI",
  location: "Shivagarh, Madhya Pradesh",
  description:
    "The Satna region has suffered greatly from extensive tree felling, rampant overgrazing, and unsustainable land practices. Witnessing this ecological decline, pressure from Climate change and erratic weather impacting communities, carbon emissions from rapid urbanization...",
  heroImageUrl:
    "https://images.unsplash.com/photo-1698869628299-5d0e570142fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxmb3Jlc3QlMjBjYW5vcHklMjBhZXJpYWx8ZW58MHwwfHxncmVlbnwxNzU3NzYyMjMxfDA&ixlib=rb-4.1.0&q=85",
  heroImageAlt:
    "Dense green forest canopy aerial view for main project hero section - Griffin Wooldridge on Unsplash",
  treeSpecies: [
    {
      id: "species-1",
      imageUrl:
        "https://images.unsplash.com/flagged/photo-1552862858-f94b90110bea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHx0cmVlJTIwc2lsaG91ZXR0ZXxlbnwwfDJ8fHwxNzU3NzYyMjMxfDA&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Single tree silhouette on white background for species selection - Johannes Plenio on Unsplash",
    },
    {
      id: "species-2",
      imageUrl:
        "https://images.unsplash.com/photo-1566920983815-965635f4af1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHx0cmVlJTIwbGFuZHNjYXBlJTIwZ3JlZW58ZW58MHwyfHxncmVlbnwxNzU3NzYyMjMxfDA&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Green tree in natural landscape for species selection - Aleksandar Ristov on Unsplash",
    },
    {
      id: "species-3",
      imageUrl:
        "https://images.unsplash.com/photo-1608785074540-4b7193dd039e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxwaW5lJTIwdHJlZSUyMHNreXxlbnwwfDJ8fGJsdWV8MTc1Nzc2MjIzMnww&ixlib=rb-4.1.0&q=85",
      imageAlt:
        "Pine tree against sky for species selection - M. B. Louis on Unsplash",
    },
  ],
  stats: {
    treesAvailable: 4500,
    treesPlanted: 7500,
    totalTrees: 12000,
  },
  projectDescription:
    "The Satna region has suffered greatly from extensive tree felling, rampant overgrazing, and unsustainable land practices. Witnessing this ecological decline, pressure from climate change and erratic weather impacting communities, carbon emissions from rapid urbanization...",
  projectDetails: [
    "In 2023, the Honourable Chief Minister of Madhya Pradesh, Shri. Mohan Yadav invited FBH to afforest an initial parcel of 12 sites in Satna aggregating 650 HA. This project was kicked off in 2023 by the Dy. Chief Minister, Shri Rajendra Shukla.",
    "Reforesting these 12 sites at Satna is a 3-year project to plant progressively and green the entire 650 Ha, in collaboration with the forest departments and corporate funding.",
  ],
};

// Mock data for related projects
const mockRelatedProjects = [
  {
    id: "1",
    title: "K & S Associate",
    location: "Indore",
    plantedCount: 150,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1600196895335-5fb111df31a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    imageAlt:
      "Dense green forest with tall trees, natural lighting, reforestation project - Anthony Mucci on Unsplash",
  },
  {
    id: "2",
    title: "K & S Associate",
    location: "Indore",
    plantedCount: 200,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1568943542306-bf5807bdc38c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGZvcmVzdCUyMGV2ZXJncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    imageAlt:
      "Mountain forest landscape with evergreen trees, conservation area - Cale Benefield on Unsplash",
  },
  {
    id: "3",
    title: "K & S Associate",
    location: "Indore",
    plantedCount: 300,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1629138416134-e548f78cbc95?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxmb3Jlc3QlMjBzdW5saWdodCUyMHBhdGh8ZW58MHwwfHx8MTc1Nzc2MTE3MHww&ixlib=rb-4.1.0&q=85",
    imageAlt:
      "Sunlit forest path with golden light filtering through trees - Peter Neumann on Unsplash",
  },
];

export default function Page() {
  return (
    <ProjectDetailPage
      projectData={mockProjectData}
      relatedProjects={mockRelatedProjects}
    />
  );
}
