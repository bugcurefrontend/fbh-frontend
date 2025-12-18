"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";
import GeoTagToggleAndActions from "./GeoTagToggleAndActions";
import ShareButton from "../../app/case-studies/[slug]/ShareButton";

interface ProjectHeroProps {
  title: string;
  location: string;
  description: string;
  treeSpecies: Array<{
    id: string;
    imageUrl: string;
    imageAlt: string;
  }>;
  stats: {
    treesAvailable: number;
    treesPlanted: number;
    totalTrees: number;
  };
  isGeoTagged: boolean;
  onGeoTaggedChange: (checked: boolean) => void;
  onPlantTree: () => void;
  onGiftTree: () => void;
  onReadMoreClick?: () => void;
  mapCode: string;
  videoThumbnail?: string | null;
  videoUrl?: string | null;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  location,
  description,
  treeSpecies,
  stats,
  isGeoTagged,
  onGeoTaggedChange,
  onPlantTree,
  onGiftTree,
  onReadMoreClick,
  mapCode,
  videoThumbnail,
  videoUrl,
}) => {
  // Build items array: species images + video thumbnail (if exists) + map
  const buildItems = () => {
    const baseItems = [...treeSpecies];

    // Add video thumbnail if both thumbnail and url exist
    if (videoThumbnail && videoUrl) {
      baseItems.push({
        id: "video",
        imageUrl: videoThumbnail,
        imageAlt: "Project Video",
      });
    }

    // Add map at the end
    baseItems.push({
      id: "map",
      imageUrl: "",
      imageAlt: "Project Map",
    });

    return baseItems;
  };

  const [items, setItems] = useState(buildItems());

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(treeSpecies[0]?.imageUrl);
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

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length, videoPlaying]);

  // Update active image when index changes
  useEffect(() => {
    if (items[activeIndex].id === "map") {
      setActiveImage(""); // no image, show map
    } else if (items[activeIndex].id === "video") {
      setActiveImage(items[activeIndex].imageUrl);
      // Don't reset videoPlaying here - let the click handler control it
    } else {
      setActiveImage(items[activeIndex].imageUrl);
      setVideoPlaying(false); // Reset video playing only when switching to non-video items
    }
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
    <div className="bg-white rounded-2xl overflow-hidden" ref={heroRef}>
      <div className="flex flex-col lg:flex-row space-x-6 space-y-6 lg:space-y-0">
        {/* Left side - Hero Image / Map / Video */}
        <div className="lg:w-[546px] w-full relative flex-shrink-0 group/container">
          <div
            className="min-h-[360px] h-full w-full relative overflow-hidden rounded-lg cursor-pointer"
            onClick={() => {
              // Only trigger video play when clicking on video item
              if (items[activeIndex].id === "video" && videoUrl && !videoPlaying) {
                setVideoPlaying(true);
              }
            }}
          >
            {/* Show video player when video is selected and playing */}
            {items[activeIndex].id === "video" && videoPlaying && videoUrl ? (
              videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                <iframe
                  src={`${videoUrl.includes("embed") ? videoUrl : videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}?autoplay=1`}
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
            ) : activeImage ? (
              <Image
                src={activeImage}
                alt={items[activeIndex].imageAlt}
                fill
                className="object-cover transition-all duration-500"
              />
            ) : mapCode ? (
              // Show map iframe for last thumbnail
              <iframe
                src={`https://www.google.com/maps/embed?pb=${mapCode}`}
                width="100%"
                height="100%"
                className="rounded-lg border-0 min-h-[360px] h-full"
                allowFullScreen
              />
            ) : (
              // Fallback when no map code
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 min-h-[360px]">
                <span>Map not available</span>
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
                    // Select the item (video thumbnail will show first, click main view to play)
                    setActiveIndex(i);
                    setVideoPlaying(false); // Always reset - user must click main view to play
                  }}
                  className={`w-[112px] h-[112px] flex-shrink-0 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    activeIndex === i
                      ? "border-[#003399]"
                      : "border-white"
                  }`}
                >
                  <div className="relative w-full h-full">
                    {item.id === "map" ? (
                      <Image
                        src="/images/map.png"
                        alt="map"
                        width={112}
                        height={112}
                        className="w-full min-h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        width={112}
                        height={112}
                        className="w-full min-h-full object-cover"
                      />
                    )}
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

        {/* Right side - Project Details (unchanged) */}
        <div className="flex flex-col justify-between md:gap-6">
          {/* Title and Location */}
          <div className="max-md:space-y-4 relative">
            <div className="md:space-y-2 space-y-1">
              <h1 className="text-lg md:text-2xl font-semibold md:text-gray-900 text-[#333333]  font-public-sans">
                {title}
              </h1>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-5.5 h-5.5" />
                <span className="md:text-base text-sm md:font-semibold">
                  {location}
                </span>
              </div>
            </div>
            <div className="md:mt-4 text-gray-700 md:text-base text-sm leading-6 relative">
              <p className="line-clamp-4">{description}</p>
              <button
                onClick={onReadMoreClick}
                className="max-md:hidden text-[#003399] text-sm font-semibold absolute bottom-0 right-0 bg-white pl-1"
              >
                ... Read More
              </button>
            </div>

            <ShareButton className="md:hidden right-0 top-3" />
          </div>

          {/* Statistics */}
          <div className="max-md:mt-2 border border-[#E4E4E4] rounded-2xl flex items-center justify-between p-6">
            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <LandscapeIcon className="md:w-10 w-8 h-8 md:h-10 text-white mx-auto" />
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.treesAvailable.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs text-gray-600">
                Trees <br className="md:hidden" /> Available
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <TreeSpeciesIcon className="md:w-10 w-8 h-8 md:h-10 mx-auto" />
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.treesPlanted.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs text-gray-600">
                Trees <br className="md:hidden" /> Planted
              </div>
            </div>

            <div className="w-px md:h-[140px] h-[96px] bg-gray-300 mx-6"></div>

            <div className="text-center space-y-2 xl:space-y-4 flex-1">
              <div className="md:w-10 w-8 md:h-10 h-8 mx-auto">
                <Image
                  src="/images/tree.png"
                  alt="tree"
                  width={40}
                  height={40}
                  className="md:w-10 w-8 h-8 md:h-10 mx-auto"
                />
              </div>
              <div className="md:text-2xl text-lg font-bold md:font-semibold text-black">
                {stats.totalTrees.toLocaleString()}+
              </div>
              <div className="md:text-base text-xs text-gray-600">
                Total <br className="md:hidden" /> Trees
              </div>
            </div>
          </div>

          {/* Geo-tagged Toggle and Actions */}
          <GeoTagToggleAndActions
            isGeoTagged={isGeoTagged}
            onGeoTaggedChange={onGeoTaggedChange}
            onPlantTree={onPlantTree}
            onGiftTree={onGiftTree}
            variant="desktop"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
