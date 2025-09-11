"use client";
import React from "react";
import Image from "next/image";
import QuoteIcon from "./icons/QuoteIcon";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-[Playfair_Display] font-semibold sm:text-center text-[#232D26] sm:mb-10 mb-6">
        Testimonials
      </h2>

      {/* Testimonial Card */}
      <div className="border border-[#e4e4e4] p-4 rounded-2xl flex flex-col md:flex-row sm:gap-16 gap-6 items-center justify-between">
        {/* Image */}
        <Image
          src="/images/volunteer-testimonial.png"
          alt="Volunteer testimonial"
          width={493}
          height={423}
          className="rounded-xl object-cover w-full h-auto lg:w-[45%]"
        />

        {/* Content */}
        <div className="max-w-2xl lg:max-w-full lg:w-[55%] md:space-y-10 space-y-6 max-md:flex flex-col items-center text-center md:text-start">
          {/* Quote Icon */}
          <div className="sm:w-20 sm:h-20 w-12 h-12 flex items-center justify-center">
            <QuoteIcon width={77} height={77} color="#003399" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4">
            {/* Attribution */}
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-semibold text-[#333333]">
                TIMES OF INDIA
              </span>
              <span className="text-xl font-bold text-gray-600">
                Akshay Shinde
              </span>
            </div>

            {/* Quote */}
            <p className="text-base font-normal leading-6 text-[#454950]">
              Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum
              in facilisi sed. Pellentesque lectus proin gravida in. Malesuada
              etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam
              integer placerat posuere.
            </p>
          </div>

          {/* Pagination Dots */}
          <div className="flex sm:gap-3 gap-2">
            <span className="w-10 sm:h-2 h-1.5 rounded bg-[#003399]"></span>
            <span className="w-10 sm:h-2 h-1.5 rounded bg-[#e6ebf5]"></span>
            <span className="w-10 sm:h-2 h-1.5 rounded bg-[#e6ebf5]"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
