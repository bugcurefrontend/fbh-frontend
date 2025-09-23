"use client";
import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  const usefulLinks = [
    "Heartfulness Institute",
    "Kanha Shanti Vanam",
    "Daaji.org",
    "Heartfulness Magazine",
    "One Daily Thought",
    "Donate",
  ];

  return (
    <footer className="bg-[#0f172a] text-[#e6e6e6] md:mt-16 mt-8">
      <div className="md:px-8 mx-auto px-4 py-16 flex flex-col sm:flex-row sm:justify-between gap-16 sm:gap-16">
        <div className="flex flex-col gap-6 md:min-w-sm w-full sm:w-auto">
          <Image
            src="/images/logo2.png"
            alt="Forests by Heartfulness"
            width={64}
            height={12}
          />
          <div className="flex gap-2">
            <Image
              src="/images/g-play.png"
              alt="Google Play"
              width={131}
              height={42}
              className="cursor-pointer min-w-[131px] min-h-[42px]"
            />
            <Image
              src="/images/app-store.png"
              alt="App Store"
              width={131}
              height={42}
              className="cursor-pointer min-w-[131px] min-h-[42px]"
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
                  className="text-sm font-normal text-[#e6e6e6] hover:text-white hover:underline cursor-pointer"
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
              <li className="flex items-center gap-2 cursor-pointer hover:text-white">
                <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                  <Instagram className="h-4 w-4 text-black" />
                </div>
                <span className="text-sm font-normal">Instagram</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-white">
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
              <li className="flex items-center gap-2 cursor-pointer hover:text-white">
                <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-black" />
                </div>
                <span className="text-sm font-normal">Linkedin</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-white">
                <div className="h-6 w-6 rounded-full flex items-center justify-center">
                  <Image
                    src="/images/Img - Twitter_margin.png"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className=""
                  />
                </div>
                <span className="text-sm font-normal">X</span>
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
          <div className="flex gap-6">
            <a
              href="#"
              className="font-poppins font-medium text-white text-sm sm:text-base underline hover:opacity-80"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-poppins font-medium text-white text-sm sm:text-base underline hover:opacity-80"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
