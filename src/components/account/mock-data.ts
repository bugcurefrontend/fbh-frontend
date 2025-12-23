import React from "react";
import { Leaf, ThumbsUp, Trees } from "lucide-react";

export const stats = [
  {
    label: "CO2 Sequestered",
    value: "40",
    suffix: "kg",
    icon: React.createElement(Leaf, { className: "w-5 h-5 text-[#0D824B]" }),
    accent: "#0D824B",
  },
  {
    label: "Total Trees Planted",
    value: "4,893",
    suffix: "trees",
    icon: React.createElement(Trees, { className: "w-5 h-5 text-[#12B569]" }),
    accent: "#12B569",
  },
  {
    label: "Projects Supported",
    value: "12",
    suffix: "projects",
    icon: React.createElement(ThumbsUp, {
      className: "w-5 h-5 text-[#F78F08]",
    }),
    accent: "#F78F08",
  },
];

export const donations = [
  {
    id: 1,
    geoTagged: "true",
    logoSrc: "/images/treelogo.png",
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0D824B",
    location: "Telangana, India",
    status: "ALIVE",
    statusAccent: "#0D824B",
  },
  {
    id: 2,
    geoTagged: "false",
    logoSrc: "/images/specieslogo.png",
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTED",
    date: "Jan 6, 2024",
    accent: "#F78F08",
    location: "Telangana, India",
    status: "DEAD",
    statusAccent: "#F04438",
  },
  {
    id: 3,
    geoTagged: "false",
    logoSrc: "/images/campainlogo.png",
    name: "Ek Ped Maa ke Naam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
    location: "Telangana, India",
    status: "ALIVE",
    statusAccent: "#0FA958",
  },
  {
    id: 4,
    geoTagged: "true",
    logoSrc: "/images/treelogo.png",
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "RECEIVED",
    date: "Jan 6, 2024",
    accent: "#641971",
    location: "Telangana, India",
    status: "ALIVE",
    statusAccent: "#F4E9F6",
  },
  {
    id: 5,
    geoTagged: "true",
    logoSrc: "/images/specieslogo.png",
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTED",
    date: "Jan 6, 2024",
    accent: "#F78F08",
    location: "Telangana, India",
    status: "DEAD",
    statusAccent: "#F04438",
  },
  {
    id: 6,
    geoTagged: "false",
    logoSrc: "/images/treelogo.png",
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
    location: "Telangana, India",
    status: "ALIVE",
    statusAccent: "#0FA958",
  },
  {
    id: 7,
    geoTagged: "true",
    logoSrc: "/images/treelogo.png",
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "RECEIVED",
    date: "Jan 6, 2024",
    accent: "#641971",
    location: "Telangana, India",
    status: "ALIVE",
    statusAccent: "#F4E9F6",
  },
  {
    id: 8,
    geoTagged: "true",
    logoSrc: "/images/specieslogo.png",
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTED",
    date: "Jan 6, 2024",
    accent: "#F78F08",
    location: "Telangana, India",
    status: "DEAD",
    statusAccent: "#F04438",
  },
  {
    id: 9,
    geoTagged: "false",
    logoSrc: "/images/treelogo.png",
    name: "Kanha Shanti Vanam",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "SELF",
    date: "Jan 6, 2024",
    accent: "#0FA958",
    location: "Telangana, India",
    status: "ALIVE",
    statusAccent: "#0FA958",
  },
];

export const treeUpdates = [
  {
    id: 1,
    donationId: 1,
    year: 2024,
    month: "January",
    text: "The sapling has been successfully planted and is receiving adequate water and sunlight. The initial growth is promising.",
    images: ["/images/gallery/1.png", "/images/gallery/2.png"],
  },
  {
    id: 2,
    donationId: 1,
    year: 2024,
    month: "February",
    text: "We've noticed new leaves sprouting. The tree is adapting well to its new environment. Regular monitoring is in place.",
    images: ["/images/gallery/3.png", "/images/gallery/2.png"],
  },
];

export interface Data {
  treeCode: string;
  projectName: string;
  species: string;
}

export const tableData = [
  {
    treeCode: "KSVM-2024",
    projectName: "Kanha Shanti Vanam",
    species: "Mango",
  },
  {
    treeCode: "KSVM-2024",
    projectName: "Kanha Shanti Vanam",
    species: "Neem",
  },
  {
    treeCode: "KSVM-2024",
    projectName: "Kanha Shanti Vanam",
    species: "Peepal",
  },
  {
    treeCode: "APRF-2024",
    projectName: "Andhra Pradesh Reforestation",
    species: "Banyan",
  },
  {
    treeCode: "APRF-2024",
    projectName: "Andhra Pradesh Reforestation",
    species: "Teak",
  },
  {
    treeCode: "MHRF-2024",
    projectName: "Maharashtra Green Drive",
    species: "Jamun",
  },
  {
    treeCode: "MHRF-2024",
    projectName: "Maharashtra Green Drive",
    species: "Amla",
  },
  {
    treeCode: "MHRF-2024",
    projectName: "Maharashtra Green Drive",
    species: "Bamboo",
  },
  {
    treeCode: "TNFR-2024",
    projectName: "Tamil Nadu Forest Revival",
    species: "Sandalwood",
  },
  {
    treeCode: "TNFR-2024",
    projectName: "Tamil Nadu Forest Revival",
    species: "Neem",
  },
  {
    treeCode: "RJGP-2024",
    projectName: "Rajasthan Green Plantation",
    species: "Khejri",
  },
  {
    treeCode: "RJGP-2024",
    projectName: "Rajasthan Green Plantation",
    species: "Babool",
  },
  {
    treeCode: "KLRF-2024",
    projectName: "Kerala Rainforest Restoration",
    species: "Jackfruit",
  },
  {
    treeCode: "KLRF-2024",
    projectName: "Kerala Rainforest Restoration",
    species: "Coconut",
  },
  {
    treeCode: "ODGP-2024",
    projectName: "Odisha Green Initiative",
    species: "Sal",
  },
];

// Mock API function to fetch tree updates for a given donation ID
export const fetchTreeUpdates = async (donationId: number) => {
  console.log(`Fetching updates for donation ID: ${donationId}`);
  // In a real app, you would make an API call here.
  // For now, we'll simulate it by returning our mock data.
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return treeUpdates.filter((update) => update.donationId === donationId);
};
