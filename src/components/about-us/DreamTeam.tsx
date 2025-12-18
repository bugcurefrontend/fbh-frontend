"use client";

import { useState } from "react";
import Image from "next/image";
import ArrowRightIcon from "../icons/ArrowRightIcon";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Linkedin, Mail } from "lucide-react";

const DreamTeam = ({}) => {
  const dreamTeam = [
    {
      title: "Sangeeth Kumar Parvatam",
      subtitle: "Co-Founder, Heartfulness",
      description:
        "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India.",
      image: "/images/sangeeth.png",
    },
    {
      title: "Sangeeth Kumar Parvatam",
      subtitle: "Co-Founder, Heartfulness",
      description:
        "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India.",
      image: "/images/sangeeth.png",
    },
    {
      title: "Sangeeth Kumar Parvatam",
      subtitle: "Co-Founder, Heartfulness",
      description:
        "Dr. V Ramakantha was a member of the Indian Forest Service and has superannuated as the Principal Chief Conservator of Forests. He is an academician, author and internationally acclaimed wildlife photographer. He has had the experience of managing a few of the ecologically important, species-rich ecosystems of India.",
      image: "/images/sangeeth.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = dreamTeam.length;
  const visibleSlides = 2;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  return (
    <section className="px-4 md:px-8 mt-8 md:mt-16">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] mb-6">
        Meet the Dream Team
      </h2>

      {/*Desktop Carousel */}
      <Carousel className="max-sm:hidden" opts={{ align: "start" }}>
        <CarouselContent className="-ml-4">
          {dreamTeam.map((team, idx) => (
            <CarouselItem key={idx} className="basis-1/1 sm:basis-1/2 pl-4">
              <div className="w-full rounded-[16px] border border-[#e4e4e4] flex flex-col lg:flex-row overflow-hidden p-4 md:p-[16px] gap-6 md:gap-[24px] shadow-none">
                <div className="w-full h-[300px] md:w-[229px] md:h-[344px] flex-shrink-0 rounded-[8px] overflow-hidden relative md:flex-shrink-0">
                  <Image
                    src={team.image}
                    alt={team.title}
                    fill
                    sizes="(max-width: 600px) 120px, 245px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4 md:gap-[24px] flex-1 min-w-0">
                  <div className="flex flex-col">
                    <h3 className="text-[18px] md:text-[18px] font-semibold text-[#333333] leading-tight md:text-xl md:leading-[26px] md:align-middle">
                      {team.title}
                    </h3>
                    <p className="text-[#94979A] leading-tight md:text-base md:leading-6 md:align-middle">
                      {team.subtitle}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[16px] font-normal leading-[20px] text-[#454950] md:text-base md:font-normal md:leading-6 md:text-[#454950]">
                      {team.description}
                    </p>

                    <div className="h-[1px] w-full bg-[#E5EBF5]" />

                    <div className="flex gap-4 text-[#003399]">
                      <Linkedin size={24} className="cursor-pointer" />{" "}
                      <Mail size={24} className="cursor-pointer" />
                    </div>
                  </div>
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
        {dreamTeam.map((team, idx) => (
          <div
            key={idx}
            className="w-full rounded-[9px] border border-[#e4e4e4] flex flex-row p-3 gap-3.5 shadow-none items-center"
          >
            <Image
              src={team.image}
              alt={team.title}
              height={170}
              width={140}
              className="rounded-sm object-cover min-h-[173px]"
            />

            <div className="space-y-3">
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-[#333333] leading-[20px] font-[Public_Sans]">
                  {team.title}
                </h3>
                <p className="text-[14px] font-normal leading-[18px] text-[#4b5563] font-[Public_Sans]">
                  {team.subtitle}
                </p>
              </div>

              <p className="text-[10px] font-semibold leading-[16px] text-[#595959] flex-1 line-clamp-4 md:line-clamp-4 font-[Public_Sans]">
                {team.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DreamTeam;
