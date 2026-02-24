import React from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import Link from "next/link";
import type { HomeIntroSection } from "@/types/home-intro-section";

interface AboutSectionProps {
  content: HomeIntroSection | null;
}

const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const title = content?.title || "What is Forests By Heartfulness?";
  const description =
    content?.description ||
    "Forests By Heartfulness is rejuvenating Earth's native, endangered, and endemic species through green action, cutting-edge research, ecological empathy and a reconnection between humans and nature.";
  const buttonLabel = content?.button_label || "Know More";
  const buttonUrl = content?.button_url || "/about-us";
  const image = content?.image;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 flex md:flex-row flex-col md:gap-8 gap-3 items-center mb-8 md:mb-16">
      <div className="sm:rounded-[16px] rounded-[9.34px] overflow-hidden w-full md:w-[46%] xl:w-[588px]">
        {image && image.url ? (
          image.width && image.height ? (
            <Image
              src={image.url}
              alt={title}
              width={image.width}
              height={image.height}
              className="object-cover w-full h-auto xl:min-h-[404px]"
            />
          ) : (
            <Image
              src={image.url}
              alt={title}
              width={588}
              height={404}
              className="object-cover w-full h-auto xl:min-h-[404px]"
            />
          )
        ) : (
          <Image
            src="/images/architecture-circular.png"
            alt="Circular architecture with gardens"
            width={588}
            height={404}
            className="sm:rounded-[16px] rounded-[9.34px] object-cover w-full h-auto xl:min-h-[404px] md:w-[46%] xl:w-[588px]"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 md:p-4 max-md:px-4 max-md:py-3 flex-1 max-w-[556px] md:max-w-full">
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          {title}
        </h2>

        <p className="text-sm leading-4.5 text-[#454950] sm:text-[#19212C] md:font-semibold md:text-base md:leading-6 md:align-middle">
          {description}
        </p>

        <Link href={buttonUrl} className="w-fit">
          <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase cursor-pointer md:font-bold md:text-xs md:leading-[18px] md:uppercase md:text-[#003399]">
            {buttonLabel}
            <ArrowRightIcon
              width={24}
              height={24}
              color="#003399"
              className="max-sm:w-6"
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
