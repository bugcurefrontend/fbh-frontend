"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { CustomNavigationMenu } from "./ui/navigation-menu";
import { MobileNavigation } from "./mobile-navigation";

export default function Header() {
  const navigationItems = [
    {
      label: "About",
      sub: ["Our Mission & Vision", "Meet The Team", "FAQs"],
    },
    {
      label: "How it works",
      sub: ["Process", "Keystone Projects", "Project Archetypes"],
    },
    {
      label: "Projects",
      sub: ["All Projects", "Featured", "Completed"],
    },
    {
      label: "Species",
      sub: ["Tree Species", "Plant Database"],
    },
    {
      label: "Get involved",
      sub: ["Volunteer", "Partner With Us", "Events"],
    },
    {
      label: "Plant for a cause",
      sub: ["Donate", "Corporate Gifting"],
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-8">
        {/* Logo */}
        <div className="md:w-full md:max-w-[30%]">
          <Image
            src="/images/logo3.png"
            alt="logo"
            width={57}
            height={46}
            priority
            className="min-w-[57px]"
          />
        </div>

        {/* Desktop navigation */}
        <div className="w-full hidden lg:flex items-center justify-between gap-10 xl:gap-14">
          <CustomNavigationMenu navigationItems={navigationItems} />

          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-2 items-center justify-center px-2 py-1 border border-[#E4E4E4] rounded-sm hover:bg-gray-100 cursor-pointer transition">
              <Image src="/images/flag.png" alt="dots" width={24} height={24} />
              <ChevronDown />
            </div>

            <Button className="uppercase text-xs font-bold bg-white text-black hover:shadow-sm hover:bg-white">
              login
            </Button>
          </div>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
