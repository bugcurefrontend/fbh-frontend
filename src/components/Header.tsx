"use client";

import * as React from "react";
import Image from "next/image";
import { CustomNavigationMenu } from "./ui/navigation-menu";
import { MobileNavigation } from "./ui/mobile-navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";

export default function Header() {
  const navigationItems = [
    {
      label: "About",
      sub: [
        { label: "Our Mission & Vision", href: "/about/mission-vision" },
        { label: "Meet The Team", href: "/about/team" },
        { label: "FAQs", href: "/about/faqs" },
      ],
    },
    {
      label: "How it works",
      sub: [
        { label: "Process", href: "/how-it-works/process" },
        { label: "Keystone Projects", href: "/how-it-works/keystone-projects" },
        { label: "Project Archetypes", href: "/how-it-works/archetypes" },
      ],
    },
    {
      label: "Projects",
      sub: [
        { label: "All Projects", href: "/projects" },
        { label: "Featured", href: "/projects/featured" },
        { label: "Completed", href: "/projects/completed" },
      ],
    },
    {
      label: "Species",
      sub: [
        { label: "Tree Species", href: "/species" },
        { label: "Plant Database", href: "/species/database" },
      ],
    },
    {
      label: "Get involved",
      sub: [
        { label: "Volunteer", href: "/get-involved/volunteer" },
        { label: "Partner With Us", href: "/get-involved/partner" },
        { label: "Events", href: "/get-involved/events" },
      ],
    },
    {
      label: "Plant for a cause",
      sub: [
        { label: "Donate", href: "/cause/donate" },
        { label: "Corporate Gifting", href: "/cause/corporate-gifting" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#FFFFFF] backdrop-blur-md shadow-sm h-16">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <div className="xl:max-w-[150px] xl:w-full">
          <Link href="/" className="w-fit">
            <Image
              src="/images/logo3.svg"
              alt="logo"
              width={57}
              height={46}
              priority
              className="min-w-[57px]"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <CustomNavigationMenu navigationItems={navigationItems} />
        <div className="hidden lg:flex items-center justify-center gap-3">
          <Select defaultValue="india">
            <SelectTrigger className="border-2 py-[10px] px-[6px] rounded-[5px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="india">
                <Image
                  src="/images/flag.png"
                  alt="ind"
                  width={24}
                  height={24}
                  className="min-w-6 min-h-6"
                />
                <span className="text-sm font-normal leading-5 text-center align-middle">
                  INR
                </span>
              </SelectItem>
              <SelectItem value="us">
                <Image
                  src="/images/us.png"
                  alt="usa"
                  width={24}
                  height={24}
                  className="min-w-6 min-h-6"
                />
                <span className="text-sm font-normal leading-5 text-center align-middle">
                  USD
                </span>
              </SelectItem>
            </SelectContent>
          </Select>

          <button className="uppercase text-xs font-bold px-[10px] py-3 hover:bg-[#E6EBF5] bg-white transition-colors">
            login
          </button>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation navigationItems={navigationItems} />
      </div>
    </header>
  );
}
