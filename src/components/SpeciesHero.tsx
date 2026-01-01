"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Trees, ChevronLeft, ChevronRight } from "lucide-react";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";
import ShareButton from "../../app/case-studies/[slug]/ShareButton";

interface SpeciesHeroProps {
  name: string;
  scientificName: string;
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
  characteristics: {
    lifespan: string;
    oxygenReleased: string;
    height: string;
    mdHeight?: string;
  };
  treeSpecies: Array<{
    id: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
  videoThumbnail?: string | null;
  videoUrl?: string | null;
  geotaggedRate?: number;
  nonGeotaggedRate?: number;
  currencySymbol?: string;
}

const SpeciesHero: React.FC<SpeciesHeroProps> = ({
  name,
  scientificName,
  description,
  treeSpecies,
  characteristics,
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
  videoThumbnail,
  videoUrl,
  geotaggedRate,
  nonGeotaggedRate,
  currencySymbol = "₹",
}) => {
  // Build items array: species images + video thumbnail (if exists)
  const buildItems = () => {
    const baseItems = [...treeSpecies];

    // Add video thumbnail if both thumbnail and url exist
    if (videoThumbnail && videoUrl) {
      baseItems.push({
        id: "video",
        imageUrl: videoThumbnail,
        imageAlt: "Species Video",
      });
    }

    return baseItems;
  };

  const [items, setItems] = useState(buildItems());
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(
    treeSpecies.length > 0 ? treeSpecies[0].imageUrl : ""
  );
  const [videoPlaying, setVideoPlaying] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -120, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 120, behavior: "smooth" });
    }
  };

  // Auto-rotate only when video is not playing
  useEffect(() => {
    if (videoPlaying) return; // Don't auto-rotate when video is playing
    if (items.length === 0) return; // Prevent division by zero if items is empty

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length, videoPlaying]);

  // Update active image when index changes
  useEffect(() => {
    if (items.length > 0 && activeIndex < items.length) {
      if (items[activeIndex].id === "video") {
        setActiveImage(items[activeIndex].imageUrl);
        // Don't reset videoPlaying here - let the click handler control it
      } else {
        setActiveImage(items[activeIndex].imageUrl);
        setVideoPlaying(false); // Reset video playing only when switching to non-video items
      }
    } else {
      setActiveImage(""); // No images or invalid index
    }
    // Reset activeIndex if it goes out of bounds after items change
    if (activeIndex >= items.length && items.length > 0) setActiveIndex(0);
  }, [activeIndex, items]);

  // Intersection observer to stop video when scrolling away
  useEffect(() => {
    const heroSection = heroRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVideoPlaying(false); // Stop video when out of view
        }
      },
      { threshold: 0.3 }
    );

    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  useEffect(() => {
    // Check scroll buttons after a short delay to ensure proper rendering
    const timer = setTimeout(() => {
      checkScrollButtons();
    }, 100);

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScrollButtons);
      return () => {
        clearTimeout(timer);
        slider.removeEventListener("scroll", checkScrollButtons);
      };
    }
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <div className="bg-white md:rounded-[16px] overflow-hidden" ref={heroRef}>
      <div className="flex flex-col lg:flex-row space-x-6 space-y-6 lg:space-y-0">
        {/* Left side - Hero Image / Video */}
        <div className="lg:w-[546px] w-full relative flex-shrink-0 group/container">
          <div
            className="min-h-[360px] h-full w-full relative overflow-hidden md:rounded-[16px] rounded-[8px] cursor-pointer"
            onClick={() => {
              // Only trigger video play when clicking on video item
              if (
                items[activeIndex]?.id === "video" &&
                videoUrl &&
                !videoPlaying
              ) {
                setVideoPlaying(true);
              }
            }}
          >
            {/* Show video player when video is selected and playing */}
            {items[activeIndex]?.id === "video" && videoPlaying && videoUrl ? (
              videoUrl.includes("youtube.com") ||
              videoUrl.includes("youtu.be") ? (
                <iframe
                  src={`${
                    videoUrl.includes("embed")
                      ? videoUrl
                      : videoUrl
                          .replace("watch?v=", "embed/")
                          .replace("youtu.be/", "youtube.com/embed/")
                  }?autoplay=1`}
                  className="w-full h-full min-h-[360px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover min-h-[360px]"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                >
                  Your browser does not support the video tag.
                </video>
              )
            ) : activeImage && items.length > 0 ? (
              <Image
                src={activeImage}
                alt={items[activeIndex]?.imageAlt || "Species image"}
                fill
                className="object-cover transition-all duration-500"
              />
            ) : (
              // Placeholder if no image is available
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 min-h-[360px]">
                <Trees className="w-16 h-16 text-gray-300" />
              </div>
            )}
          </div>

          {/* Mobile dots (shows on hover) */}
          <div className="flex md:hidden justify-center mt-4 gap-2 transition-all duration-300 opacity-0 group-hover/container:opacity-100">
            {items.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-[#003399]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Desktop thumbnails - horizontal slider with arrows inside (shows on hover) */}
          <div className="absolute bottom-6 left-6 right-6 transition-all duration-300 hidden md:block opacity-0 group-hover/container:opacity-100 translate-y-4 group-hover/container:translate-y-0">
            <div className="relative">
              {/* Left Arrow - inside */}
              <button
                onClick={scrollLeft}
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft
                    ? "opacity-100 hover:bg-white cursor-pointer"
                    : "opacity-0 pointer-events-none"
                }`}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="w-5 h-5 text-[#003399]" />
              </button>

              {/* Thumbnails Container */}
              <div
                ref={sliderRef}
                className="flex gap-2 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {items.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveIndex(i);
                      setVideoPlaying(false); // Always reset - user must click main view to play
                    }}
                    className={`w-[112px] h-[112px] flex-shrink-0 md:rounded-[16px] rounded-[8px] overflow-hidden border-2 cursor-pointer ${
                      activeIndex === i ? "border-[#003399]" : "border-white"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        width={112}
                        height={112}
                        className="w-full min-h-full object-cover"
                      />
                      {/* Shadow gradient at bottom of each thumbnail */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow - inside */}
              <button
                onClick={scrollRight}
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  canScrollRight
                    ? "opacity-100 hover:bg-white cursor-pointer"
                    : "opacity-0 pointer-events-none"
                }`}
                disabled={!canScrollRight}
              >
                <ChevronRight className="w-5 h-5 text-[#003399]" />
              </button>
            </div>
          </div>

          <ShareButton className="max-md:hidden right-4 top-4" />
        </div>

        {/* Right side - Species Details */}
        <div className="flex flex-col justify-between md:gap-6">
          {/* Title and Scientific Name */}
          <div className="md:space-y-2 space-y-4 relative">
            <div className="md:space-y-2 space-y-1 flex items-center justify-between">
              <div className="md:space-y-2 space-y-1">
                <h1 className="text-lg md:text-2xl font-semibold md:text-gray-900 text-[#333333] font-public-sans">
                  {name}
                </h1>

                <div className="flex items-center gap-1 text-gray-600">
                  <Image
                    src="/images/Frame.png"
                    alt="tree"
                    width={20}
                    height={20}
                  />
                  <span className="md:text-base text-sm md:font-semibold">
                    {scientificName}
                  </span>
                </div>
              </div>
              <ShareButton className="md:hidden right-0" />
            </div>
            <p className="text-gray-700 md:text-base text-sm leading-6 line-clamp-5">
              {description}
            </p>
          </div>

          {/* Species Characteristics */}
          <div className="border border-[#E4E4E4] rounded-[8px] md:rounded-2xl flex items-center justify-between md:p-6 p-4 max-lg:mt-6">
            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/lifespan.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {characteristics.lifespan} yrs
              </div>
              <div className="md:text-base text-xs text-[#4C4748]">
                Lifespan
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 md:mx-6 mx-1"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/oxygen.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {characteristics.oxygenReleased}
              </div>
              <div className="md:text-base text-xs text-[#4C4748]">
                Oxygen <span className="max-md:hidden">Released</span>
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 md:mx-6 mx-1"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/height.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                <span className="max-md:hidden">
                  {characteristics.mdHeight}
                </span>
                <span className="md:hidden">{characteristics.height}</span>m
              </div>
              <div className="md:text-base text-xs text-[#4C4748]">Height</div>
            </div>
          </div>

          {/* Geo-tagged Toggle and Actions */}
          <GeoTagToggleAndActions
            isGeoTagged={isGeoTagged}
            onGeoTaggedChange={onGeoTaggedChange}
            onPlantTree={onPlantTree}
            onGiftTree={onGiftTree}
            variant="desktop"
            geotaggedRate={geotaggedRate}
            nonGeotaggedRate={nonGeotaggedRate}
            currencySymbol={currencySymbol}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeciesHero;
