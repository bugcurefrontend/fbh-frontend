import { notFound } from "next/navigation";
import { Metadata } from "next";
import Gallery from "@/components/Gallery";
import PartnersSection from "@/components/PartnersSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin } from "lucide-react";
import { fetchAllPartners } from "@/services/partners";
import {
  fetchCaseStudyBySlug,
  fetchCaseStudySlugs,
} from "@/services/case-studies";
import ShareButton from "./ShareButton";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all case studies
export async function generateStaticParams() {
  const slugs = await fetchCaseStudySlugs();
  return slugs;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.title} - Case Study | Forests by Heartfulness`,
    description: caseStudy.description?.substring(0, 160) || "",
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [caseStudy, partners] = await Promise.all([
    fetchCaseStudyBySlug(slug),
    fetchAllPartners(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  // Use first media image as hero background, fallback to default
  const heroImage =
    caseStudy.image ||
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85";

  return (
    <main className="min-h-screen bg-white space-y-8">
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl w-full mx-auto px-4 md:px-12 md:space-y-12 space-y-8 text-white relative">
          <Breadcrumb>
            <BreadcrumbList className="text-white font-semibold md:text-base text-sm leading-[18px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Homepage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/case-study">Case Study</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/case-studies/${slug}`}>
                  {caseStudy.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-2">
            <h1 className="font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
              {caseStudy.title}
            </h1>
            <div className="flex items-center gap-1 md:text-lg text-[10px] md:font-bold font-semibold leading-4 md:leading-[26px]">
              <MapPin className="w-4 h-4 md:w-6 md:h-6" />
              <span className="md:text-xl md:leading-[30px] text-base md:font-bold">
                {caseStudy.address}
              </span>
            </div>
          </div>
        </div>
        <ShareButton className="md:bottom-17 bottom-13 right-4 md:right-43" />
      </section>

      <div className="max-w-7xl mx-auto md:space-y-12 space-y-8">
        <div className="md:space-y-6 space-y-4 md:px-8 px-4">
          <h1 className="text-center font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
            Overview
          </h1>
          <p className="max-md:hidden text-[#454950] max-md:text-sm">
            {caseStudy.description}
          </p>
          <p className="md:hidden text-[#454950] text-sm">
            {caseStudy.description}
          </p>
        </div>
        <PartnersSection partners={partners} />
        <div className="space-y-6 md:px-8 px-4">
          <h1 className="text-center font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
            Gallery
          </h1>
          <Gallery className="lg:h-[573px]" />
        </div>
      </div>
    </main>
  );
}
