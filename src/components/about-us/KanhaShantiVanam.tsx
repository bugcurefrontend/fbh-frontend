import { Star } from "lucide-react";
import Image from "next/image";

const KanhaShantiVanam = () => {
  const features = [
    {
      title: "Native Species",
      description: "Over 100+ indigenous tree species",
    },
    {
      title: "Biodiversity",
      description: "Home to diverse flora and fauna",
    },
    {
      title: "Wildlife Habitat",
      description: "Sanctuary for local wildlife",
    },
    {
      title: "Eco-Tourism",
      description: "Sustainable tourism destination",
    },
  ];

  return (
    <main className="md:mt-16 mt-8 space-y-4 md:space-y-8">
      <Image
        src="/images/kanha-shanti.png"
        alt="Kanha Shanti Vanam Forest"
        width={1280}
        height={400}
        className="w-full h-full min-h-[213px] object-cover"
      />
      <div className="max-w-7xl mx-auto md:px-8 px-4 space-y-4 md:space-y-8 text-center">
        {/* Title */}
        <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Kanha Shanti Vanam
        </h2>

        {/* Description */}
        <p className="text-[#454950] leading-6 max-md:text-sm max-sm:text-start">
          Kanha Shanti Vanam, meaning "Forest of Peace," spans 1,400 acres near
          Hyderabad, India. What was once barren, rocky terrain has been
          transformed into a lush green paradise through dedicated afforestation
          efforts. The campus serves as a model for sustainable ecological
          restoration, demonstrating how degraded land can be revitalized
          through native species plantation, water conservation, and community
          participation.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 border-[#E4E4E4] border rounded-[8px] md:rounded-[16px]">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="relative text-center p-4 md:space-y-4 space-y-2"
              >
                {/* Icon with circle background */}
                <div className="flex justify-center">
                  <div className="md:w-10 w-8 md:h-10 h-8 rounded-full bg-[#9DE1C2] border-[2.5px] border-[#76D5A9] flex items-center justify-center">
                    <Star
                      className="md:w-4 md:h-4 w-3 h-3 text-[#007A3F]"
                      fill="#007A3F"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="md:text-2xl text-lg font-semibold">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="max-md:text-xs max-md:font-semibold text-[#4C4748]">
                  {feature.description}
                </p>

                {(index === 0 || index === 2) && (
                  <div
                    className="absolute top-6 right-0 
     bg-[#D1D5DB] w-[0.5px] h-[97px]"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default KanhaShantiVanam;
