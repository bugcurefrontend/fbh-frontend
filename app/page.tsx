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
import { fetchAllTestimonials } from "@/services/testimonials";
import { fetchAllMetrics } from "@/services/metrics";
import { fetchLandingProjects } from "@/services/projects";
import { fetchPopularSpecies } from "@/services/species";
import { fetchAllArticles } from "@/services/articles";
import PlantForCause from "@/components/PlantForCause";
import { fetchAllAttributes } from "@/services/attributes";

export default async function Home() {
  const [
    partners,
    caseStudies,
    heroContents,
    testimonials,
    metrics,
    projects,
    species,
    articles,
    attributes,
  ] = await Promise.all([
    fetchAllPartners(),
    fetchAllCaseStudies(),
    fetchAllHeroContents(),
    fetchAllTestimonials(),
    fetchAllMetrics(),
    fetchLandingProjects(6),
    fetchPopularSpecies(),
    fetchAllArticles(),
    fetchAllAttributes(),
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection heroContents={heroContents} />
      <StatisticsSection metrics={metrics} />
      <AboutSection />
      <PartnersSection partners={partners} />
      <SpeciesSection species={species} />
      <ProjectsSection projects={projects} />
      <PlantForCause attributes={attributes} />
      <ActivitiesSection activities={articles} />
      <TestimonialsSection testimonials={testimonials} />
      <CaseStudiesSection caseStudies={caseStudies} />
    </main>
  );
}
