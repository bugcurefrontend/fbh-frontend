"use client";

import React from "react";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor. etiam viverra ut auctor semper lacinia. Eu dictum odio.",
      image: "/images/case-study-mountain.png",
    },
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor. dolor sit amet consectetur. Nibh porta dui fermentum in facilisi.",
      image: "/images/case-study-field.png",
    },
  ];

  return (
    <div className="">
      <h2 className="text-[32px] font-semibold text-[#232d26] font-['Playfair_Display'] text-center mb-10 md:mb-[40px] md:text-[24px]">
        Case Study
      </h2>

      <div className="flex flex-col md:flex-row gap-6 md:gap-[24px] mb-6 items-center">
        {caseStudies.map((study, index) => (
          <div
            key={index}
            className="w-full max-w-[600px] rounded-[16px] border border-[#e4e4e4] flex flex-col md:flex-row overflow-hidden p-4 md:p-[16px] gap-6 md:gap-[24px] shadow-none"
          >
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
                <h3 className="text-[18px] md:text-[18px] font-bold text-[#333333] leading-tight">
                  {study.title}
                </h3>
                <p className="text-[16px] md:text-[16px] font-semibold text-[#4b5563] leading-tight">
                  {study.subtitle}
                </p>
              </div>

              <p className="text-[16px] font-normal leading-[20px] text-[#454950] flex-1 line-clamp-4 md:line-clamp-4">
                {study.description}
              </p>

              <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
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
        ))}
      </div>

      <div className="md:flex hidden justify-between items-center md:flex-row flex-col">
        <div className="flex w-full">
          <div className="w-full max-w-[48%] h-1 md:h-[4px] bg-[#003399] rounded-[2px]"></div>
          <div className="w-full max-w-[48%] h-1 md:h-[4px] bg-[#d1d1d1] rounded-[2px]"></div>
        </div>

        <div className="flex gap-2 md:gap-1">
          <div className="border border-[#9CA3AF] md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center text-[#9CA3AF] cursor-pointer">
            <ChevronLeft fontSize="small" />
          </div>
          <div className="border border-black md:w-[42px] md:h-[42px] rounded-full flex items-center justify-center cursor-pointer">
            <ChevronRight fontSize="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesSection;
