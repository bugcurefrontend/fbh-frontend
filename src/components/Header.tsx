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
import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();

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

  if (isLoading) {
    return (
      <header className="sticky top-0 left-0 w-full z-50 bg-[#FFFFFF] backdrop-blur-md shadow-sm h-16">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
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
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </header>
    );
  }

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

        {/* Authentication Section */}
        <div className="max-md:hidden">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* User Info */}
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {userProfile?.firstName || "User"}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex items-center gap-2 text-xs font-bold px-[10px] py-3 hover:bg-[#E6EBF5] bg-white transition-colors"
              >
                <LogOut className="w-3 h-3" />
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="text-xs font-bold px-[10px] py-3 hover:bg-[#E6EBF5] bg-white transition-colors"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation navigationItems={navigationItems} />
      </div>
    </header>
  );
}
