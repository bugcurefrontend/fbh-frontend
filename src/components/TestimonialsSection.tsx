"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import QuoteIcon from "./icons/QuoteIcon";
import { TestimonialSimplified } from "@/types/testimonial";

interface TestimonialsSectionProps {
  testimonials?: TestimonialSimplified[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials: apiTestimonials,
}) => {
  const fallbackTestimonials = [
    {
      quote:
        "The experience has been flawless. It's incredibly user-friendly and robust. This tool has become indispensable for our daily operations, providing reliable performance and insightful analytics. We couldn't be happier with our decision.",
      name: "Akshay Shinde",
      designation: "TIMES OF INDIA",
      src: "/images/volunteer-testimonial.png",
    },
    {
      quote:
        "An absolute pleasure to work with. The team went above and beyond to tailor the solution to our specific needs, and the impact on our project delivery has been immediate and positive. Fantastic product and even better people!",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/images/t-2.jpg",
    },
    {
      quote:
        "This platform is a game-changer! Its intuitive design and powerful features have streamlined our operations, boosting efficiency. The customer support is exceptional. Highly recommended for any business aiming to grow.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/images/t-1.webp",
    },
  ];

  // Use API data if available, otherwise use fallback
  const testimonials =
    apiTestimonials && apiTestimonials.length > 0
      ? apiTestimonials.map((t) => ({
          quote: t.quote,
          name: t.name,
          designation: t.designation,
          src: t.src,
          videoUrl: t.videoUrl,
        }))
      : fallbackTestimonials.map((t) => ({ ...t, videoUrl: null }));

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const startAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Autoplay interval
  };

  const stopAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (!isHovered && !videoPlaying) startAutoPlay();
    else stopAutoPlay();
    return () => stopAutoPlay();
  }, [current, isHovered, videoPlaying]);

  // Reset video when switching testimonials
  useEffect(() => {
    setVideoPlaying(false);
  }, [current]);

  // Intersection observer to stop video when scrolling away
  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVideoPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setVideoPlaying(false);
  };

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };
  const imageSlideVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16"
    >
      <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#090C0F] mb-6 md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
        Testimonials
      </h2>

      <div
        className="overflow-hidden border border-[#e4e4e4] p-4 rounded-2xl flex flex-col md:flex-row sm:gap-16 gap-6 items-center justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`md:rounded-xl rounded-[8px] w-full md:w-[45%] md:max-h-[40%] h-full relative overflow-hidden ${
            testimonials[current].videoUrl && !videoPlaying
              ? "cursor-pointer"
              : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (testimonials[current].videoUrl && !videoPlaying) {
              setVideoPlaying(true);
            }
          }}
        >
          {/* Show embedded video when playing */}
          {videoPlaying && testimonials[current].videoUrl ? (
            testimonials[current].videoUrl!.includes("youtube.com") ||
            testimonials[current].videoUrl!.includes("youtu.be") ? (
              <iframe
                src={`${
                  testimonials[current].videoUrl!.includes("embed")
                    ? testimonials[current].videoUrl
                    : testimonials[current]
                        .videoUrl!.replace("watch?v=", "embed/")
                        .replace("youtu.be/", "youtube.com/embed/")
                }?autoplay=1`}
                className="w-full min-h-[316px] md:min-h-[423px] max-h-[423px] h-full md:rounded-lg rounded-[8px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={testimonials[current].videoUrl!}
                className="w-full min-h-[316px] md:min-h-[423px] max-h-[423px] h-full object-cover md:rounded-lg rounded-[8px]"
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`image-${current}`}
                variants={imageSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
              >
                <Image
                  src={testimonials[current].src}
                  alt={testimonials[current].name}
                  width={493}
                  height={423}
                  className="md:rounded-lg rounded-[8px] w-full min-h-[316px] md:min-h-[423px] max-h-[423px] h-full object-cover"
                />
                {/* Play Button Overlay - show if videoUrl exists */}
                {testimonials[current].videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center md:rounded-lg rounded-[8px] pointer-events-none">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-7 h-7 text-[#003399] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div
          key={`content-${current}`}
          className="max-w-full md:w-[55%] md:space-y-10 space-y-6 max-md:flex flex-col items-center text-center md:text-start"
        >
          <div className="sm:w-20 sm:h-20 w-12 h-12 flex items-center justify-center">
            <QuoteIcon
              width={77}
              height={77}
              color="#003399"
              className="opacity-90"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col sm:gap-1">
                <span className="sm:text-2xl text-lg font-semibold text-[#333333] md:text-2xl md:font-semibold md:leading-9 md:align-middle">
                  {testimonials[current].designation}
                </span>
                <span className="sm:text-xl text-base sm:font-bold font-semibold text-[#4B5563] md:text-xl md:font-bold md:leading-[30px] md:align-middle">
                  {testimonials[current].name}
                </span>
              </div>

              <p className="max-[440px]:min-h-[135px] max-[700px]:min-h-[115px] min-h-18 max-[440px]:text-sm max-[440px]:leading-[22px] text-[#454950]">
                {testimonials[current].quote}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex sm:gap-3 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-10 sm:h-2 h-1.5 rounded transition-all duration-300 ${
                  index === current ? "bg-[#003399]" : "bg-[#e6ebf5]"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
