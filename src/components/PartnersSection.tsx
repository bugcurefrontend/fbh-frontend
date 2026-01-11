"use client";
import React from "react";
import Image from "next/image";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { PartnerSimplified } from "@/types/partner";

interface PartnersSectionProps {
  partners?: PartnerSimplified[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners: apiPartners,
}) => {
  const fallbackPartners = [
    { name: "Google", logo: "/images/partners/google1.png", url: undefined },
    { name: "Accenture", logo: "/images/partners/accenture.png", url: undefined },
    { name: "Amazon", logo: "/images/partners/amazon.png", url: undefined },
    { name: "Bank of America", logo: "/images/partners/america.png", url: undefined },
    { name: "WWF", logo: "/images/partners/wwf.png", url: undefined },
    { name: "Zscaler", logo: "/images/partners/zscaler.png", url: undefined },
    { name: "FedEX", logo: "/images/partners/fedex.png", url: undefined },
    { name: "Microsoft", logo: "/images/partners/microsoft.png", url: undefined },
    { name: "Samsung", logo: "/images/partners/samsung.png", url: undefined },
    { name: "MPG", logo: "/images/partners/mp.png", url: undefined },
  ];

  const fallbackMobilePartners = [
    { name: "Samsung", logo: "/images/partners/samsung.png", url: undefined },
    { name: "Google", logo: "/images/partners/google1.png", url: undefined },
    { name: "Amazon", logo: "/images/partners/amazon.png", url: undefined },
    { name: "Microsoft", logo: "/images/partners/microsoft.png", url: undefined },
    { name: "FedEX", logo: "/images/partners/fedex.png", url: undefined },
    { name: "HubSpot", logo: "/images/partners/hubSpot.png", url: undefined },
  ];

  // Use API data if available, otherwise use fallback
  const partners =
    apiPartners && apiPartners.length > 0
      ? apiPartners.map((p) => ({
        name: p.name,
        logo: p.logo,
        url: p.companyUrl
      }))
      : fallbackPartners;

  const mobilePartners =
    apiPartners && apiPartners.length > 0
      ? apiPartners.map((p) => ({
        name: p.name,
        logo: p.logo,
        url: p.companyUrl
      }))
      : fallbackMobilePartners;

  const items = partners.map((partner) => ({
    id: partner.name,
    quote: (
      <div className="flex items-center justify-center">
        {partner.url ? (
          <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={300}
              height={150}
              className="object-contain max-w-[120px] max-h-[50px] sm:max-h-[80px] sm:max-w-[180px] w-fit h-fit"
            />
          </a>
        ) : (
          <Image
            src={partner.logo}
            alt={partner.name}
            width={300}
            height={150}
            className="object-contain max-w-[120px] max-h-[50px] sm:max-h-[80px] sm:max-w-[180px] w-fit h-fit"
          />
        )}
      </div>
    ),
    name: partner.name,
    title: "",
  }));

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="bg-white rounded-[16px] border border-gray-200 max-sm:p-[30px] sm:py-4 text-center max-sm:flex flex-col gap-8 sm:space-y-14 sm:h-[232px]">
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:text-center md:align-middle md:text-[#090C0F]">
          Our Supporting Partners
        </h2>

        {/* Mobile Layout - 3 columns grid */}
        <div className="grid grid-cols-3 sm:hidden gap-x-2 gap-y-8">
          {mobilePartners.map((partner, index) => {
            const remainingItems = mobilePartners.length % 3;
            const isInLastRow = index >= mobilePartners.length - remainingItems;

            // If 1 item in last row, center it (col-span-3)
            // If 2 items in last row, center them (col-start-1 for 7th item, col-start-2 for 8th item)
            const shouldCenterSingle = remainingItems === 1 && isInLastRow;
            const shouldCenterPair = remainingItems === 2 && isInLastRow;
            const isFirstOfPair = shouldCenterPair && index === mobilePartners.length - 2;

            return (
              <div
                key={partner.name}
                className={`flex items-center justify-center ${shouldCenterSingle
                  ? "col-span-3"
                  : shouldCenterPair && isFirstOfPair
                    ? "col-start-2"
                    : ""
                  }`}
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={70}
                      height={24}
                      className="object-contain max-w-[80px] max-h-[30px]"
                    />
                  </a>
                ) : (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={70}
                    height={24}
                    className="object-contain max-w-[80px] max-h-[30px]"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Infinite Scroll */}
        <div className="hidden sm:block">
          <InfiniteMovingCards
            items={items}
            direction="left"
            speed="normal"
            pauseOnHover={true}
            className="bg-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
