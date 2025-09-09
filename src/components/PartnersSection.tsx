"use client";
import React from "react";
import Image from "next/image";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const PartnersSection: React.FC = () => {
  const partners = [
    { name: "first", logo: "/images/partners/first.png" },
    { name: "Accenture", logo: "/images/partners/accenture.png" },
    { name: "Google", logo: "/images/partners/google.png" },
    { name: "Bank of America", logo: "/images/partners/america.png" },
    { name: "WWF", logo: "/images/partners/wwf.png" },
    { name: "Zscaler", logo: "/images/partners/zscaler.png" },
  ];

  // Map partners to the expected format
  const items = partners.map((partner) => ({
    id: partner.name,
    quote: (
      <div className="flex items-center justify-center w-[160px] md:h-[100px]">
        <Image
          src={partner.logo}
          alt={partner.name}
          width={160}
          height={100}
          className="object-contain max-h-[100px] max-w-[160px]"
        />
      </div>
    ),
    name: partner.name,
    title: "",
  }));

  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-[0_12px_24px_rgba(133,133,133,0.12)] py-4 sm:py-8 text-center space-y-5">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black">
        Our Supporting Partners
      </h2>

      <InfiniteMovingCards
        items={items}
        direction="left"
        speed="fast"
        pauseOnHover={true}
        className="bg-transparent"
      />
    </section>
  );
};

export default PartnersSection;
