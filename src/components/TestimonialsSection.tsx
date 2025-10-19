"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import QuoteIcon from "./icons/QuoteIcon";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "From initial setup to daily use, the experience has been flawless. It’s incredibly user-friendly and robust. This tool has become indispensable for our daily operations, providing reliable performance and insightful analytics. We couldn't be happier with our decision.",
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

  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentTestimonial = testimonials[current];

  const handleDotClick = (index: number) => {
    setCurrent(index);
    startAutoPlay();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-16">
      <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] mb-6 md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#232D26]">
        Testimonials
      </h2>

      <div className="border border-[#e4e4e4] p-4 rounded-2xl flex flex-col md:flex-row sm:gap-16 gap-6 items-center justify-between">
        <motion.div
          key={`image-${current}`}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
          className="rounded-xl w-full md:w-[45%] md:max-h-[40%] h-full"
        >
          <Image
            src={currentTestimonial.src}
            alt={`Testimonial from ${currentTestimonial.name}`}
            width={493}
            height={423}
            className="rounded-lg w-full min-h-[316px] md:min-h-[423px] h-full object-cover"
          />
        </motion.div>

        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.9 }}
          transition={{ duration: 1 }}
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

          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:gap-1">
              <span className="sm:text-2xl text-lg font-semibold text-[#333333] md:text-2xl md:font-semibold md:leading-9 md:align-middle">
                {currentTestimonial.designation}
              </span>
              <span className="sm:text-xl text-base sm:font-bold font-semibold text-[#4B5563] md:text-xl md:font-bold md:leading-[30px] md:align-middle">
                {currentTestimonial.name}
              </span>
            </div>

            <p className="max-[440px]:min-h-[135px] max-[700px]:min-h-[115px] max-[440px]:text-sm max-[440px]:leading-[22px] text-[#454950]">
              {currentTestimonial.quote}
            </p>
          </div>

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
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
