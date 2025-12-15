import React from "react";
import { Leaf, ThumbsUp, Trees } from "lucide-react";

export const stats = [
  {
    label: "CO2 Sequestered",
    value: "40",
    suffix: "kg",
    icon: React.createElement(Leaf, { className: "w-5 h-5 text-[#0B9D58]" }),
    accent: "#0B9D58",
  },
  {
    label: "Total Trees Planted",
    value: "4,893",
    suffix: "trees",
    icon: React.createElement(Trees, { className: "w-5 h-5 text-[#0B9D58]" }),
    accent: "#0B9D58",
  },
  {
    label: "Projects Supported",
    value: "12",
    suffix: "projects",
    icon: React.createElement(ThumbsUp, {
      className: "w-5 h-5 text-[#F59E0B]",
    }),
    accent: "#F59E0B",
  },
];

export const donations = [
  {
    id: 1,
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
    id: 2,
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTING",
    date: "Jan 6, 2024",
    accent: "#F59E0B",
    location: "Telangana, India",
    status: "DEAD",
    statusAccent: "#F04438",
  },
  {
    id: 3,
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
    id: 5,
    name: "Mango Tree",
    reference: "DB3RDP2F",
    trees: 177,
    donationFor: "GIFTING",
    date: "Jan 6, 2024",
    accent: "#F59E0B",
    location: "Telangana, India",
    status: "DEAD",
    statusAccent: "#F04438",
  },
  {
    id: 6,
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

// Mock API function to fetch tree updates for a given donation ID
export const fetchTreeUpdates = async (donationId: number) => {
  console.log(`Fetching updates for donation ID: ${donationId}`);
  // In a real app, you would make an API call here.
  // For now, we'll simulate it by returning our mock data.
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  return treeUpdates.filter((update) => update.donationId === donationId);
};
