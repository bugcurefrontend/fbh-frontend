"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronRightIcon,
  XIcon,
  ChevronDownIcon,
  MenuIcon,
  LogInIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface subItem {
  label: string;
  href: string;
}

interface NavigationItem {
  label: string;
  sub: subItem[];
  href?: string;
}

interface NavigationMenuProps {
  navigationItems: NavigationItem[];
  className?: string;
}

export function MobileNavigation({ navigationItems }: NavigationMenuProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(
    null
  );
  const [isClosing, setIsClosing] = useState(false);

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
      <div className="flex items-center justify-end gap-4">
        <Select defaultValue="india">
          <SelectTrigger className="border-2 py-[10px] px-[6px] rounded-[5px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent align="end" side="bottom">
            <SelectItem value="india">
              <Image
                src="/images/flag.png"
                alt="ind"
                width={24}
                height={24}
                className="min-w-6 min-h-6"
              />
              <span className="ml-1 text-sm font-normal leading-5 text-center align-middle">
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
              <span className="ml-1 text-sm font-normal leading-5 text-center align-middle">
                USD
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={handleMobileMenuToggle}
          className="h-6 w-6 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <MenuIcon size={24} />
        </button>
      </div>
      {/* Drawer */}
      {mobileMenuOpen && (
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
                src="/images/logo3.svg"
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

            <div className="flex-1 overflow-y-auto py-4">
              {navigationItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <button
                    onClick={() => handleMobileMenuExpand(item.label)}
                    className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-lg text-#090C0F uppercase">
                      {item.label}
                    </span>
                    {mobileExpandedMenu === item.label ? (
                      <ChevronDownIcon size={20} />
                    ) : (
                      <ChevronRightIcon size={20} />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileExpandedMenu === item.label ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="pl-8 pb-2 list-disc list-outside">
                      {item.sub.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-[#454950]">
                          <a href={subItem.href} className="block py-2">
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <a
                href="/contact"
                className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-lg text-#090C0F uppercase"
              >
                Contact Us
              </a>

              <a
                href="/login"
                className="mt-2 py-3 px-4 hover:bg-gray-50 transition-colors flex items-center gap-2 !text-[#003399] font-semibold text-lg uppercase"
              >
                Login
                <LogInIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
