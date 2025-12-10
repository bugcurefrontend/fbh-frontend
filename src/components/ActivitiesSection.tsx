"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Article } from "@/types/article";

const ActivitiesSection: React.FC = () => {
  const [activities, setActivities] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Format date from "2025-12-08" to "08 DEC"
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      return `${day} ${month}`;
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    // Load articles from build-time generated JSON file with API fallback
    const fetchActivities = async () => {
      try {
        // Try to load from build-time generated JSON first
        const response = await fetch('/data/articles.json');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setActivities(data);
            setLoading(false);
            return;
          }
        }

        // Fallback: If JSON doesn't exist or is empty, fetch from API
        console.log('Falling back to API fetch...');
        const { getArticles } = await import('@/lib/api');
        const apiData = await getArticles();
        setActivities(apiData);
      } catch (error) {
        console.error("Failed to load activities:", error);
        // Try API as last resort
        try {
          const { getArticles } = await import('@/lib/api');
          const apiData = await getArticles();
          setActivities(apiData);
        } catch (apiError) {
          console.error("API fallback also failed:", apiError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const totalSlides = activities.length;
  const visibleSlides = 3;
  const progress =
    ((currentIndex + visibleSlides) / totalSlides) * 100 > 100
      ? 100
      : ((currentIndex + visibleSlides) / totalSlides) * 100;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 relative mt-8 md:mt-16">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          FBH Activities
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
          View All
        </button>
      </div>

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
        <CarouselContent className="-ml-8">
          {activities.map((activity, idx) => (
            <CarouselItem
              key={idx}
              className="basis-1/1 sm:basis-1/2 lg:basis-1/3 pl-8"
            >
              <div className="flex-1 h-full min-w-0 border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  width={350}
                  height={194}
                  className="w-full max-h-48 object-cover"
                />
                <div className="p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-bold text-black md:text-sm md:font-bold md:leading-[22px] md:text-center md:align-middle md:text-[#090C0F]">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#333333] truncate">
                    {activity.title}
                  </h3>
                  <p className="text-sm font-normal text-gray-600 md:text-sm md:font-normal md:leading-[21px] md:align-middle md:text-[#595959] line-clamp-2">
                    {activity.description}
                  </p>
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

      {/*Mobile Carousel */}
      <div className="flex sm:hidden justify-center gap-5 flex-col md:flex-row mb-4">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden"
          >
            <Image
              src={activity.image}
              alt={activity.title}
              width={350}
              height={194}
              className="w-full max-h-40 object-cover"
            />
            <div className="px-3 py-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-bold text-black md:text-sm md:font-bold md:leading-[22px] md:text-center md:align-middle md:text-[#090C0F]">
                  {formatDate(activity.date)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#333333] md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#333333]">
                {activity.title}
              </h3>
              <p className="text-sm font-normal text-gray-600 md:text-sm md:font-normal md:leading-[21px] md:align-middle md:text-[#595959]">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitiesSection;
