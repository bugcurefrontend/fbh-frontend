"use client";

import React, { useState } from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor..",
      image: "/images/case-study-mountain.png",
    },
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor.",
      image: "/images/case-study-field.png",
    },
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor.",
      image: "/images/case-study-field.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = caseStudies.length;
  const visibleSlides = 2;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  return (
    <section className="mt-16 md:mx-8">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] sm:mb-10 mb-6">
        Case Study
      </h2>

      {/*Desktop Carousel */}
      <Carousel
        className="max-sm:hidden"
        opts={{ align: "start" }}
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="-ml-4">
          {caseStudies.map((study, idx) => (
            <CarouselItem key={idx} className="basis-1/1 sm:basis-1/2 pl-4">
              <div className="w-full rounded-[16px] border border-[#e4e4e4] flex flex-col md:flex-row overflow-hidden p-4 md:p-[16px] gap-6 md:gap-[24px] shadow-none">
                <div className="w-full h-[200px] md:w-[245px] md:h-[304px] flex-shrink-0 rounded-[8px] overflow-hidden relative md:flex-shrink-0">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 600px) 120px, 245px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 md:gap-[24px] flex-1 min-w-0">
                  <div className="flex flex-col gap-1 md:gap-[4px]">
                    <h3 className="text-[18px] md:text-[18px] font-bold text-[#333333] leading-tight md:text-lg md:font-bold md:leading-[26px] md:align-middle">
                      {study.title}
                    </h3>
                    <p className="text-[16px] md:text-[16px] font-semibold text-[#4b5563] leading-tight md:text-base md:font-semibold md:leading-6 md:align-middle">
                      {study.subtitle}
                    </p>
                  </div>

                  <p className="text-[16px] font-normal leading-[20px] text-[#454950] flex-1 line-clamp-4 md:line-clamp-4 md:text-base md:font-normal md:leading-6 md:text-[#454950]">
                    {study.description}
                  </p>

                  <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer md:font-bold md:text-xs md:leading-[18px] md:uppercase md:text-[#003399]">
                    Know More{" "}
                    <ArrowRightIcon
                      width={22}
                      height={22}
                      color="#003399"
                      className="max-sm:w-4"
                    />
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls + Progress Bar */}
        <div className="flex justify-between items-center mt-6 gap-6 relative">
          <div className="w-full h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px] overflow-hidden">
            <div
              className="h-1 md:h-[4px] bg-[#003399] rounded-[2px] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <CarouselPrevious className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer" />
            <CarouselNext className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer" />
          </div>
        </div>
      </Carousel>

      {/*Mobile*/}
      <div className="flex sm:hidden flex-col gap-6 mb-6 items-center">
        {caseStudies.map((study, idx) => (
          <div
            key={idx}
            className="w-full rounded-[9px] border border-[#e4e4e4] flex flex-row p-3 gap-3.5 shadow-none items-center"
          >
            <Image
              src={study.image}
              alt={study.title}
              height={170}
              width={140}
              className="rounded-sm object-cover min-h-[173px]"
            />

            <div className="space-y-3">
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-[#333333] leading-tight">
                  {study.title}
                </h3>
                <p className="text-[14px] text-[#4b5563] leading-tight">
                  {study.subtitle}
                </p>
              </div>

              <p className="text-[10px] font-normal leading-[16px] text-[#454950] flex-1 line-clamp-4 md:line-clamp-4">
                {study.description}
              </p>

              <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer md:font-bold md:text-xs md:leading-[18px] md:uppercase md:text-[#003399]">
                Read More{" "}
                <ArrowRightIcon
                  width={22}
                  height={22}
                  color="#003399"
                  className="max-sm:w-4"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesSection;
