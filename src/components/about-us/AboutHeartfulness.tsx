import Image from "next/image";

const AboutHeartfulness = () => {
  const stats = [
    { url: "/images/countries.png", value: "160+", label: "Countries" },
    { url: "/images/team.png", value: "5M+", label: "Practitioners" },
    { url: "/images/trainer.png", value: "16,000+", label: "Trainers" },
    { url: "/images/tent.png", value: "280+", label: "Retreat Centres" },
  ];

  return (
    <main className="w-full md:space-y-8 space-y-6 md:px-8 px-4">
      <div className="grid md:grid-cols-2 items-start md:gap-10 gap-4">
        {/* Left Content */}
        <div className="flex flex-col justify-between h-full md:px-4 md:py-2 max-md:space-y-2">
          <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] max-md:text-center md:text-[#090C0F]">
            About Heartfulness
          </h2>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            Heartfulness is a non-profit organization and spiritual movement
            originating in India. It is wholeheartedly dedicated to sharing the
            timeless traditions of raja yoga and meditation with seekers around
            the globe, free of charge.
          </p>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            Heartfulness offers unique, simple, and secular practices of
            relaxation, meditation, and rejuvenation for self-development.
            Practitioners find inner calm and stillness in an extremely
            fast-paced world, ultimately leading to spiritual growth.
            Heartfulness primarily in the areas of education, environment, and
            wellness.
          </p>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => {
            return (
              <div
                key={index}
                className={`border ${
                  index === 1 || index === 2
                    ? "border-[#9DE1C2]"
                    : "border-[#12B569]"
                } rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow md:space-y-4 space-y-2`}
              >
                <Image src={stat.url} alt={stat.label} width={40} height={40} />
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="max-md:text-sm text-[#4C4748]">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:space-y-6 md:px-4 space-y-2 text-[#454950] leading-6 max-md:text-sm">
        <p>
          Numerous books and other publications have been translated into over
          twenty languages. The contributions of Heartfulness Meditation in the
          fields of spirituality and environment has earned recognition from
          both the Indian government and numerous organizations across India and
          worldwide.
        </p>
        <p>
          Heartfulness was registered as an organization in 1945 in India by
          Shri Ram Chandra of Shahjahanpur, also known as Babuji, who had taken
          the name Ram Chandra after his Guide, Shri Ram Chandra of Fatehgarh,
          known as Lalaji, the first guide of Heartfulness. Heartfulness is
          recognized by the United Nations Department of Public Information
          (UNDPI) as an NGO committed to social service.
        </p>
      </div>
    </main>
  );
};

export default AboutHeartfulness;
