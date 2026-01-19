"use client";

import Gallery from "@/components/Gallery";
import TeamSection from "@/components/OurTeam";
import { TeamMemberSimplified } from "@/types/team";

type Props = {
  headerImageUrl?: string | null;
  galleryImages: string[] | null;
  teams: TeamMemberSimplified[];
};

const TeamPageClient = ({ headerImageUrl, galleryImages, teams }: Props) => {

  return (
    <main className="md:space-y-16 space-y-8">
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${headerImageUrl ?? "/images/meet-team.png"
            }')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <h1 className="font-[Playfair_Display] text-[22px] md:text-[48px] text-white leading-12 font-semibold">
          Our Team
        </h1>
      </section>
      <section className="max-w-7xl mx-auto md:px-8 px-4 md:space-y-16 space-y-8">
        <TeamSection teams={teams} />

        <div className="space-y-6">
          <h1 className="text-center font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
            Gallery
          </h1>
          <Gallery
            itemClass="basis-1/6"
            className="lg:h-[573px]"
            images={galleryImages ?? undefined}
          />
        </div>
      </section>
    </main>
  );
};

export default TeamPageClient;
