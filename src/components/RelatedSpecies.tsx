import ArrowRightIcon from "./icons/ArrowRightIcon";
import Link from "next/link";
import Image from "next/image";

const species = [
  { name: "Neem (Azadirachta)", image: "/images/neem-tree.jpg" },
  { name: "Banyan Tree", image: "/images/banyan-tree.avif" },
  { name: "Mango Tree", image: "/images/mango-tree.webp" },
];

const RelatedSpecies = () => {
  return (
    <div className="md:space-y-8 space-y-6">
      {/* Header */}
      <div className="w-full md:text-center mb-8 relative">
        <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold mx-auto sm:mx-0 text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
          Explore other species{" "}
        </h2>
        <button className="absolute right-0 top-4 text-[#003399] font-bold text-xs uppercase md:font-bold md:text-xs md:leading-[18px] md:text-center md:align-middle md:uppercase md:text-[#003399]">
          View All
        </button>
      </div>

      <div className="hidden mt-6 gap-6 md:gap-8 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center">
        {species.map((item, index) => (
          <Link href="/species-detail" key={index}>
            <div className="flex-1 min-w-0 border border-gray-200 rounded-xl flex-shrink-0">
              <div className="overflow-hidden w-full md:p-4 p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={350}
                  height={194}
                  className="w-full rounded-xl"
                />
              </div>
              <div className="p-4 flex justify-between items-center">
                <p className="text-sm font-semibold text-black truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#19212C]">
                  {item.name}
                </p>
                <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                  Know More
                  <ArrowRightIcon width={22} height={22} color="#003399" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="sm:hidden mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-4 pb-2 w-max">
          {species.map((item, idx) => (
            <div
              key={idx}
              className="flex-1 min-w-[314px] max-w-[314px] border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden"
            >
              <div className="pt-3 px-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={280}
                  height={194}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="p-4 flex sm:flex-root flex-col justify-between sm:items-center max-sm:gap-2">
                <p className="text-lg font-bold text-black truncate md:text-lg md:font-bold md:leading-[26px] md:align-middle md:text-[#19212C]">
                  {item.name}
                </p>
                <button className="flex items-center gap-2 text-[#003399] font-bold text-xs uppercase min-w-[0] cursor-pointer">
                  Know More{" "}
                  <ArrowRightIcon
                    width={22}
                    height={22}
                    color="#003399"
                    className="max-sm:w-4"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RelatedSpecies;
