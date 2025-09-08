import { Box } from "@mui/material";
import Header from "../src/components/Header";
import HeroSection from "../src/components/HeroSection";
import StatisticsSection from "../src/components/StatisticsSection";
import AboutSection from "../src/components/AboutSection";
import PartnersSection from "../src/components/PartnersSection";
import SpeciesSection from "../src/components/SpeciesSection";
import ProjectsSection from "../src/components/ProjectsSection";
import ActivitiesSection from "../src/components/ActivitiesSection";
import TestimonialsSection from "../src/components/TestimonialsSection";
import CaseStudiesSection from "../src/components/CaseStudiesSection";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <HeroSection />
      <StatisticsSection />
      <AboutSection />
      <PartnersSection />
      <SpeciesSection />
      <ProjectsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <Footer />
    </Box>
  );
}
