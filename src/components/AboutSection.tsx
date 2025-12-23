"use client";
import React from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import Link from "next/link";

const AboutSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 flex md:flex-row flex-col gap-8 items-center mb-8 md:mb-16">
      <Image
        src="/images/architecture-circular.png"
        alt="Circular architecture with gardens"
        width={588}
        height={404}
        className="rounded-xl object-cover w-full h-auto md:w-[46%] xl:w-[588px]"
      />

      {/* Content */}
      <div className="flex flex-col gap-6 p-4 flex-1 max-w-[556px] md:max-w-full">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          What is Forests By Heartfulness?
        </h2>

        <p className="font-semibold sm:text-base text-sm leading-6 sm:text-[#19212C] text-[#454950] md:font-semibold md:text-base md:leading-6 md:align-middle md:text-[#19212C]">
          Forests By Heartfulness is an initiative committed to rejuvenating
          Earth's native, endangered, and endemic species through green action,
          cutting-edge research, ecological empathy and a reconnection between
          human and nature.
        </p>

        <Link href="/about-us" className="w-fit">
          <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase cursor-pointer md:font-bold md:text-xs md:leading-[18px] md:uppercase md:text-[#003399]">
            Know More{" "}
            <ArrowRightIcon
              width={22}
              height={22}
              color="#003399"
              className="max-sm:w-4"
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
