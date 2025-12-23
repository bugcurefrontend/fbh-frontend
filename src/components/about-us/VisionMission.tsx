import Image from "next/image";

const VisionMission = () => {
  return (
    <main className="flex max-md:items-center max-md:flex-col md:mx-14 mx-4 md:py-8 md:px-6 py-4 px-2 rounded-xl gap-2 border border-[#95AAD5]">
      <div className="space-y-4 p-4 md:w-[49%]">
        <Image src="/images/vision.png" alt="Vision" width={48} height={48} />
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
            Vision
          </h2>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            Our vision is to conserve the native, endemic, threatened species of
            the country and enrich the mega-biodiversity while sequestering
            carbon permanently from the atmosphere, heartfully reconnecting
            humans with nature and providing future generations with a safe,
            healthy and sustainable home.
          </p>
        </div>
      </div>
      <div className="md:w-[0.5px] w-full h-[0.5px] bg-[#D1D5DB] md:h-[272px]" />
      <div className="space-y-4 p-4 md:w-[50%]">
        <Image src="/images/mission.png" alt="Mission" width={48} height={48} />
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-[32px] font-[Playfair_Display] font-semibold text-black md:text-[32px] md:font-semibold md:leading-[48px] md:align-middle md:text-[#090C0F]">
            Mission
          </h2>
          <p className="text-[#454950] leading-6 max-md:text-sm">
            To conserve and restore Earth’s native, endemic, and endangered
            tree, plant and animal species through reforestation, water
            conservation, sustainable agritecture and other critical
            sustainability initiatives.
          </p>
        </div>
      </div>
    </main>
  );
};
export default VisionMission;
