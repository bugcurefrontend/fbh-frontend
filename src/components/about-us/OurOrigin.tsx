import Image from "next/image";

interface Props {
  imageOne?: { url: string; width?: number; height?: number } | null;
  imageTwo?: { url: string; width?: number; height?: number } | null;
}

const OurOrigin: React.FC<Props> = ({ imageOne, imageTwo }) => {
  return (
    <main className="md:space-y-16 space-y-8">
      <div className="flex max-md:flex-col md:gap-8 gap-6 items-center justify-center max-md:px-4">
        <div className="md:px-4 space-y-6 w-full h-auto md:w-[46%] xl:w-[588px]">
          <h2 className="text-[22px] sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:text-[#090C0F]">
            Our Origin
          </h2>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            Created in 2019 as a 64th birthday present to Daaji, Global Guide of
            Heartfulness, Forests By Heartfulness (FBH) began as a commitment to
            planting 64,000 trees across 64 cities. It then transformed to
            honour Daaji’s wish for a reforestation initiative. At the time, FBH
            pledged to plant 30 million native and endemic trees across India by
            2025.
          </p>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            Under the guidance of FBH’s expert forestry, agro-forestry and
            climate changes experts, FBH has created great impact, helping Kanha
            Shanti Vanam, the world headquarters of Heartfulness in Hyderabad,
            India, evolve into the green oasis that it is while also supporting
            the sustainability and reforestation of different parts of India.
          </p>
        </div>
        {imageOne && imageOne.url ? (
          <Image
            src={imageOne.url}
            alt="Our Origin"
            width={imageOne.width ?? 588}
            height={imageOne.height ?? 404}
            className="rounded-[9.34px] md:rounded-[16px] object-cover w-full md:w-[46%] xl:w-[588px] max-h-[236px] md:max-h-[404px]"
          />
        ) : (
          <Image
            src="/images/origin.png"
            alt="Our Origin"
            width={588}
            height={404}
            className="rounded-[9.34px] md:rounded-[16px] object-cover w-full max-h-[236px] md:max-h-[404px] md:w-[46%] xl:w-[588px]"
          />
        )}
      </div>
      <div className="flex max-md:flex-col-reverse md:gap-8 gap-6 items-center justify-center max-md:px-4">
        {imageTwo && imageTwo.url ? (
          <Image
            src={imageTwo.url}
            alt="Our Origin"
            width={imageTwo.width ?? 588}
            height={imageTwo.height ?? 404}
            className="rounded-[9.34px] md:rounded-[16px] object-cover w-full max-h-[236px] md:max-h-[404px] md:w-[46%] xl:w-[588px]"
          />
        ) : (
          <Image
            src="/images/origin.png"
            alt="Our Origin"
            width={588}
            height={404}
            className="rounded-[9.34px] md:rounded-[16px] object-cover w-full max-h-[236px] md:max-h-[404px] md:w-[46%] xl:w-[588px]"
          />
        )}
        <div className="md:px-4 space-y-6 w-full h-auto md:w-[46%] xl:w-[588px]">
          <p className="text-[#454950] leading-6 max-md:text-sm">
            Since then, FBH has diversified its impact beyond reforestation to
            include water conservation, agritecture, and more.
          </p>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            FBH believes in involving keen local communities in all its projects
            and creating a lasting sense of ownership for the future. We are
            unique in our approach in adopting innovative techniques as well as
            well-proven global nature-based solutions.
          </p>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            We are developmental partners with the International Union for
            Conservation of Nature (IUCN) and United Nations Convention on
            Combating Desertification (UNCCD).
          </p>
        </div>
      </div>
    </main>
  );
};
export default OurOrigin;
