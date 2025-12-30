"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FooterMenuItem } from "@/types/footer-menu";
import { SocialLinkSimplified } from "@/types/social-link";
import { UsefulLinkItem } from "@/types/useful-link";

interface FooterProps {
  menuItems?: FooterMenuItem[];
  socialLinks?: SocialLinkSimplified;
  usefulLinks?: UsefulLinkItem[];
}

const Footer: React.FC<FooterProps> = ({
  menuItems,
  socialLinks,
  usefulLinks,
}) => {
  // Fallback useful links
  const fallbackUsefulLinks: UsefulLinkItem[] = [
    { label: "Heartfulness Institute", url: "#" },
    { label: "Kanha Shanti Vanam", url: "#" },
    { label: "Daaji.org", url: "#" },
    { label: "Heartfulness Magazine", url: "#" },
    { label: "One Daily Thought", url: "#" },
    { label: "Donate", url: "#" },
  ];

  const usefulLinksArray =
    usefulLinks && usefulLinks.length > 0 ? usefulLinks : fallbackUsefulLinks;

  // Fallback if no menu items from Strapi
  const fallbackLinks = [
    { label: "About Us", url: "/about" },
    { label: "Contact Us", url: "/contact" },
    { label: "Case Study", url: "/case-studies" },
    { label: "Terms & Conditions", url: "/terms" },
    { label: "Privacy & Policy", url: "/privacy" },
  ];

  const moreLinks =
    menuItems && menuItems.length > 0 ? menuItems : fallbackLinks;

  // Build social links array from props or use fallback
  const socialLinksArray = [
    {
      name: "Instagram",
      icon: "/images/Instagram.png",
      url: socialLinks?.instagram || "#",
    },
    {
      name: "Facebook",
      icon: "/images/Facebook.png",
      url: socialLinks?.facebook || "#",
    },
    {
      name: "Linkedin",
      icon: "/images/link.png",
      url: socialLinks?.linkedin || "#",
    },
    {
      name: "X",
      icon: "/images/Twitter.png",
      url: socialLinks?.x || "#",
    },
  ];

  // App store links
  const appStoreUrl = socialLinks?.appstore || "#";
  const playStoreUrl = socialLinks?.playstore || "#";

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
            className="max-sm:w-[170.65px] max-sm:h-[50px]"
          />
          <div className="flex gap-4">
            <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/g-play.png"
                alt="Google Play"
                width={154}
                height={52}
                className="cursor-pointer max-sm:w-[134px] max-sm:max-h-[41px] rounded-[4px]"
              />
            </a>
            <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/app-store.png"
                alt="App Store"
                width={154}
                height={52}
                className="cursor-pointer max-sm:w-[134px] max-sm:max-h-[41px] rounded-[4px]"
              />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="w-full flex max-md:flex-col gap-8">
          <ul className="flex flex-col gap-4 lg:mr-10 xl:mr-17">
            {moreLinks.map((link, index) => (
              <li
                key={index}
                className="font-[public_sans] text-base font-medium sm:text-lg text-[#e6e6e6] hover:text-white hover:underline cursor-pointer"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-1 gap-8 w-full">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-[public_sans] text-base font-medium sm:text-lg text-[#e6e6e6]">
                Useful Links
              </h3>
              <ul className="flex flex-col gap-2">
                {usefulLinksArray.map((link, index) => (
                  <li
                    key={index}
                    className="text-sm leading-5 font-[public_sans] font-normal text-[#e6e6e6] hover:text-white hover:underline cursor-pointer"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-[public_sans] text-base font-medium sm:text-lg text-[#e6e6e6]">
                Social
              </h3>
              <ul className="flex flex-col gap-2">
                {socialLinksArray.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 cursor-pointer hover:text-white"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <span className="font-[public_sans] text-sm font-normal">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black">
        <div className="flex items-center justify-center md:h-18 h-[52px] p-4 mx-auto">
          <p className="font-[public_sans] sm:font-medium text-white text-base text-center leading-5">
            © 2025 Heartfulness | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
