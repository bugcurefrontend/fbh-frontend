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
    <section className="bg-white rounded-xl border border-gray-200  max-sm:py-6 max-sm:pb-10 sm:py-4 text-center space-y-10 sm:space-y-14 sm:h-[232px]">
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
