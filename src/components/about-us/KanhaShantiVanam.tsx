import { Sprout, Leaf, Bird, Trees } from "lucide-react";
import Image from "next/image";

const KanhaShantiVanam = () => {
  const features = [
    {
      icon: Sprout,
      title: "Native Species",
      description: "Over 100+ indigenous tree species",
    },
    {
      icon: Leaf,
      title: "Biodiversity",
      description: "Home to diverse flora and fauna",
    },
    {
      icon: Bird,
      title: "Wildlife Habitat",
      description: "Sanctuary for local wildlife",
    },
    {
      icon: Trees,
      title: "Eco-Tourism",
      description: "Sustainable tourism destination",
    },
  ];

  return (
    <main className="md:mt-16 mt-8  space-y-4 md:space-y-8">
      <Image
        src="/images/kanha-shanti.png"
        alt="Kanha Shanti Vanam Forest"
        width={1280}
        height={400}
        className="w-full h-full object-cover"
      />
      <div className="max-w-7xl mx-auto md:px-8 px-4 space-y-4 md:space-y-8 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Kanha Shanti Vanam
        </h2>

        {/* Description */}
        <p className="text-[#454950] leading-6 max-md:text-sm">
          Kanha Shanti Vanam, meaning "Forest of Peace," spans 1,400 acres near
          Hyderabad, India. What was once barren, rocky terrain has been
          transformed into a lush green paradise through dedicated afforestation
          efforts. The campus serves as a model for sustainable ecological
          restoration, demonstrating how degraded land can be revitalized
          through native species plantation, water conservation, and community
          participation.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 border-[#E4E4E4] border rounded-xl">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-2 md:p-4 md:space-y-4 space-y-2"
              >
                {/* Icon with circle background */}
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
                    <Icon
                      className="w-6 h-6 text-green-800"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="md:text-2xl text-xl font-semibold">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="max-md:text-sm text-[#4C4748]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default KanhaShantiVanam;
