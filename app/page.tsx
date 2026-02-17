import HeroSection from "@/components/HeroSection";
import StatisticsSection from "@/components/StatisticsSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import SpeciesSection from "@/components/SpeciesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
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
import { fetchHomeIntroSection } from "@/services/home-intro-section";

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
    homeIntro,
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
    fetchHomeIntroSection(),
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection heroContents={heroContents} />
      <StatisticsSection metrics={metrics} />
      <AboutSection content={homeIntro} />
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
