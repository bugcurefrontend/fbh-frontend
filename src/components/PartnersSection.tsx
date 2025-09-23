"use client";
import React from "react";
import Image from "next/image";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const PartnersSection: React.FC = () => {
  const partners = [
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
    <section className="mx-4 md:mx-8 bg-white rounded-xl border border-gray-200  max-sm:py-6 max-sm:pb-10 sm:py-4 text-center space-y-10 sm:space-y-14 sm:h-[232px] mt-8 md:mt-16">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:text-center md:align-middle md:text-[#090C0F]">
        Our Supporting Partners
      </h2>

      {/* Mobile 2 Row Layout */}
      <div className="sm:hidden space-y-4">
        {/* First Row - Moving Right */}
        <div className="overflow-hidden pb-10">
          <div className="flex animate-scroll-right space-x-8">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={100}
                  className="object-contain max-w-[80px] max-h-[30px] w-fit h-fit"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Moving Left */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll-left space-x-8">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={100}
                  className="object-contain max-w-[80px] max-h-[30px] w-fit h-fit"
                />
              </div>
            ))}
          </div>
        </div>
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
    </section>
  );
};

export default PartnersSection;
