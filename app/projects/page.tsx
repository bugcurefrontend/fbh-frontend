import AllProjectsPage from "../../src/components/AllProjectsPage";

const mockProjects = [
  {
    id: "1",
    title: "K & S Associate",
    location: "Indore",
    plantedCount: 150,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=forest",
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
  {
    id: "4",
    title: "Forests By Heartfulness",
    location: "Mumbai",
    plantedCount: 500,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1566230724891-75ea7213175a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtaXN0JTIwcGluZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    imageAlt:
      "Misty forest with tall pine trees, atmospheric nature scene - Sébastien Goldberg on Unsplash",
  },
  {
    id: "5",
    title: "Forests By Heartfulness",
    location: "Delhi",
    plantedCount: 750,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1700686257511-98b32cf377da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYW5vcHklMjBncmVlbnxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85",
    imageAlt:
      "Lush green forest canopy view, biodiversity conservation - Wolfgang Hasselmann on Unsplash",
  },
  {
    id: "6",
    title: "Forests By Heartfulness",
    location: "Bangalore",
    plantedCount: 400,
    category: "Reforestation",
    imageUrl:
      "https://images.unsplash.com/photo-1657027574524-2b95d6301ab9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxhbmNpZW50JTIwZm9yZXN0JTIwb2xkJTIwdHJlZXN8ZW58MHwwfHxncmVlbnwxNzU3NzYxMTcwfDA&ixlib=rb-4.1.0&q=85",
    imageAlt:
      "Ancient forest with old growth trees, natural habitat - Yuriy Mayatnikov on Unsplash",
  },
];

const mockPagination = {
  currentPage: 1,
  totalPages: 10,
  hasNext: true,
  hasPrevious: false,
};

export default function ProjectsPage() {
  return (
    <AllProjectsPage
      initialProjects={mockProjects}
      initialPagination={mockPagination}
      initialSearchQuery=""
    />
  );
}
