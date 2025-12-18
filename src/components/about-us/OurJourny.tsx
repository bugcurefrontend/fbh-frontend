import Image from "next/image";
import React from "react";

const JourneyTimeline = () => {
  const timelineData = [
    {
      year: "2015–2019",
      title: "Kanha Shanti Vanam Transformation",
      description:
        "Under the guidance of expert forestry, agro-forestry and climate change experts, FBII helped Kanha Shanti Vanam evolve into the green oasis that it is today.",
      position: "left",
    },
    {
      year: "2019",
      title: "The Beginning",
      description:
        "Recognizing the urgent need to scale up tree-driven forestry work for a reforestation initiative, AI At the time, FBII pledged to plant 30 million native and endemic trees across India by 2025.",
      position: "right",
    },
    {
      year: "2020–2022",
      title: "Scaling Across India",
      description:
        "FBII has been at the forefront of large-scale afforestation efforts across India. The FBII team and countless volunteers undertook afforestation work on 10,000 acres across multiple regions.",
      position: "left",
    },
    {
      year: "2022–2023",
      title: "Beyond Reforestation",
      description:
        "Since then, FBII diversified its impact beyond reforestation to include water conservation, agriculture, and more. This work continues to grow in scale, spreading to new regions.",
      position: "right",
    },
    {
      year: "2023–2024",
      title: "Conservation and Innovation",
      description:
        "The FBII team studied understudied and vital linkages and successfully translocated mature trees. These efforts demonstrate a holistic approach to ecological restoration combining scale.",
      position: "left",
    },
    {
      year: "2024",
      title: "National Impact Milestone",
      description:
        "Over 30 million trees were planted through 40 projects across 12 states in India. This included lakes restored, naruralist nurturing, hatchings, and native and endemic species conservation.",
      position: "right",
    },
    {
      year: "2024–Present",
      title: "Global Collaboration",
      description:
        "Today, FBII is a Government partner with IUCN and the United Nations Convention to Combat Desertification.",
      position: "left",
    },
  ];

  return (
    <div className="w-full text-center bg-white md:space-y-8 space-y-6 md:px-8 px-4">
      <h1 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
        Our Journey
      </h1>

      <div className="relative">
        {/* Center line */}
        <div className="absolute md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#9DE1C2] rounded-full"></div>

        {/* Timeline items */}
        <div className="max-md:space-y-12">
          {timelineData.map((item, index) => (
            <div key={index} className="relative">
              {/* Desktop layout */}
              <div className="">
                {item.position === "left" ? (
                  <div className="flex items-center">
                    {/* Left content */}
                    <div className="md:w-1/2 max-md:pl-8 md:pr-12 max-md:text-left md:text-right">
                      <div className="inline-block">
                        <Image
                          src="/images/journey.png"
                          alt={item.title}
                          width={296}
                          height={144}
                          className="max-w-74 max-h-36 rounded-md object-cover md:mb-6 mb-4 md:ml-auto"
                        />
                        <h3 className="text-xl leading-6 font-bold md:mb-4 mb-2">
                          {item.year} — {item.title}
                        </h3>
                        <p className="md:text-lg text-sm font-medium text-[#454950] md:leading-6">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute flex items-center justify-center md:left-1/2 -left-2 transform md:-translate-x-1/2 w-[19px] h-[19px] border-[#9DE1C2] rounded-full border-[0.4px] bg-[#E7F8F0] z-10">
                      <div className="bg-[#007A3F] rounded-full h-[11px] w-[11px]"></div>
                    </div>

                    {/* Right empty space */}
                    <div className="md:w-1/2 md:pl-12"></div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    {/* Left empty space */}
                    <div className="md:w-1/2 md:pr-12"></div>

                    {/* Center dot */}
                    <div className="absolute flex items-center justify-center md:left-1/2 -left-2 transform md:-translate-x-1/2 w-[19px] h-[19px] border-[#9DE1C2] rounded-full border-[0.4px] bg-[#E7F8F0] z-10">
                      <div className="bg-[#007A3F] rounded-full h-[11px] w-[11px]"></div>
                    </div>

                    {/* Right content */}
                    <div className="md:w-1/2 md:pl-12 pl-8">
                      <div className="inline-block text-left">
                        <Image
                          src="/images/journey.png"
                          alt={item.title}
                          width={296}
                          height={144}
                          className="max-w-74 max-h-36 rounded-md object-cover md:mb-6 mb-4"
                        />
                        <h3 className="text-xl leading-6 font-bold md:mb-4 mb-2">
                          {item.year} — {item.title}
                        </h3>
                        <p className="md:text-lg text-sm font-medium text-[#454950] md:leading-6">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
