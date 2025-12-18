import JourneyTimeline from "@/components/about-us/OurJourny";
import OurOrigin from "@/components/about-us/OurOrigin";
import VisionMission from "@/components/about-us/VisionMission";
import StatisticsSection from "@/components/StatisticsSection";
import { fetchAllMetrics } from "@/services/metrics";

export default async function page() {
  const [metrics] = await Promise.all([fetchAllMetrics()]);

  return (
    <main>
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: ` url('/images/about-us.png')`,
          backgroundSize: "contain",
          backgroundPosition: "top",
        }}
      >
        <h1 className="font-[Playfair_Display] text-2xl md:text-[48px] text-white leading-12 font-semibold">
          About Us
        </h1>
      </section>
      <StatisticsSection metrics={metrics} />
      <section className="max-w-7xl mx-auto md:space-y-16 space-y-8">
        <OurOrigin />
        <VisionMission />
        <JourneyTimeline />
      </section>
    </main>
  );
}
