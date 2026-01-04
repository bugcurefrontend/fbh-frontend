import AboutHeartfulness from "@/components/about-us/AboutHeartfulness";
import FAQs from "@/components/about-us/FAQs";
import KanhaShantiVanam from "@/components/about-us/KanhaShantiVanam";
import JourneyTimeline from "@/components/about-us/OurJourny";
import OurOrigin from "@/components/about-us/OurOrigin";
import VisionMission from "@/components/about-us/VisionMission";
import StatisticsSection from "@/components/StatisticsSection";
import { fetchAllMetrics } from "@/services/metrics";
import { fetchAboutContent } from "@/services/about-content";
import { fetchGlobal } from "@/services/global";

export default async function page() {
  const [metrics, aboutContent, global] = await Promise.all([fetchAllMetrics(), fetchAboutContent(), fetchGlobal()]);
  const aboutStats = aboutContent ? {
    trees: aboutContent.total_trees_planted || undefined,
    plantingSites: aboutContent.total_planting_sites || undefined,
    volunteers: aboutContent.total_volunteers_engaged || undefined,
    partners: aboutContent.total_partner_organisations || undefined,
  } : undefined;

  const headerImageUrl = global?.about_us_hearderimage?.url ?? null;

  return (
    <main>
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `url('${headerImageUrl ?? "/images/about-us.png"}')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <h1 className="font-[Playfair_Display] text-[22px] md:text-[48px] text-white leading-12 font-semibold">
          About Us
        </h1>
      </section>
      <StatisticsSection metrics={metrics} aboutStats={aboutStats} />
      <section className="max-w-7xl mx-auto md:space-y-16 space-y-8">
        <OurOrigin imageOne={aboutContent?.our_origin_one} imageTwo={aboutContent?.our_origin_two} />
        <VisionMission />
        <JourneyTimeline journeyImages={[
          aboutContent?.our_journey_one ?? null,
          aboutContent?.our_journey_two ?? null,
          aboutContent?.our_journey_three ?? null,
          aboutContent?.our_journey_four ?? null,
          aboutContent?.our_journey_five ?? null,
          aboutContent?.our_journey_six ?? null,
          aboutContent?.our_journey_seven ?? null,
        ]} />
        <AboutHeartfulness stats={{
          total_countries: aboutContent?.total_countries,
          total_practitioners: aboutContent?.total_practitioners,
          total_trainers: aboutContent?.total_trainers,
          total_meditation_centres: aboutContent?.total_meditation_centres,
        }} />
      </section>
      <KanhaShantiVanam />
      <FAQs />
    </main>
  );
}
