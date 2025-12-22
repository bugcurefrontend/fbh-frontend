"use client";

import { useState } from "react";
import Gallery from "@/components/Gallery";
import TeamSection from "@/components/OurTeam";

const T = ({}) => {
  return (
    <main className="md:space-y-16 space-y-8">
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: ` url('/images/meet-team.png')`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <h1 className="font-[Playfair_Display] text-2xl md:text-[48px] text-white leading-12 font-semibold">
          Our Team
        </h1>
      </section>
      <section className="max-w-7xl mx-auto md:px-8 px-4 md:space-y-16 space-y-8">
        <TeamSection />

        <div className="space-y-6">
          <h1 className="text-center font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
            Gallery
          </h1>
          <Gallery className="lg:h-[573px]" />
        </div>
      </section>
    </main>
  );
};

export default T;
