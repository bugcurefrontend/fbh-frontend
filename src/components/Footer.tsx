"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const usefulLinks = [
    "Heartfulness Institute",
    "Kanha Shanti Vanam",
    "Daaji.org",
    "Heartfulness Magazine",
    "One Daily Thought",
    "Donate",
  ];

  const moreLinks = [
    "About Us",
    "Contact Us",
    "Case Study",
    "Terms & Conditions",
    "Privacy & Policy",
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: "/images/Instagram.png",
    },
    {
      name: "Facebook",
      icon: "/images/Facebook.png",
    },
    {
      name: "Linkedin",
      icon: "/images/link.png",
    },
    {
      name: "Twitter",
      icon: "/images/Twitter.png",
    },
  ];

  const pathname = usePathname();
  const footerClass = `bg-[#0F172A] text-[#e6e6e6] md:mt-16 mt-8 ${
    pathname === "/project-detail" || pathname === "/species-detail"
      ? "max-md:mb-41" // congrats = mb-25 if not then mb-41
      : ""
  }`;

  return (
    <footer className={footerClass}>
      <div className="md:px-12 max-w-7xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row sm:justify-between max-md:gap-8">
        <div className="flex flex-col gap-6 md:min-w-[389px] w-full sm:w-auto">
          <Image
            src="/images/footer-logo.png"
            alt="Forests by Heartfulness"
            width={216}
            height={63}
            className="max-sm:w-[170px]"
          />
          <div className="flex gap-4">
            <Image
              src="/images/g-play.png"
              alt="Google Play"
              width={154}
              height={52}
              className="cursor-pointer max-sm:w-[134px] max-sm:h-[41px]"
            />
            <Image
              src="/images/app-store.png"
              alt="App Store"
              width={154}
              height={52}
              className="cursor-pointer max-sm:w-[134px] max-sm:h-[41px]"
            />
          </div>
        </div>

        {/* Links */}
        <div className="w-full flex max-md:flex-col gap-8">
          <ul className="flex flex-col gap-4 lg:mr-10 xl:mr-17">
            {moreLinks.map((link, index) => (
              <li
                key={index}
                className="font-[poppins] text-base sm:font-medium font-semibold sm:text-lg text-[#e6e6e6] hover:text-white hover:underline cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
          <div className="flex flex-1 gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-[poppins] text-base sm:font-medium font-semibold sm:text-lg text-[#e6e6e6]">
                Useful Links
              </h3>
              <ul className="flex flex-col gap-2">
                {usefulLinks.map((link, index) => (
                  <li
                    key={index}
                    className="text-sm leading-5 font-[poppins] font-light text-[#e6e6e6] hover:text-white hover:underline cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-[poppins] text-base sm:font-medium font-semibold sm:text-lg text-[#e6e6e6]">
                Social
              </h3>
              <ul className="flex flex-col gap-2">
                {socialLinks.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 cursor-pointer hover:text-white"
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />

                    <span className="font-[poppins] text-sm font-light">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black">
        <div className="flex items-center justify-center md:h-18 h-[52px] px-4 mx-auto">
          <p className="font-[poppins] font-medium text-white text-sm sm:text-base text-center">
            © 2025 Heartfulness Institute | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
