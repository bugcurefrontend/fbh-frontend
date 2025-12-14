"use client";
import React from "react";
import Image from "next/image";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { PartnerSimplified } from "@/types/partner";

interface PartnersSectionProps {
  partners?: PartnerSimplified[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners: apiPartners }) => {
  const fallbackPartners = [
    { name: "Google", logo: "/images/partners/google1.png" },
    { name: "Accenture", logo: "/images/partners/accenture.png" },
    { name: "Amazon", logo: "/images/partners/amazon.png" },
    { name: "Bank of America", logo: "/images/partners/america.png" },
    { name: "WWF", logo: "/images/partners/wwf.png" },
    { name: "Zscaler", logo: "/images/partners/zscaler.png" },
    { name: "FedEX", logo: "/images/partners/fedex.png" },
    { name: "Microsoft", logo: "/images/partners/microsoft.png" },
    { name: "Samsung", logo: "/images/partners/samsung.png" },
    { name: "MPG", logo: "/images/partners/mp.png" },
  ];

  const fallbackMobilePartners = [
    { name: "Samsung", logo: "/images/partners/samsung.png" },
    { name: "Google", logo: "/images/partners/google1.png" },
    { name: "Amazon", logo: "/images/partners/amazon.png" },
    { name: "Microsoft", logo: "/images/partners/microsoft.png" },
    { name: "FedEX", logo: "/images/partners/fedex.png" },
    { name: "HubSpot", logo: "/images/partners/hubSpot.png" },
  ];

  // Use API data if available, otherwise use fallback
  const partners = apiPartners && apiPartners.length > 0
    ? apiPartners.map((p) => ({ name: p.name, logo: p.logo }))
    : fallbackPartners;

  const mobilePartners = apiPartners && apiPartners.length > 0
    ? apiPartners.slice(0, 6).map((p) => ({ name: p.name, logo: p.logo }))
    : fallbackMobilePartners;

  const items = partners.map((partner) => ({
    id: partner.name,
    quote: (
      <div className="flex items-center justify-center">
        <Image
          src={partner.logo}
          alt={partner.name}
          width={160}
          height={100}
          className="object-contain max-w-[80px] max-h-[30px] sm:max-h-[50px] sm:max-w-[120px] w-fit h-fit"
        />
      </div>
    ),
    name: partner.name,
    title: "",
  }));

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="bg-white rounded-xl border border-gray-200 max-sm:p-[30px] sm:py-4 text-center space-y-6 sm:space-y-14 h-[232px]">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:text-center md:align-middle md:text-[#090C0F]">
          Our Supporting Partners
        </h2>

        {/* Mobile 2 Layout */}
        <div className="grid grid-cols-3 sm:hidden space-y-2.5 gap-x-2">
          {mobilePartners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center my-4"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={70}
                height={24}
                className="object-contain max-w-[70px] max-h-[24px]"
              />
            </div>
          ))}
        </div>

        {/* Desktop Infinite Scroll */}
        <div className="hidden sm:block">
          <InfiniteMovingCards
            items={items}
            direction="left"
            speed="fast"
            pauseOnHover={true}
            className="bg-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
