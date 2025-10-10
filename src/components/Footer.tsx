"use client";
import React from "react";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
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

  const pathname = usePathname();
  const footerClass = `bg-[#0f172a] text-[#e6e6e6] md:mt-16 mt-8 ${
    pathname === "/project-detail" ? "max-md:mb-30" : ""
  }`;

  return (
    <footer className={footerClass}>
      <div className="md:px-14 max-w-7xl mx-auto px-4 py-16 flex flex-col sm:flex-row sm:justify-between max-sm:gap-16">
        <div className="flex flex-col gap-6 md:min-w-[389px] w-full sm:w-auto">
          <Image
            src="/images/logo2.png"
            alt="Forests by Heartfulness"
            width={65}
            height={52}
          />
          <div className="flex gap-4">
            <Image
              src="/images/g-play.png"
              alt="Google Play"
              width={154}
              height={52}
              className="cursor-pointer min-w-[134px] min-h-[41px] md:min-w-[154px] md:min-h-[52px]"
            />
            <Image
              src="/images/app-store.png"
              alt="App Store"
              width={154}
              height={52}
              className="cursor-pointer min-w-[134px] min-h-[41px] md:min-w-[154px] md:min-h-[52px]"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-1 gap-8">
          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-poppins font-medium text-lg text-[#e6e6e6] mb-2">
              Useful Links
            </h3>
            <ul className="flex flex-col gap-2">
              {usefulLinks.map((link, index) => (
                <li
                  key={index}
                  className="text-sm leading-5 font-poppins font-normal text-[#e6e6e6] hover:text-white hover:underline cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-poppins font-medium text-lg text-[#e6e6e6] mb-2">
              Social
            </h3>
            <ul className="flex flex-col md:gap-3 gap-2">
              <li className="flex items-center gap-4 cursor-pointer hover:text-white">
                <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                  <Instagram className="h-4 w-4 text-black" />
                </div>
                <span className="text-sm font-normal">Instagram</span>
              </li>
              <li className="flex items-center gap-4 cursor-pointer hover:text-white">
                <div className="h-6 w-6 rounded-full flex items-center justify-center">
                  <Image
                    src="/images/Vector.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className=""
                  />
                </div>
                <span className="text-sm font-normal">Facebook</span>
              </li>
              <li className="flex items-center gap-4 cursor-pointer hover:text-white">
                <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-black" />
                </div>
                <span className="text-sm font-normal">Linkedin</span>
              </li>
              <li className="flex items-center gap-4 cursor-pointer hover:text-white">
                <div className="h-6 w-6 rounded-full flex items-center justify-center">
                  <Image
                    src="/images/Img - Twitter_margin.png"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-normal">Twitter</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-20 h-[95px] sm:h-[72px] px-4 mx-auto">
          <p className="font-poppins font-medium text-white text-sm sm:text-base">
            © 2025 Heartfulness - All rights reserved
          </p>
          <div className="flex gap-6 sm:gap-12">
            <a
              href="#"
              className="font-poppins font-medium text-white text-sm sm:text-base"
            >
              <span className="underline">Terms</span>
            </a>
            <a
              href="#"
              className="font-poppins font-medium text-white text-sm sm:text-base"
            >
              <span className="underline">Privacy</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
