import Gallery from "@/components/Gallery";
import PartnersSection from "@/components/PartnersSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MapPin } from "lucide-react";

const CaseStudy = () => {
  return (
    <main className="min-h-screen bg-white space-y-8">
      <section
        className="relative h-[213px] md:h-[288px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMG5hdHVyZXxlbnwwfDB8fGdyZWVufDE3NTc3NjExNzB8MA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full mx-auto px-4 md:px-12 md:space-y-12 space-y-8 text-white">
          <Breadcrumb>
            <BreadcrumbList className="text-white font-semibold md:text-base text-sm leading-[18px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Homepage</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/case-study">Case Study</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/satna">Satna, NPCI</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-4">
            <h1 className="font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
              Satna, NPCI
            </h1>
            <div className="flex items-center gap-2 md:text-lg text-[10px] md:font-bold font-semibold leading-4 md:leading-[26px]">
              <MapPin className="w-4 h-4" />
              <span className="md:text-base text-sm md:font-semibold">
                Madhya Pradesh
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="md:space-y-12 space-y-8">
        <div className="space-y-6 md:px-8 px-4">
          <h1 className="text-center font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
            Overview
          </h1>
          <p className="text-[#454950] max-md:text-sm">
            Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in
            facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam
            viverra ut auctor semper lacinia. Eu dictum odio eu quam integer
            placerat posuere. Faucibus pellentesque sit in porttitor adipiscing
            a. Lectus nascetur proin volutpat senectus. Molestie ultricies eu eu
            amet tellus fames. Id tellus volutpat quisque enim turpis nisi. Sed
            malesuada scelerisque etiam quis. Duis vel felis sit scelerisque
            tincidunt venenatis. Turpis suspendisse porttitor et lacinia pretium
            tincidunt odio orci hendrerit.
          </p>
        </div>
        <PartnersSection />
        <div className="space-y-6 md:px-8 px-4">
          <h1 className="text-center font-[Playfair_Display] text-[22px] md:text-[32px] md:leading-12 leading-[30px] font-semibold">
            Gallery
          </h1>
          <Gallery />
        </div>
      </div>

      <main className="mx-auto md:px-8 px-4 space-y-8"></main>
    </main>
  );
};
export default CaseStudy;
