"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  XIcon,
  ChevronDownIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";

export function MobileNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(
    null
  );
  const [isClosing, setIsClosing] = useState(false);

  const navigationItems = [
    { key: "about", label: "ABOUT" },
    { key: "howItWorks", label: "HOW IT WORKS" },
    { key: "projects", label: "PROJECTS" },
    { key: "species", label: "SPECIES" },
    { key: "getInvolved", label: "GET INVOLVED" },
    { key: "plantForCause", label: "PLANT FOR A CAUSE" },
    { key: "contact", label: "CONTACT US" },
  ];

  const mobileMenuContent: Record<string, string[]> = {
    about: ["Our Mission", "Our Team", "FAQs"],
    howItWorks: ["Process", "Technology", "Impact"],
    projects: ["Current Projects", "Past Projects", "Future Initiatives"],
    species: ["Tree Species", "Plant Varieties", "Conservation"],
    getInvolved: ["Volunteer", "Donate", "Partnerships"],
    plantForCause: ["Campaigns", "Events", "Success Stories"],
  };

  const handleMobileMenuToggle = () => {
    if (mobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMobileMenuOpen(false);
        setIsClosing(false);
        setMobileExpandedMenu(null);
      }, 300);
    } else {
      setMobileMenuOpen(true);
    }
  };

  const handleMobileMenuExpand = (key: string) => {
    setMobileExpandedMenu(mobileExpandedMenu === key ? null : key);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
      setMobileExpandedMenu(null);
    }, 300);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile menu button */}
      <button
        onClick={handleMobileMenuToggle}
        className="p-2 rounded-md text-gray-700 hover:bg-[#E6EBF5] transition-colors"
        aria-label="Toggle menu"
      >
        <MenuIcon size={24} />
      </button>

      {/* Drawer */}
      <div
        className={`h-screen overflow-y-scroll fixed top-0 right-0 w-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } ${isClosing ? "translate-x-full" : ""}`}
      >
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 h-16">
            {/* Logo */}
            <Image
              src="/images/logo3.png"
              alt="logo"
              width={57}
              height={46}
              priority
            />
            <button
              onClick={handleClose}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto h-full py-2">
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <div key={item.key} className="border-b border-gray-100">
                {item.key !== "contact" ? (
                  <>
                    <button
                      onClick={() => handleMobileMenuExpand(item.key)}
                      className="flex justify-between items-center w-full p-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-sm">{item.label}</span>
                      {mobileExpandedMenu === item.key ? (
                        <ChevronDownIcon
                          size={20}
                          className="transition-transform"
                        />
                      ) : (
                        <ChevronRightIcon
                          size={20}
                          className="transition-transform"
                        />
                      )}
                    </button>

                    {/* Collapsible submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileExpandedMenu === item.key ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="pl-6 pb-2">
                        {mobileMenuContent[item.key]?.map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-sm"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href="#"
                    className="block p-4 hover:bg-gray-50 transition-colors font-medium text-sm"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            <div className="my-2 border-b border-gray-200"></div>

            {/* User Profile Section */}
            <div className="px-4 py-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">JD</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">John Doe</div>
                  <div className="text-xs text-gray-500">xyz@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Dashboard and My Trees */}
            <div className="border-b border-gray-100">
              <a
                href="#"
                className="block p-4 hover:bg-gray-50 transition-colors text-sm"
              >
                Dashboard
              </a>
            </div>
            <div className="border-b border-gray-100">
              <a
                href="#"
                className="block p-4 hover:bg-gray-50 transition-colors text-sm"
              >
                My Trees
              </a>
            </div>

            <div className="my-2 border-b border-gray-200"></div>

            {/* Sign Out */}
            <div className="border-b border-gray-100">
              <button className="flex justify-between items-center w-full p-4 text-red-600 hover:bg-gray-50 transition-colors text-sm">
                <span>Sign Out</span>
                <LogOutIcon size={18} />
              </button>
            </div>

            {/* Country/Language Selector */}
            <div className="p-4 mt-auto flex justify-center">
              <button className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:border-blue-500 transition-colors text-sm">
                <div className="w-5 h-5 bg-gray-200 rounded-sm"></div>
                <span>EN</span>
                <ChevronDownIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
