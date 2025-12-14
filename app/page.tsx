import HeroSection from "../src/components/HeroSection";
import StatisticsSection from "../src/components/StatisticsSection";
import AboutSection from "../src/components/AboutSection";
import PartnersSection from "../src/components/PartnersSection";
import SpeciesSection from "../src/components/SpeciesSection";
import ProjectsSection from "../src/components/ProjectsSection";
import ActivitiesSection from "../src/components/ActivitiesSection";
import TestimonialsSection from "../src/components/TestimonialsSection";
import CaseStudiesSection from "../src/components/CaseStudiesSection";
import { fetchAllPartners } from "@/services/partners";
import { fetchAllCaseStudies } from "@/services/case-studies";
import { fetchAllHeroContents } from "@/services/hero-content";

export default async function Home() {
  const [partners, caseStudies, heroContents] = await Promise.all([
    fetchAllPartners(),
    fetchAllCaseStudies(),
    fetchAllHeroContents(),
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection heroContents={heroContents} />
      <StatisticsSection />
      <AboutSection />
      <PartnersSection partners={partners} />
      <SpeciesSection />
      <ProjectsSection />
      <ActivitiesSection />
      <TestimonialsSection />
      <CaseStudiesSection caseStudies={caseStudies} />
    </main>
  );
}
