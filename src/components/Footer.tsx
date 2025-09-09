"use client";
import React from "react";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

const Footer: React.FC = () => {
  const usefulLinks = [
    "Heartfulness Institute",
    "Kanha Shanti Vanam",
    "Daaji.org",
    "Heartfulness Magazine",
    "One Daily Thought",
    "Donate",
  ];

  const socialLinks = [
    { name: "Instagram", src: "/images/social/instagram.png" },
    { name: "Facebook", src: "/images/social/facebook.png" },
    { name: "LinkedIn", src: "/images/social/linkedin.png" },
    { name: "Twitter", src: "/images/social/x.png" },
  ];

  return (
    <footer className="bg-[#0f172a] text-[#e6e6e6]">
      <div className="max-w-7xl mx-auto md:px-8 px-4 py-16 flex flex-col sm:flex-row sm:justify-between gap-16 sm:gap-16">
        {/* Logo & App Downloads */}
        <div className="flex flex-col gap-6 md:min-w-sm w-full sm:w-auto">
          <Image
            src="/images/logo2.png"
            alt="Forests by Heartfulness"
            width={64}
            height={12}
          />
          <div className="flex gap-2">
            <Image
              src="/images/google-play.png"
              alt="Get it on Google Play"
              width={131}
              height={42}
              className="cursor-pointer"
            />
            <Image
              src="/images/app-store.png"
              alt="Get it on App Store"
              width={131}
              height={42}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-1 gap-8">
          {/* Useful Links */}
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

          {/* Social Links */}
          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-poppins font-medium text-lg text-[#e6e6e6] mb-2">
              Social
            </h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((social, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 cursor-pointer hover:text-white"
                >
                  <span className="text-[#e6e6e6] hover:text-white">
                    <Image src={social.src} alt="icon" width={24} height={24} />{" "}
                  </span>
                  <span className="text-sm font-normal">{social.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-20 h-[95px] sm:h-[72px] px-4 max-w-7xl mx-auto">
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
