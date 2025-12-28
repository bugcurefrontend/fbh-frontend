"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRightIcon,
  XIcon,
  ChevronDownIcon,
  MenuIcon,
  LogInIcon,
  LogOut,
} from "lucide-react";
import CurrencySelect from "../CurrencySelect";
import LightBox from "../light-box/LightBox";

interface SubItem {
  label: string;
  href: string;
}

interface NavigationItem {
  label: string;
  href?: string;
  sub?: SubItem[];
}

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: any;
}

interface NavigationMenuProps {
  navigationItems: NavigationItem[];
  className?: string;
  isAuthenticated?: boolean;
  userProfile?: UserProfile | null;
  login?: () => void;
  onSignOut?: () => void;
}

export function MobileNavigation({
  navigationItems,
  isAuthenticated,
  userProfile,
  login,
  onSignOut,
}: NavigationMenuProps) {
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
    <div className="md:hidden flex items-center gap-3">
      <CurrencySelect />
      <button
        onClick={handleMobileMenuToggle}
        className="h-6 w-6 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <MenuIcon size={24} />
      </button>
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
              <div className="px-4 py-3">
                <LightBox />
              </div>
              {navigationItems.map((item, index) => {
                if (item.href) {
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-lg text-#090C0F uppercase"
                      onClick={handleClose}
                    >
                      {item.label}
                    </Link>
                  );
                }
                if (item.sub) {
                  return (
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
                          mobileExpandedMenu === item.label
                            ? "max-h-96"
                            : "max-h-0"
                        }`}
                      >
                        <ul className="pl-8 pb-2 list-disc list-outside">
                          {item.sub.map((subItem, subIndex) => (
                            <li key={subIndex} className="text-[#454950]">
                              <Link
                                href={subItem.href}
                                className="block py-2"
                                onClick={handleClose}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              })}

              {/* Auth Section */}
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-lg uppercase"
                    style={{
                      color: "#090C0F",
                    }}
                    onClick={handleClose}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/account"
                    className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-lg uppercase"
                    style={{
                      color: "#090C0F",
                    }}
                    onClick={handleClose}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/my-trees"
                    className="flex justify-between items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors font-medium text-lg uppercase"
                    style={{
                      color: "#090C0F",
                    }}
                    onClick={handleClose}
                  >
                    My Trees
                  </Link>

                  {/* Sign Out Button */}
                  <button
                    onClick={() => {
                      handleClose();
                      onSignOut?.();
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 transition-colors font-medium text-lg uppercase"
                    style={{
                      color: "#F04438",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#E6EBF5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-4 h-4" style={{ color: "#F04438" }} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleClose();
                    login?.();
                  }}
                  className="mt-2 py-3 px-4 hover:bg-gray-50 transition-colors flex items-center gap-2 !text-[#003399] font-semibold text-lg uppercase"
                >
                  Login
                  <LogInIcon size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}